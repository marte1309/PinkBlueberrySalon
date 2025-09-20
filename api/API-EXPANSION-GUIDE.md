# Pink Blueberry API Expansion Guide

This document provides instructions for creating additional API functions for the Pink Blueberry salon web application. We've already established the foundational infrastructure using Terraform with AWS Lambda, API Gateway, and Cognito for authentication. This guide will help you extend the API with new functionality while maintaining the established architecture patterns.

## Table of Contents

1. [Project Structure](#project-structure)
2. [API Development Workflow](#api-development-workflow)
3. [Creating New API Functions](#creating-new-api-functions)
4. [Recommended Next Functions](#recommended-next-functions)
5. [Testing and Deployment](#testing-and-deployment)

## Project Structure

The Pink Blueberry API follows this structure:

```
PinkBlueberry/
└── api/
    ├── terraform/               # Infrastructure as code
    │   ├── main.tf              # Main Terraform configuration
    │   ├── variables.tf         # Variable declarations
    │   └── modules/             # Reusable modules
    │       ├── lambda-endpoint/ # For creating API endpoints
    │       └── cors/            # CORS configuration
    ├── lambdas/                 # Lambda function code
    │   ├── auth/                # Authentication functions
    │   │   ├── login/           # Login function
    │   │   └── register/        # Registration function
    │   ├── bookings/            # Booking-related functions (to add)
    │   ├── products/            # Product-related functions (to add)
    │   └── users/               # User-related functions (to add)
    └── API-INFRASTRUCTURE-GUIDE.md  # Comprehensive documentation
```

## API Development Workflow

Follow this workflow when adding new API functions:

1. **Plan the API endpoint**: Define the purpose, inputs, outputs, and access control
2. **Create Lambda function**: Write the function code in Node.js
3. **Define in Terraform**: Add the endpoint to the infrastructure code
4. **Test locally**: Test the function logic before deployment
5. **Deploy with Terraform**: Apply the changes to AWS
6. **Test in dev environment**: Validate the deployed endpoint

## Creating New API Functions

### Step 1: Create Lambda Function Directory

For example, to create a function for listing salon services:

```bash
mkdir -p api/lambdas/services/list_services
cd api/lambdas/services/list_services
```

### Step 2: Create Lambda Function Code

Create an `index.js` file:

```javascript
// api/lambdas/services/list_services/index.js
exports.handler = async (event) => {
  try {
    // In a real implementation, this would fetch from a database
    const services = [
      {
        id: "1",
        name: "Luxury Haircut",
        description: "Premium haircut with styling",
        duration: 60,
        price: 120
      },
      {
        id: "2",
        name: "Color Treatment",
        description: "Full color treatment with premium products",
        duration: 120,
        price: 180
      },
      // Additional services...
    ];
    
    return formatResponse(200, {
      success: true,
      services: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return formatResponse(500, { 
      success: false, 
      error: "Failed to retrieve services" 
    });
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
      'Access-Control-Allow-Methods': 'OPTIONS,GET'
    },
    body: JSON.stringify(body)
  };
};
```

### Step 3: Create Package Configuration

Create a `package.json` file:

```json
{
  "name": "pink-blueberry-list-services-lambda",
  "version": "1.0.0",
  "description": "List services function for Pink Blueberry API",
  "main": "index.js",
  "dependencies": {
    "aws-sdk": "^2.1174.0"
  }
}
```

### Step 4: Add to Terraform Configuration

Update the `main.tf` file to include the new endpoint:

```hcl
# Add this after existing modules
module "list_services" {
  source = "./modules/lambda-endpoint"
  
  api_id            = aws_api_gateway_rest_api.pink_blueberry_api.id
  api_resource_id   = aws_api_gateway_rest_api.pink_blueberry_api.root_resource_id
  path_part         = "services"
  http_method       = "GET"
  lambda_function_name = "pink-blueberry-list-services-${var.environment}"
  lambda_source_dir = "${path.module}/../lambdas/services/list_services"
  handler           = "index.handler"
  runtime           = "nodejs18.x"
  memory_size       = 128
  timeout           = 10
  
  environment_variables = {
    ENVIRONMENT = var.environment
    # Add other environment variables as needed
  }
}
```

### Step 5: Update API Gateway Deployment

Ensure the new endpoint is included in the deployment dependencies:

```hcl
resource "aws_api_gateway_deployment" "api_deployment" {
  depends_on = [
    module.register.method_integration,
    module.login.method_integration,
    module.list_services.method_integration
    # Add other modules as they are created
  ]
  
  rest_api_id = aws_api_gateway_rest_api.pink_blueberry_api.id
  stage_name  = var.environment
  
  lifecycle {
    create_before_destroy = true
  }
}
```

## Recommended Next Functions

Based on the Pink Blueberry design brief, here are the recommended API functions to implement next:

### Booking System Functions

1. **List Available Time Slots**
   - Endpoint: `GET /timeslots`
   - Purpose: Return available appointment times based on date and stylist

2. **Create Booking**
   - Endpoint: `POST /bookings`
   - Purpose: Create a new salon appointment
   - Required fields: service_id, stylist_id, date_time, client_info

3. **Get Booking Details**
   - Endpoint: `GET /bookings/{id}`
   - Purpose: Retrieve details of a specific booking

4. **Update Booking**
   - Endpoint: `PUT /bookings/{id}`
   - Purpose: Modify an existing booking

5. **Cancel Booking**
   - Endpoint: `DELETE /bookings/{id}`
   - Purpose: Cancel a booking

### Product Catalog Functions

1. **List Products**
   - Endpoint: `GET /products`
   - Purpose: Return list of salon products with filtering options

2. **Get Product Details**
   - Endpoint: `GET /products/{id}`
   - Purpose: Return detailed information for a specific product

3. **Product Reviews**
   - Endpoint: `GET /products/{id}/reviews`
   - Purpose: Get reviews for a specific product

### User Profile Functions

1. **Get User Profile**
   - Endpoint: `GET /users/profile`
   - Purpose: Get current user's profile information

2. **Update User Profile**
   - Endpoint: `PUT /users/profile`
   - Purpose: Update user profile information

### Rewards Program Functions

1. **Get Rewards Balance**
   - Endpoint: `GET /rewards/balance`
   - Purpose: Get user's current rewards points and tier status

2. **List Available Rewards**
   - Endpoint: `GET /rewards/catalog`
   - Purpose: List rewards available for redemption

3. **Redeem Reward**
   - Endpoint: `POST /rewards/redeem`
   - Purpose: Redeem points for a specific reward

## Testing and Deployment

### Local Testing

Before deploying, test your Lambda functions locally:

1. Create a test event JSON file:

```json
{
  "httpMethod": "GET",
  "path": "/services",
  "queryStringParameters": null,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": null
}
```

2. Test using the AWS SAM CLI or Lambda local test utilities.

### Deployment

Deploy your changes with Terraform:

```bash
cd api/terraform
terraform plan -var="environment=dev"
terraform apply -var="environment=dev"
```

### API Testing

After deployment, test the API endpoint:

```bash
# For a GET endpoint
curl -X GET https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/dev/services

# For a POST endpoint with data
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"service_id": "1", "stylist_id": "2", "date_time": "2025-10-15T14:00:00", "client_info": {"name": "Jane Doe", "email": "jane@example.com"}}' \
  https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/dev/bookings
```

## Next Steps

1. **Add Database Integration**:
   - Set up DynamoDB tables for services, bookings, products, and users
   - Update Lambda functions to read/write from these tables

2. **Implement Authentication Checks**:
   - Add a custom authorizer to protect relevant endpoints
   - Add authorization validation in Lambda functions

3. **Add Monitoring and Logging**:
   - Set up CloudWatch alarms
   - Implement structured logging

4. **Create CI/CD Pipeline**:
   - Set up GitHub Actions or AWS CodePipeline
   - Automate testing and deployment

By following these steps and recommendations, you'll be able to rapidly expand the Pink Blueberry API while maintaining a consistent architecture and development approach.

For more detailed guidance, refer to the comprehensive [API-INFRASTRUCTURE-GUIDE.md](./API-INFRASTRUCTURE-GUIDE.md) document.

---

*Document created: September 20, 2025*
