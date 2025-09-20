# Pink Blueberry API Infrastructure Guide

This document provides comprehensive guidance for managing and extending the Pink Blueberry Salon's API infrastructure. The API is built using AWS services including Lambda, API Gateway, and Cognito, and is managed using Terraform for infrastructure as code.

## Table of Contents

1. [Infrastructure Overview](#infrastructure-overview)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
4. [Authentication](#authentication)
5. [Creating New API Endpoints](#creating-new-api-endpoints)
6. [Testing API Endpoints](#testing-api-endpoints)
7. [Security Best Practices](#security-best-practices)
8. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)

---

## Infrastructure Overview

The Pink Blueberry API uses the following AWS services:

- **AWS Lambda**: For serverless function execution
- **Amazon API Gateway**: To create, publish, and manage APIs
- **Amazon Cognito**: For user authentication and authorization
- **AWS IAM**: For managing permissions and roles
- **Amazon S3**: For terraform state storage (optional)

The infrastructure is organized in a modular way:

```
api/
├── terraform/            # Infrastructure as code
│   ├── main.tf           # Main Terraform configuration
│   ├── variables.tf      # Variables for the Terraform configuration
│   └── modules/          # Reusable Terraform modules
│       ├── lambda-endpoint/  # Module for creating Lambda endpoints
│       └── cors/             # Module for CORS configuration
└── lambdas/              # Lambda function code
    ├── auth/             # Authentication functions
    │   ├── login/        # Login function
    │   └── register/     # Registration function
    ├── bookings/         # Booking-related functions (to be implemented)
    ├── products/         # Product-related functions (to be implemented)
    └── profiles/         # User profile functions (to be implemented)
```

---

## Prerequisites

To work with this infrastructure, you need:

1. AWS CLI installed and configured with appropriate credentials
2. Terraform CLI (version 1.0.0 or higher)
3. Node.js (version 14.x or higher)
4. npm or yarn for package management

---

## Setup Instructions

### Initial Setup

1. **Configure AWS CLI**:

   ```bash
   aws configure
   ```

   Provide your AWS Access Key ID, Secret Access Key, region (e.g., us-east-1), and output format.

2. **Initialize Terraform**:

   ```bash
   cd api/terraform
   terraform init
   ```

### Deployment

1. **Plan the Terraform deployment**:

   ```bash
   terraform plan -var="environment=dev"
   ```

   Review the plan to ensure it matches your expectations.

2. **Apply the Terraform configuration**:

   ```bash
   terraform apply -var="environment=dev"
   ```

   Type "yes" when prompted to confirm the deployment.

3. **Note the outputs**:

   After successful deployment, note the following outputs:
   - API Gateway endpoint URL
   - Cognito User Pool ID
   - Cognito Client ID

---

## Authentication

The Pink Blueberry API uses Amazon Cognito for authentication. Two Lambda functions have been implemented:

1. **Registration (`/register`)**:
   - Registers new users in the Cognito User Pool
   - Requires email, password, and name
   - Optionally accepts phone_number
   - Returns user ID and confirmation status

2. **Login (`/login`)**:
   - Authenticates users and returns JWT tokens
   - Requires email and password
   - Returns ID token, access token, and refresh token

### Using Authentication Tokens

After login, the client should:

1. Store tokens securely (e.g., in HttpOnly cookies or secure local storage)
2. Include the ID token in the Authorization header for authenticated requests:
   ```
   Authorization: Bearer <id_token>
   ```
3. Refresh tokens before they expire

---

## Creating New API Endpoints

To create a new API endpoint, follow these steps:

### 1. Create Lambda Function Code

1. Create a new directory under `api/lambdas/` based on the function category:

   ```bash
   mkdir -p api/lambdas/bookings/create_booking
   ```

2. Create the Lambda function code:

   ```javascript
   // api/lambdas/bookings/create_booking/index.js
   exports.handler = async (event) => {
     try {
       // Parse request body
       const requestBody = JSON.parse(event.body);
       
       // Your business logic here
       
       // Return response
       return formatResponse(200, { message: "Booking created successfully", data: {...} });
     } catch (error) {
       console.error('Error:', error);
       return formatResponse(500, { error: "Failed to create booking" });
     }
   };

   // Helper to format the Lambda response
   const formatResponse = (statusCode, body) => {
     return {
       statusCode: statusCode,
       headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
         'Access-Control-Allow-Methods': 'OPTIONS,POST'
       },
       body: JSON.stringify(body)
     };
   };
   ```

3. Create a package.json file if your function has dependencies:

   ```json
   {
     "name": "pink-blueberry-create-booking-lambda",
     "version": "1.0.0",
     "description": "Create booking function for Pink Blueberry API",
     "main": "index.js",
     "dependencies": {
       "aws-sdk": "^2.1174.0"
     }
   }
   ```

### 2. Add the Endpoint to Terraform

Add the new endpoint module in the main.tf file:

```hcl
module "create_booking" {
  source = "./modules/lambda-endpoint"
  
  api_id            = aws_api_gateway_rest_api.pink_blueberry_api.id
  api_resource_id   = aws_api_gateway_rest_api.pink_blueberry_api.root_resource_id
  path_part         = "bookings"
  http_method       = "POST"
  lambda_function_name = "pink-blueberry-create-booking-${var.environment}"
  lambda_source_dir = "${path.module}/../lambdas/bookings/create_booking"
  handler           = "index.handler"
  runtime           = "nodejs18.x"
  memory_size       = 128
  timeout           = 10
  
  environment_variables = {
    ENVIRONMENT = var.environment
    // Add other environment variables as needed
  }
}
```

### 3. Update API Gateway Deployment

Ensure the new endpoint is included in the API Gateway deployment by adding it to the dependencies:

```hcl
resource "aws_api_gateway_deployment" "api_deployment" {
  depends_on = [
    module.register.method_integration,
    module.login.method_integration,
    module.create_booking.method_integration
  ]
  
  rest_api_id = aws_api_gateway_rest_api.pink_blueberry_api.id
  stage_name  = var.environment
  
  lifecycle {
    create_before_destroy = true
  }
}
```

### 4. Apply Terraform Changes

Apply the changes using Terraform:

```bash
terraform apply -var="environment=dev"
```

### Example: Creating a Protected Endpoint

For endpoints that require authentication:

1. Modify the module configuration to use Cognito authorizer:

```hcl
module "protected_endpoint" {
  source = "./modules/lambda-endpoint"
  
  api_id            = aws_api_gateway_rest_api.pink_blueberry_api.id
  api_resource_id   = aws_api_gateway_rest_api.pink_blueberry_api.root_resource_id
  path_part         = "protected"
  http_method       = "GET"
  lambda_function_name = "pink-blueberry-protected-${var.environment}"
  lambda_source_dir = "${path.module}/../lambdas/protected"
  handler           = "index.handler"
  runtime           = "nodejs18.x"
  
  # Enable Cognito authorization
  authorization_type = "COGNITO_USER_POOLS"
  authorizer_id      = aws_api_gateway_authorizer.cognito_authorizer.id
  
  environment_variables = {
    ENVIRONMENT = var.environment
  }
}
```

2. Create the Cognito authorizer in main.tf:

```hcl
resource "aws_api_gateway_authorizer" "cognito_authorizer" {
  name          = "cognito-authorizer"
  type          = "COGNITO_USER_POOLS"
  rest_api_id   = aws_api_gateway_rest_api.pink_blueberry_api.id
  provider_arns = [aws_cognito_user_pool.user_pool.arn]
}
```

---

## Testing API Endpoints

### Using cURL

You can test the API endpoints using cURL:

**Registration**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "Password123!", "name": "John Doe"}' \
  https://your-api-gateway-url/dev/register
```

**Login**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "Password123!"}' \
  https://your-api-gateway-url/dev/login
```

**Protected Endpoint**:

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_ID_TOKEN" \
  https://your-api-gateway-url/dev/protected
```

### Using Postman

1. Create a new request collection for Pink Blueberry API
2. Set up environment variables for:
   - base_url
   - id_token
   - access_token
   - refresh_token
3. Create requests for each endpoint
4. Use the Collection Runner to execute test sequences

---

## Security Best Practices

1. **Environment-Specific Configuration**:
   - Use different Cognito User Pools for different environments
   - Configure stricter policies for production

2. **IAM Least Privilege**:
   - Grant only necessary permissions to Lambda functions
   - Review and audit IAM policies regularly

3. **API Gateway Security**:
   - Enable throttling to prevent DoS attacks
   - Configure WAF for additional protection

4. **Secrets Management**:
   - Use AWS Secrets Manager for sensitive information
   - Avoid hardcoding secrets in Lambda functions

5. **Input Validation**:
   - Validate all inputs on the server side
   - Implement proper error handling

6. **CORS Configuration**:
   - In production, specify exact allowed origins instead of '*'

---

## Common Issues and Troubleshooting

### Deployment Errors

1. **Lambda Packaging Issues**:
   - Ensure dependencies are properly installed in the Lambda directory
   - Check that the handler function name matches the configuration

2. **IAM Permission Errors**:
   - Review the IAM roles and policies
   - Check CloudWatch Logs for specific permission errors

3. **CORS Errors**:
   - Ensure OPTIONS method is properly configured
   - Verify that the allowed origins and headers are correct

### Authentication Issues

1. **Cognito User Pool Configuration**:
   - Check user pool client settings
   - Verify auth flow settings

2. **Token Validation Errors**:
   - Ensure the token is properly formatted
   - Check token expiration

---

## Next Steps

The current infrastructure includes:

- Basic API Gateway setup
- Cognito User Pool for authentication
- Login and Registration Lambda functions

Future enhancements should include:

1. **Booking System API**:
   - Create booking
   - Update booking
   - Cancel booking
   - List bookings

2. **Product Catalog API**:
   - List products
   - Get product details
   - Add product reviews

3. **User Profile API**:
   - Update user profile
   - Get user details
   - Manage user preferences

4. **Rewards Program API**:
   - Track points
   - Redeem rewards
   - View rewards history

5. **Admin API**:
   - Manage services
   - Manage stylists
   - View analytics

---

This documentation should serve as a comprehensive guide for continuing the development of the Pink Blueberry API infrastructure. For additional guidance or specific use cases not covered here, refer to the AWS and Terraform documentation.
