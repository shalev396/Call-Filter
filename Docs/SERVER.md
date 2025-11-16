# Server (AWS Lambda Backend)

## Setup

```bash
cd Server
npm install
cp .env.example .env
```

Edit `.env`:

1. Set AWS_REGION, TWILIO credentials, DOMAIN
2. For **local dev**: Add COGNITO_USER_POOL_ID and COGNITO_CLIENT_ID from deployed stack
3. Set IS_LOCAL=true for local, IS_LOCAL=false for deploy

## Environment (.env)

**For Local Dev (`IS_LOCAL=true`):**

```bash
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_xxxxxx  # From stack output
COGNITO_CLIENT_ID=xxxxxxxxxxxxx         # From stack output
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=<secret>
TWILIO_ASSET_SERVICE_SID=ZSxxxx
IS_LOCAL=true
```

**For Deploy (`IS_LOCAL=false`):**

```bash
AWS_REGION=us-east-1
TWILIO_ACCOUNT_SID=ACxxxx
TWILIO_AUTH_TOKEN=<secret>
TWILIO_ASSET_SERVICE_SID=ZSxxxx
DOMAIN=callfilter.yourdomain.com  # No https://
IS_LOCAL=false
```

Cognito values injected automatically via CloudFormation on deploy.

## Local Dev Workflow

1. Deploy once to create Cognito resources: `npm run deploy`
2. Copy outputs to `.env`: COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID
3. Set `IS_LOCAL=true` in `.env`
4. Run locally: `npm run dev`

## Authentication Architecture

**API Gateway** (prod only): JWT validation via Cognito authorizer

## Stack

Node.js 20 + TypeScript + Serverless + Cognito + Lambda + API Gateway
