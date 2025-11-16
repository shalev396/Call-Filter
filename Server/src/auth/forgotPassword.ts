import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { initiatePasswordReset } from "../utils/cognito.js";
import {
  createSuccessResponse,
  createErrorResponse,
  parseBody,
} from "../utils/response.js";

interface ForgotPasswordRequest {
  email: string;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const body = parseBody<ForgotPasswordRequest>(event);

    if (!body || !body.email) {
      return createErrorResponse(400, "Email is required");
    }

    await initiatePasswordReset(body.email);

    return createSuccessResponse({}, "Password reset code sent to your email");
  } catch (error: unknown) {
    console.error("Forgot password error:", error);

    // Don't reveal if user exists or not
    return createSuccessResponse(
      {},
      "If an account with that email exists, a password reset code has been sent"
    );
  }
};
