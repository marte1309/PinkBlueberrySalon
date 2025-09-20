# Create API Gateway Resource
resource "aws_api_gateway_resource" "resource" {
  rest_api_id = var.api_id
  parent_id   = var.api_resource_id
  path_part   = var.path_part
}

# Create Lambda function
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.lambda_source_dir
  output_path = "${path.module}/lambda_function_${var.path_part}.zip"
}

resource "aws_lambda_function" "function" {
  function_name = var.lambda_function_name
  filename      = data.archive_file.lambda_zip.output_path
  
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  
  handler     = var.handler
  runtime     = var.runtime
  memory_size = var.memory_size
  timeout     = var.timeout
  
  role = aws_iam_role.lambda_role.arn
  
  environment {
    variables = var.environment_variables
  }
}

# IAM role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "${var.lambda_function_name}-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Basic Lambda execution permissions
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Cognito permissions for auth functions
resource "aws_iam_policy" "cognito_policy" {
  name        = "${var.lambda_function_name}-cognito-policy"
  description = "Allows Lambda function to access Cognito user pools"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "cognito-idp:AdminCreateUser",
          "cognito-idp:AdminInitiateAuth",
          "cognito-idp:AdminRespondToAuthChallenge",
          "cognito-idp:SignUp",
          "cognito-idp:InitiateAuth",
          "cognito-idp:RespondToAuthChallenge",
          "cognito-idp:ConfirmSignUp",
          "cognito-idp:ForgotPassword",
          "cognito-idp:ConfirmForgotPassword"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_cognito" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.cognito_policy.arn
}

# API Gateway Method
resource "aws_api_gateway_method" "method" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = var.http_method
  authorization = "NONE"  # Change to "COGNITO_USER_POOLS" for protected endpoints
}

# Lambda Integration
resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = var.api_id
  resource_id             = aws_api_gateway_resource.resource.id
  http_method             = aws_api_gateway_method.method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.function.invoke_arn
}

# Lambda permission to allow API Gateway to invoke
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.function.function_name
  principal     = "apigateway.amazonaws.com"
  
  source_arn = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${var.api_id}/*/${var.http_method}/${var.path_part}"
}

# Get current region and account ID for ARN construction
data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

# Enable CORS
resource "aws_api_gateway_method" "options_method" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "options_200" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = aws_api_gateway_method.options_method.http_method
  status_code   = "200"
  
  response_models = {
    "application/json" = "Empty"
  }
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration" "options_integration" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = aws_api_gateway_method.options_method.http_method
  type          = "MOCK"
  
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response" {
  rest_api_id   = var.api_id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = aws_api_gateway_method.options_method.http_method
  status_code   = aws_api_gateway_method_response.options_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'OPTIONS,${var.http_method}'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"  # Use var.allowed_origins for production
  }
}

output "method_integration" {
  value = aws_api_gateway_integration.integration
}
