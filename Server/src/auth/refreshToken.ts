import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { refreshUserToken } from '../utils/cognito.js';
import {
  createSuccessResponse,
  createErrorResponse,
  parseBody,
} from '../utils/response.js';

interface RefreshTokenRequest {
  refreshToken: string;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const body = parseBody<RefreshTokenRequest>(event);

    if (!body || !body.refreshToken) {
      return createErrorResponse(400, 'Refresh token is required');
    }

    const result = await refreshUserToken(body.refreshToken);

    if (!result) {
      return createErrorResponse(401, 'Invalid refresh token');
    }

    return createSuccessResponse({
      accessToken: result.AccessToken,
      idToken: result.IdToken,
      expiresIn: result.ExpiresIn,
    });
  } catch (error: unknown) {
    console.error('Refresh token error:', error);

    if (error && typeof error === 'object' && 'name' in error && error.name === 'NotAuthorizedException') {
      return createErrorResponse(401, 'Invalid or expired refresh token');
    }

    return createErrorResponse(500, 'Internal server error');
  }
};

