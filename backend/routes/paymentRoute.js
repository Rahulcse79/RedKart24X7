const express = require('express');
const { getPaymentStatus, makePayment, verifyPayment } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router(); 

router.route('/payment/razorpay').post(isAuthenticatedUser, makePayment);
router.route('/payment/razorpay/verify').post(isAuthenticatedUser, verifyPayment);
router.route('/payment/status/:id').get(isAuthenticatedUser, getPaymentStatus);

module.exports = router;