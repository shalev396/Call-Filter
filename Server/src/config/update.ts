import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { updateConfig as updateTwilioConfig } from '../utils/twilio.js';
import {
  createSuccessResponse,
  createErrorResponse,
  parseBody,
} from '../utils/response.js';
import { Config } from '../types/index.js';
import { requireAuth } from '../middleware/auth.js';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    // Extract authenticated user (works in prod, parses JWT in local)
    const user = requireAuth(event);
    console.log(`[Update Config] Request from user: ${user.sub} (${user.email})`);

    const body = parseBody<Config>(event);

    if (!body) {
      return createErrorResponse(400, 'Invalid request body');
    }

    // Validate configuration
    if (!body.whitelist || !Array.isArray(body.whitelist)) {
      return createErrorResponse(400, 'Whitelist must be an array');
    }

    if (!body.schedule || typeof body.schedule !== 'object') {
      return createErrorResponse(400, 'Schedule configuration is required');
    }

    await updateTwilioConfig(body);

    return createSuccessResponse({}, 'Configuration updated successfully');
  } catch (error: unknown) {
    console.error('Update config error:', error);
    return createErrorResponse(500, 'Failed to update configuration');
  }
};

