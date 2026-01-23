# Stripe Terminal Backend Setup

This is a minimal backend server for Stripe Terminal SDK connection tokens.

## Prerequisites

1. **Node.js** (v18+)
2. **Stripe Account** with Terminal access
3. **ngrok** for exposing localhost to your phone

## Quick Start

### 1. Install Dependencies

```bash
cd stripe-backend
npm install
```

### 2. Get Your Stripe Secret Key

1. Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Secret key** (starts with `sk_test_`)

### 3. Start the Server

**Windows (PowerShell):**
```powershell
$env:STRIPE_SECRET_KEY="sk_test_your_key_here"
npm start
```

**Windows (CMD):**
```cmd
set STRIPE_SECRET_KEY=sk_test_your_key_here
npm start
```

**Mac/Linux:**
```bash
export STRIPE_SECRET_KEY=sk_test_your_key_here
npm start
```

You should see:
```
🚀 Stripe Terminal Backend Server
================================
📡 Server running on http://localhost:4242
```

### 4. Expose with ngrok

In a **new terminal**:
```bash
ngrok http 4242
```

Copy the `https://xxxx-xxxx.ngrok.io` URL.

### 5. Configure the App

Before initializing the terminal in your app, set the backend URL:

```typescript
import { hardwareService } from '@/lib/hardware-service';

// Set your ngrok URL (without trailing slash)
await hardwareService.setStripeBackendUrl('https://xxxx-xxxx.ngrok.io');

// Now discover and connect to terminal
const readers = await hardwareService.discoverDevices('terminal');
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/connection_token` | POST | Get SDK connection token |
| `/create_payment_intent` | POST | Create payment intent (body: `{ amount, currency }`) |
| `/capture_payment_intent` | POST | Capture payment (body: `{ payment_intent_id }`) |
| `/health` | GET | Health check |

## Testing

Once running, test with:
```bash
curl -X POST http://localhost:4242/connection_token
```

Should return:
```json
{"secret":"pst_test_..."}
```

## Troubleshooting

### "STRIPE_SECRET_KEY not set"
Make sure you set the environment variable before running `npm start`.

### "Network error" on Android
- Make sure ngrok is running
- Check the ngrok URL is correct (https, not http)
- Ensure your phone has internet access

### "Invalid API Key"
- Double-check your Stripe secret key
- Ensure you're using a test key (`sk_test_`) not live (`sk_live_`)

## Security Note

⚠️ **Never commit your Stripe secret key to version control!**

The secret key is only used server-side and never exposed to the app.
