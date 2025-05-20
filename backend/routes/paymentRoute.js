const express = require('express');
const { processPayment, paytmResponse, getPaymentStatus, createOrder,verifyPayment } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router(); 

router.route('/payment/process').post(processPayment);
// router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey);
router.route('/callback').post(paytmResponse);
router.route('/payment/razorpay').post(createOrder);
router.route('/payment/razorpay/verify').post(verifyPayment);
router.route('/payment/status/:id').get(isAuthenticatedUser, getPaymentStatus);

module.exports = router;