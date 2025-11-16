# Twilio Functions & Flows

## Setup

```bash
cd Twilio
npm install
twilio login
twilio serverless:deploy
```

## Get Credentials

1. **Account SID**: Console → Account Info → Copy SID
2. **Auth Token**: Console → Account Info → Click "View"
3. **Asset Service SID**: Functions & Assets → Create Service → Copy SID

## Create Studio Flow

1. Go to [Twilio Studio](https://console.twilio.com/us1/develop/studio/flows)
2. Create Flow → Import `flows/callFilterFlow.json`
3. Update Function URL in `check_filter` widget
4. Set variable: `FORWARDING_NUMBER=+1234567890`
5. Publish

## Connect Phone Number

Console → Phone Numbers → Select Number → Voice: "Studio Flow" → Select flow

## How It Works

1. Incoming call → Studio Flow
2. Flow calls `callFilter` function
3. Function checks whitelist & schedule
4. Returns: forward or reject
5. Flow connects call or plays message

## Assets

- `config.private.json`: Whitelist
- `schedule.private.json`: Business hours

Auto-synced from dashboard via backend API.
