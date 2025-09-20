resource "aws_lambda_function" "login_function" {
  function_name    = "login"
  handler          = "login.handler"
  runtime          = "nodejs20.x"
  filename         = "${path.module}/lambdas/auth/login/login.zip"
  source_code_hash = filebase64sha256("${path.module}/lambdas/auth/login/login.zip")
  role             = aws_iam_role.lambda_exec.arn
  timeout          = 60
  #layers           = [aws_lambda_layer_version.response_layer.arn]

  environment {
    variables = {
      COGNITO_POOL_ID   = var.cognito_pool_id
      COGNITO_CLIENT_ID = var.cognito_client_id
    }
  }
}

resource "aws_lambda_function" "register_function" {
  function_name    = "register"
  handler          = "register.handler"
  runtime          = "nodejs20.x"
  filename         = "${path.module}/lambdas/auth/register/register.zip"
  source_code_hash = filebase64sha256("${path.module}/lambdas/auth/register/register.zip")
  role             = aws_iam_role.lambda_exec.arn
  timeout          = 60
  #layers           = [aws_lambda_layer_version.response_layer.arn]

  environment {
    variables = {
      COGNITO_CLIENT_ID = var.cognito_client_id
    }
  }
}
