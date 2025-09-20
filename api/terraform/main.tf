terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Uncomment this block to use Terraform Cloud for team collaboration
  # backend "s3" {
  #   bucket = "pinkblueberry-terraform-state"
  #   key    = "api/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "PinkBlueberry"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# API Gateway
resource "aws_api_gateway_rest_api" "pink_blueberry_api" {
  name        = "pink-blueberry-api-${var.environment}"
  description = "Pink Blueberry Salon API"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# Enable CORS on API Gateway
module "cors" {
  source = "./modules/cors"

  api_id          = aws_api_gateway_rest_api.pink_blueberry_api.id
  api_resource_id = aws_api_gateway_rest_api.pink_blueberry_api.root_resource_id
}

# Cognito User Pool
resource "aws_cognito_user_pool" "user_pool" {
  name = "pink-blueberry-user-pool-${var.environment}"

  username_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject        = "Your Pink Blueberry verification code"
    email_message        = "Your verification code is {####}"
  }

  schema {
    name                = "name"
    attribute_data_type = "String"
    required            = true
    mutable             = true
  }

  schema {
    name                = "phone_number"
    attribute_data_type = "String"
    required            = false
    mutable             = true
  }
}

# Cognito User Pool Client
resource "aws_cognito_user_pool_client" "client" {
  name = "pink-blueberry-app-client-${var.environment}"

  user_pool_id = aws_cognito_user_pool.user_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
  ]

  generate_secret        = false
  refresh_token_validity = 30
  access_token_validity  = 1
  id_token_validity      = 1

  prevent_user_existence_errors = "ENABLED"
}

# API Gateway Deployment
resource "aws_api_gateway_deployment" "api_deployment" {
  depends_on = [
    module.register.method_integration,
    module.login.method_integration
  ]

  rest_api_id = aws_api_gateway_rest_api.pink_blueberry_api.id

  lifecycle {
    create_before_destroy = true
  }
}

# Auth modules
module "register" {
  source = "./modules/lambda-endpoint"

  api_id               = aws_api_gateway_rest_api.pink_blueberry_api.id
  api_resource_id      = aws_api_gateway_rest_api.pink_blueberry_api.root_resource_id
  path_part            = "register"
  http_method          = "POST"
  lambda_function_name = "pink-blueberry-register-${var.environment}"
  lambda_source_dir    = "${path.module}/../lambdas/auth/register"
  handler              = "index.handler"
  runtime              = "nodejs18.x"
  memory_size          = 128
  timeout              = 10

  environment_variables = {
    USER_POOL_ID        = aws_cognito_user_pool.user_pool.id
    USER_POOL_CLIENT_ID = aws_cognito_user_pool_client.client.id
    ENVIRONMENT         = var.environment
  }
}

module "login" {
  source = "./modules/lambda-endpoint"

  api_id               = aws_api_gateway_rest_api.pink_blueberry_api.id
  api_resource_id      = aws_api_gateway_rest_api.pink_blueberry_api.root_resource_id
  path_part            = "login"
  http_method          = "POST"
  lambda_function_name = "pink-blueberry-login-${var.environment}"
  lambda_source_dir    = "${path.module}/../lambdas/auth/login"
  handler              = "index.handler"
  runtime              = "nodejs18.x"
  memory_size          = 128
  timeout              = 10

  environment_variables = {
    USER_POOL_ID        = aws_cognito_user_pool.user_pool.id
    USER_POOL_CLIENT_ID = aws_cognito_user_pool_client.client.id
    ENVIRONMENT         = var.environment
  }
}

# Stage
resource "aws_api_gateway_stage" "api_stage" {
  stage_name    = var.environment
  rest_api_id   = aws_api_gateway_rest_api.pink_blueberry_api.id
  deployment_id = aws_api_gateway_deployment.api_deployment.id

  variables = {
    lambda_alias = "live"
  }

  xray_tracing_enabled = true

  depends_on = [
    aws_api_gateway_deployment.api_deployment
  ]
}

# Output
output "api_endpoint_url" {
  value       = "${aws_api_gateway_deployment.api_deployment.invoke_url}/"
  description = "API Gateway endpoint URL"
}

output "cognito_user_pool_id" {
  value       = aws_cognito_user_pool.user_pool.id
  description = "Cognito User Pool ID"
}

output "cognito_client_id" {
  value       = aws_cognito_user_pool_client.client.id
  description = "Cognito User Pool Client ID"
}
