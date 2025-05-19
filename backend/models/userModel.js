const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    offer: [
        {
            discount: {
                type: Number,
                required: [true, "Discount is required"],
                validate: {
                    validator: function (value) {
                        return value <= this.highestPrice;
                    },
                    message: "Discount must be less than or equal to highestPrice"
                }
            },
            offerName: {
                type: String,
                required: [true, "Offer name is required"],
            },
            count: {
                type: Number,
                required: [true, "Count is required"],
                min: [0, "Count cannot be negative"],
            },
            highestPrice: {
                type: Number,
                required: [true, "Highest price is required"],
                min: [0, "Highest price cannot be negative"],
            }
        }
    ],
    gender: {
        type: String,
        required: [true, "Please Enter Gender"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have atleast 8 chars"],
        select: false,
    },
    isDeleteRequest: {
        type: Boolean,
        default: false, 
    },
    isDeactivate: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetPasswordToken = async function () {

    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);