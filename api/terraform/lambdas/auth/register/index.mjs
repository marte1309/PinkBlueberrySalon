import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognito = new CognitoIdentityProviderClient({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    // Parse request body
    const requestBody = JSON.parse(event.body);
    const { email, password, name, phone_number } = requestBody;

    if (!email || !password || !name) {
      return formatResponse(400, {
        error:
          "Missing required fields: email, password, and name are required",
      });
    }

    // Get environment variables
    const userPoolId = process.env.COGNITO_POOL_ID;
    const clientId = process.env.COGNITO_CLIENT_ID;

    if (!userPoolId || !clientId) {
      console.error(
        "Environment variables COGNITO_POOL_ID and COGNITO_CLIENT_ID must be set"
      );
      return formatResponse(500, { error: "Server configuration error" });
    }

    // Define user attributes
    const userAttributes = [
      { Name: "email", Value: email },
      { Name: "name", Value: name },
    ];

    if (phone_number) {
      userAttributes.push({ Name: "phone_number", Value: phone_number });
    }

    // Sign up the user
    const signUpParams = {
      ClientId: clientId,
      Username: email,
      Password: password,
      UserAttributes: userAttributes,
    };

    const signUpResponse = await cognito.send(new SignUpCommand(signUpParams));

    return formatResponse(200, {
      message: "User registered successfully. Verification required.",
      userId: signUpResponse.UserSub,
      userConfirmed: signUpResponse.UserConfirmed,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific Cognito errors
    if (error.code === "UsernameExistsException") {
      return formatResponse(409, {
        error: "A user with this email already exists",
      });
    } else if (
      error.code === "InvalidParameterException" ||
      error.code === "InvalidPasswordException"
    ) {
      return formatResponse(400, { error: error.message });
    } else {
      return formatResponse(500, { error: "Failed to register user" });
    }
  }
};

// Helper to format the Lambda response
const formatResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body: JSON.stringify(body),
  };
};
