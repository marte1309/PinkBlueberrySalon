import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
const cognito = new CognitoIdentityProviderClient({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    // Parse request body
    const requestBody = JSON.parse(event.body);
    const { email, password } = requestBody;

    if (!email || !password) {
      return formatResponse(400, {
        error: "Missing required fields: email and password are required",
      });
    }

    // Get environment variables
    const userPoolId = process.env.COGNITO_POOL_ID;
    const clientId = process.env.COGNITO_CLIENT_ID;

    if (!userPoolId || !clientId) {
      console.error(
        "Environment variables USER_POOL_ID and USER_POOL_CLIENT_ID must be set"
      );
      return formatResponse(500, { error: "Server configuration error" });
    }

    // Initiate auth with user credentials
    const authParams = {
      ClientId: clientId,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    const authResponse = await cognito.send(
      new InitiateAuthCommand(authParams)
    );

    // Return auth tokens to the client
    return formatResponse(200, {
      message: "Login successful",
      tokens: {
        idToken: authResponse.AuthenticationResult.IdToken,
        accessToken: authResponse.AuthenticationResult.AccessToken,
        refreshToken: authResponse.AuthenticationResult.RefreshToken,
        expiresIn: authResponse.AuthenticationResult.ExpiresIn,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    // Handle specific Cognito errors
    if (error.code === "UserNotFoundException") {
      return formatResponse(404, { error: "User not found" });
    } else if (error.code === "NotAuthorizedException") {
      return formatResponse(401, { error: "Incorrect username or password" });
    } else if (error.code === "UserNotConfirmedException") {
      return formatResponse(403, { error: "User is not confirmed" });
    } else {
      return formatResponse(500, { error: "Failed to authenticate user" });
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
