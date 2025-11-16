import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { authenticateUser } from "../utils/cognito.js";
import {
  createSuccessResponse,
  createErrorResponse,
  parseBody,
} from "../utils/response.js";

interface LoginRequest {
  email: string;
  password: string;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const body = parseBody<LoginRequest>(event);

    if (!body || !body.email || !body.password) {
      return createErrorResponse(400, "Email and password are required");
    }

    const result = await authenticateUser(body.email, body.password);

    if (!result) {
      return createErrorResponse(401, "Invalid credentials");
    }

    return createSuccessResponse({
      accessToken: result.AccessToken,
      refreshToken: result.RefreshToken,
      idToken: result.IdToken,
      expiresIn: result.ExpiresIn,
    });
  } catch (error: unknown) {
    console.error("Login error:", error);

    if (error && typeof error === "object" && "name" in error) {
      if (error.name === "NotAuthorizedException") {
        return createErrorResponse(401, "Invalid email or password");
      }

      if (error.name === "UserNotFoundException") {
        return createErrorResponse(401, "Invalid email or password");
      }
    }

    return createErrorResponse(500, "Internal server error");
  }
};
