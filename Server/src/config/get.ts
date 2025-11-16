import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getConfig as getTwilioConfig } from "../utils/twilio.js";
import {
  createSuccessResponse,
  createErrorResponse,
} from "../utils/response.js";
import { requireAuth } from "../middleware/auth.js";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    // Extract authenticated user (works in prod, parses JWT in local)
    const user = requireAuth(event);
    console.log(`[Get Config] Request from user: ${user.sub} (${user.email})`);

    const config = await getTwilioConfig();
    return createSuccessResponse(config);
  } catch (error: unknown) {
    console.error("Get config error:", error);
    return createErrorResponse(500, "Failed to fetch configuration");
  }
};
