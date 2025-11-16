import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { confirmPasswordReset } from '../utils/cognito.js';
import {
  createSuccessResponse,
  createErrorResponse,
  parseBody,
} from '../utils/response.js';

interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const body = parseBody<ResetPasswordRequest>(event);

    if (!body || !body.email || !body.code || !body.newPassword) {
      return createErrorResponse(
        400,
        'Email, code, and new password are required'
      );
    }

    await confirmPasswordReset(body.email, body.code, body.newPassword);

    return createSuccessResponse({}, 'Password reset successfully');
  } catch (error: unknown) {
    console.error('Reset password error:', error);

    if (error && typeof error === 'object' && 'name' in error) {
      if (error.name === 'CodeMismatchException') {
        return createErrorResponse(400, 'Invalid verification code');
      }

      if (error.name === 'ExpiredCodeException') {
        return createErrorResponse(400, 'Verification code has expired');
      }

      if (error.name === 'InvalidPasswordException') {
        return createErrorResponse(400, 'Password does not meet requirements');
      }
    }

    return createErrorResponse(500, 'Internal server error');
  }
};

