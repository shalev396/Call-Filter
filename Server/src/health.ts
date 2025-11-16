import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { createSuccessResponse } from "./utils/response.js";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  return createSuccessResponse({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "call-filter-server",
  });
};
