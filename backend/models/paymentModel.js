const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    signature: {
        type: String
    },
    status: {
        type: String,
        enum: ["success", "failed", "pending"],
        default: "success"
    },
    amount: {
        type: Number
    },
    currency: {
        type: String,
        default: "INR"
    },
    receipt: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Payment", paymentSchema);
