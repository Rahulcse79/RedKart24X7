const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { sendToken } = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const { sendEmail, SendOTP, CheckOTPUser } = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    try {
        const { name, email, gender, password, avatar } = req.body;

        if (!name || !email || !gender || !password || !avatar) {
            console.warn("[REGISTER] Missing required fields");
            return next(new ErrorHandler("All fields are required", 400));
        }

        console.log("[REGISTER] Uploading avatar to Cloudinary...");

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        console.log("[REGISTER] Avatar uploaded:", myCloud.secure_url);

        const user = await User.create({
            name,
            email,
            gender,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        console.log("[REGISTER] New user created:", user.email);

        sendToken(user, 201, res);

    } catch (err) {
        console.error("[REGISTER] Error occurred:", err);
        return next(new ErrorHandler("User registration failed", 500));
    }
});

// OTP Based Login User
exports.OTPBasedLoginUser = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email, OTP } = req.body;

        if (!email) {
            return next(new ErrorHandler("Please enter both Email and OTP", 400));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorHandler("Invalid Email or user not found.", 401));
        }

        const isOTPMatched = await CheckOTPUser(email, OTP);

        if (!isOTPMatched) {
            return next(new ErrorHandler("Invalid OTP", 401));
        }

        sendToken(user, 201, res);
    } catch (err) {
        console.error("[OTP BASED LOGIN] Error occurred:", err);
        return next(new ErrorHandler("OTP based login failed", 500));
    }
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email And Password", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 401));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Email or Password", 401));
        }

        sendToken(user, 201, res);
    } catch (err) {
        console.error("[LOGIN] Error occurred:", err);
        return next(new ErrorHandler("User login failed", 500));
    }
});

// Send OTP
exports.OTPSendUser = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new ErrorHandler("Please Enter Email", 400));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorHandler("Invalid Email user not found", 401));
        }

        const GenerateOTP = await SendOTP(email, "User");

        if (!GenerateOTP) {
            return next(new ErrorHandler("Invalid Email", 401));
        }

        res.status(200).json({
            success: true
        });
    } catch (err) {
        console.error("[SEND OTP] Error occurred:", err);
        return next(new ErrorHandler("Send OTP failed", 500));
    }
});

// Logout User
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
    } catch (err) {
        console.error("[LOGOUT USER] Error occurred:", err);
        return next(new ErrorHandler("Logout user failed", 500));
    }
});

// Get User Details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return next(new ErrorHandler("User is not authenticated", 401));
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        console.error("[GET USER DETAILS] Error occurred:", err);
        return next(new ErrorHandler("Get user details failed", 500));
    }
});

// Forgot Password
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new ErrorHandler("User Not Found", 404));
        }

        const resetToken = await user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

        try {
            await sendEmail({
                email: user.email,
                templateId: process.env.SENDGRID_RESET_TEMPLATEID,
                data: {
                    reset_url: resetPasswordUrl
                }
            });

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
            });

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler(error.message, 500))
        }
    } catch (err) {
        console.error("[FORGOT PASSWORD] Error occurred:", err);
        return next(new ErrorHandler("Forgot password failed", 500));
    }
});

// Reset Password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    try {

        // create hash token
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return next(new ErrorHandler("Invalid reset password token", 404));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        sendToken(user, 200, res);
    } catch (err) {
        console.error("[RESET PASSWORD] Error occurred:", err);
        return next(new ErrorHandler("Reset password failed", 500));
    }
});

// Update Password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id).select("+password");

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Old Password is Invalid", 400));
        }

        user.password = req.body.newPassword;
        await user.save();
        sendToken(user, 201, res);
    } catch (err) {
        console.error("[UPDATE PASSWORD] Error occurred:", err);
        return next(new ErrorHandler("Update password failed", 500));
    }
});

// Update User Profile
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
    try {

        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        }

        if (req.body.avatar !== "") {
            const user = await User.findById(req.user.id);

            const imageId = user.avatar.public_id;

            await cloudinary.v2.uploader.destroy(imageId);

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });

            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }

        await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: true,
        });

        res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.error("[UPDATE USER PROFILE] Error occurred:", err);
        return next(new ErrorHandler("Update user profile failed", 500));
    }
});
