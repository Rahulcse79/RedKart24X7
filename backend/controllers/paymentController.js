const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Payment = require('../models/paymentModel');
const ErrorHandler = require('../utils/errorHandler');
const Razorpay = require("razorpay");
const crypto = require("crypto");
require('dotenv').config();

const RAZORPAY_KEY_ID = "rzp_test_A9ARY3IyT4zsWe";
const RAZORPAY_KEY_SECRET = "WtzPcGKVL2GRuKPQXsy7hsyw";

const razorpayInstance = new Razorpay({ 
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

const savePayment = async ({ orderId, paymentId }) => {
    try {
        await Payment.create({
            orderId,
            paymentId,
            status: "success",
        });
    } catch (error) {
        console.error("Failed to save payment", error);
    }
};

exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {
    try {
        const payment = await Payment.findOne({ orderId: req.params.id });

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment Details Not Found" });
        }

        const txn = {
            id: payment.paymentId || payment.txnId || null,
            status: payment.status || (payment.resultInfo ? payment.resultInfo.resultStatus : null),
        };

        res.status(200).json({
            success: true,
            txn,
        });
    } catch (error) {
        console.error("Error fetching payment status:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

// payment init.
exports.makePayment = async (req, res, next) => {
    try {
        const { amount, currency = "INR", receipt } = req.body;

        const options = {
            amount: amount * 100,
            currency,
            receipt: receipt || `receipt_order_${Date.now()}`,
            payment_capture: 1,
        };

        const order = await razorpayInstance.orders.create(options);

        if (!order) {
            return res.status(500).json({ success: false, message: "Order creation failed" });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
    }
}; 

// payment verify
exports.verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            await savePayment({ orderId: razorpay_order_id, paymentId: razorpay_payment_id });
            return res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error in verifyPayment:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};