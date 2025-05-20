const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const { SendmailTootp } = require('../utils/sendEmail');

// Create New Order
exports.newOrder = asyncErrorHandler(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
    } = req.body;

    const orderExist = await Order.findOne({ paymentInfo });

    if (orderExist) {
        return next(new ErrorHandler("Order Already Placed", 400));
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    // Email subject and text
    const subject = `Order Confirmation - RedKart24X7`;
    const text = `
Dear ${req.user.name},

Thank you for placing an order with RedKart24X7!

Order ID: ${order._id}
Total Price: ₹${totalPrice}

We will notify you when your order ships.

Best regards,  
RedKart24X7 Team
    `;

    try {
        await SendmailTootp(req.user.email, subject, text);
    } catch (error) {
        console.error("[EMAIL ERROR] Failed to send order confirmation:", error);
        // Optionally: don't stop order creation just because email failed
    }

    res.status(201).json({
        success: true,
        order,
    });
});

// Get All Orders
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
    try {
        const orders = await orderModel.find();

        if (!orders) {
            return next(new ErrorHandler("Order Not Found", 404));
        }

        let totalAmount = 0;
        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,
            orders,
            totalAmount,
        });
    } catch (error) {
        console.error("[GET_ALL_ORDERS] Error:", error);
        return next(new ErrorHandler("Failed to fetch orders", 500));
    }
});

// Get Single Order Details
exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            return next(new ErrorHandler("Order Not Found", 404));
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("[GET_SINGLE_ORDER_DETAILS] Error:", error);
        return next(new ErrorHandler("Failed to fetch order details", 500));
    }
});

// Get Logged In User Orders
exports.myOrders = asyncErrorHandler(async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        if (!orders || orders.length === 0) {
            return next(new ErrorHandler("Orders Not Found", 404));
        }

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("[MY_ORDERS] Error:", error);
        return next(new ErrorHandler("Failed to fetch orders", 500));
    }
});

