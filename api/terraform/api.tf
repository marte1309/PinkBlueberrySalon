resource "aws_api_gateway_rest_api" "auth_api" {
  name        = "AuthAPI"
  description = "API for user authentication and management"
  body = jsonencode({
    swagger = "2.0"
    info = {
      title       = "AuthAPI"
      description = "API for user authentication and management"
      version     = "1.0.0"
    }
    paths = {
      "/login" = {
        post = {
          summary     = "User login"
          description = "Authenticate a user and return a JWT token"
          responses = {
            "200" = {
              description = "Successful login"
              schema      = { type = "string" }
            }
            "400" = {
              description = "Invalid input"
            }
          }
          x-amazon-apigateway-integration = {
            type                = "aws_proxy"
            httpMethod          = "POST"
            uri                 = aws_lambda_function.login_function.invoke_arn
            passthroughBehavior = "WHEN_NO_MATCH"
          }
        }
        options = {
          summary     = "CORS support for login"
          description = "Enable CORS for the login endpoint"
          responses = {
            "200" = {
              description = "CORS headers"
              headers = {
                "Access-Control-Allow-Origin"  = { type = "string", default = "*" }
                "Access-Control-Allow-Methods" = { type = "string", default = "OPTIONS,GET,POST,PATCH,DELETE" }
                "Access-Control-Allow-Headers" = { type = "string", default = "*" }
              }
            }
          }
          x-amazon-apigateway-integration = {
            type             = "mock"
            requestTemplates = { "application/json" = "{\"statusCode\" : 200}" }
            responses = {
              "200" = {
                statusCode = "200"
                responseParameters = {
                  "method.response.header.Access-Control-Allow-Origin"  = "'*'"
                  "method.response.header.Access-Control-Allow-Methods" = "'OPTIONS,GET,POST,PATCH,DELETE'"
                  "method.response.header.Access-Control-Allow-Headers" = "'*'"
                }
              }
            }
          }
        }
      }
      "/register" = {
        post = {
          summary     = "User registration"
          description = "Register a new user"
          responses = {
            "201" = {
              description = "User created successfully"
            }
            "400" = {
              description = "Invalid input"
            }
          }
          x-amazon-apigateway-integration = {
            type                = "aws_proxy"
            httpMethod          = "POST"
            uri                 = aws_lambda_function.register_function.invoke_arn
            passthroughBehavior = "WHEN_NO_MATCH"
          }
        }
        options = {
          summary     = "CORS support for login"
          description = "Enable CORS for the login endpoint"
          responses = {
            "200" = {
              description = "CORS headers"
              headers = {
                "Access-Control-Allow-Origin"  = { type = "string", default = "*" }
                "Access-Control-Allow-Methods" = { type = "string", default = "GET,POST,OPTIONS" }
                "Access-Control-Allow-Headers" = { type = "string", default = "*" }
              }
            }
          }
          x-amazon-apigateway-integration = {
            type             = "mock"
            requestTemplates = { "application/json" = "{\"statusCode\" : 200}" }
            responses = {
              "200" = {
                statusCode = "200"
                responseParameters = {
                  "method.response.header.Access-Control-Allow-Origin"  = "'*'"
                  "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'"
                  "method.response.header.Access-Control-Allow-Headers" = "'*'"
                }
              }
            }
          }
        }
      }
    }
  })
  endpoint_configuration {
    types = ["REGIONAL"]
  }
  depends_on = [
    aws_lambda_function.login_function,
    aws_lambda_function.register_function
  ]
}

resource "aws_lambda_permission" "login_api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.login_function.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.auth_api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "register_api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.register_function.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.auth_api.execution_arn}/*/*"
}

resource "aws_api_gateway_deployment" "auth_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.auth_api.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.auth_api.body))
  }

  lifecycle {
    create_before_destroy = true
  }

}

resource "aws_api_gateway_stage" "auth" {
  stage_name    = "auth"
  rest_api_id   = aws_api_gateway_rest_api.auth_api.id
  deployment_id = aws_api_gateway_deployment.auth_api_deployment.id

  description = "Stage for authentication API"
}
