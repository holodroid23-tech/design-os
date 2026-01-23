/**
 * Minimal Stripe Terminal Backend Server
 * 
 * This server provides connection tokens for Stripe Terminal SDK.
 * Run with: node server.js
 * 
 * IMPORTANT: Set your Stripe secret key in environment variable before running:
 *   Windows: set STRIPE_SECRET_KEY=sk_test_your_key_here
 *   Mac/Linux: export STRIPE_SECRET_KEY=sk_test_your_key_here
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4242;

// Enable CORS for all origins (for development)
app.use(cors());
app.use(express.json());

// Get Stripe secret key from environment
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
    console.error('❌ ERROR: STRIPE_SECRET_KEY environment variable is not set!');
    console.error('');
    console.error('Please set it before running:');
    console.error('  Windows:   set STRIPE_SECRET_KEY=sk_test_your_key_here');
    console.error('  Mac/Linux: export STRIPE_SECRET_KEY=sk_test_your_key_here');
    console.error('');
    console.error('Get your test key from: https://dashboard.stripe.com/test/apikeys');
    process.exit(1);
}

// Initialize Stripe with the secret key
const stripe = require('stripe')(STRIPE_SECRET_KEY);

/**
 * POST /connection_token
 * 
 * Creates a new connection token for the Stripe Terminal SDK.
 * The Terminal SDK calls this endpoint when it needs to authenticate.
 */
app.post('/connection_token', async (req, res) => {
    console.log('📱 Connection token requested');

    try {
        const connectionToken = await stripe.terminal.connectionTokens.create();

        console.log('✅ Token created successfully');
        res.json({ secret: connectionToken.secret });
    } catch (error) {
        console.error('❌ Error creating connection token:', error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /create_payment_intent
 * 
 * Creates a PaymentIntent for terminal payments.
 * Body: { amount: number (in cents), currency: string }
 */
app.post('/create_payment_intent', async (req, res) => {
    const { amount, currency = 'usd' } = req.body;

    console.log(`💳 Creating PaymentIntent for ${amount} ${currency}`);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card_present'],
            capture_method: 'automatic',
        });

        console.log('✅ PaymentIntent created:', paymentIntent.id);
        res.json({
            client_secret: paymentIntent.client_secret,
            id: paymentIntent.id
        });
    } catch (error) {
        console.error('❌ Error creating PaymentIntent:', error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /capture_payment_intent
 * 
 * Captures a PaymentIntent after it's been confirmed.
 * Body: { payment_intent_id: string }
 */
app.post('/capture_payment_intent', async (req, res) => {
    const { payment_intent_id } = req.body;

    console.log(`🔒 Capturing PaymentIntent: ${payment_intent_id}`);

    try {
        const paymentIntent = await stripe.paymentIntents.capture(payment_intent_id);

        console.log('✅ PaymentIntent captured');
        res.json({ status: paymentIntent.status });
    } catch (error) {
        console.error('❌ Error capturing PaymentIntent:', error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Stripe Terminal Backend is running' });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log('');
    console.log('🚀 Stripe Terminal Backend Server');
    console.log('================================');
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log('');
    console.log('Endpoints:');
    console.log(`  POST /connection_token     - Get SDK connection token`);
    console.log(`  POST /create_payment_intent - Create payment intent`);
    console.log(`  POST /capture_payment_intent - Capture payment`);
    console.log(`  GET  /health               - Health check`);
    console.log('');
    console.log('📱 For Android device access, use ngrok:');
    console.log(`   ngrok http ${PORT}`);
    console.log('');
    console.log('Then update BACKEND_URL in StripeTerminalPlugin.java');
    console.log('');
});
