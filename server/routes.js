require('dotenv').config();
const express = require("express");
const products = require("./products.json");
const {validateCartItems} = require("use-shopping-cart/src/serverUtil");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_SECRET);

module.exports = function getRoutes() {
    const router = express.Router();
    router.get("/products", getProducts);
    router.get("/products/:id", getProduct);
    router.get('/checkout-sessions/:sessionId', getCheckoutSession)
    router.post('/checkout-sessions', createCheckoutSession);
    return router;
};

const getProducts = (req, res) => {
    res.status(200).json({products});
}

const getProduct = (req, res) => {
    const {id} = req.params;
    const product = products.find(product => product.id === id);
    try {
        if (!product) {
            throw new Error(`No Product found for id: ${id}`);
        }
        res.status(200).json({product});
    } catch (error) {
        res.status(404).json({message: error, statusCode: 404});
    }
}

const createCheckoutSession = async (req, res) => {
    try {
        const origin = process.env.NODE_ENV === "production" ? req.headers.origin : 'http://localhost:3000'
        const cartItems = req.body;
        const line_items = validateCartItems(products, cartItems);
        const params = {
            submit_type: "pay",
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA']
            },
            line_items,
            success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: origin,
            mode: 'payment'
        }
        const checkoutSession = await stripe.checkout.sessions.create(params);
        res.status(200).json(checkoutSession);
    } catch (error) {
        res.status(500).json({statusCode: 500, message: error.message})
    }
}

const getCheckoutSession = async (req, res) => {
    const {sessionId} = req.params;
    try {
        if (!sessionId.startsWith("cs_")) {
            throw Error('Incorrect checkout session id')
        }

        const checkout_session = await stripe.checkout.sessions.retrieve(sessionId, {expand: ["payment_intent"]});

        res.status(200).json(checkout_session);
    } catch (error) {
        res.status(500).json({statusCode: 500, message: error.message});

    }
}