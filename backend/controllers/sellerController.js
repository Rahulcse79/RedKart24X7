const Seller = require('../models/sellerModel');
const SellerData = require('../models/sellerDataModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const { sendSellerToken } = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { SendmailTootp, SendOTP, CheckOTPSeller } = require('../utils/sendEmail');

// Register Seller
exports.registerSeller = asyncErrorHandler(async (req, res, next) => {
    try {
        // Validate required fields
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

        const seller = await Seller.create({
            name,
            email,
            gender,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        console.log("[REGISTER] init seller store:", email);

        const sellerData = await SellerData.create({
            email
        });

        sendSellerToken(seller, sellerData, 201, res);

    } catch (err) {
        return next(new ErrorHandler("Seller registration failed", 500));
    }
});

// OTP Based Login seller
exports.OTPBasedLoginSeller = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email, OTP } = req.body;

        if (!email || !OTP) {
            return next(new ErrorHandler("Please enter both Email and OTP", 400));
        }

        const seller = await Seller.findOne({ email });
        const sellerData = await SellerData.findOne({ email });

        if (!seller || !sellerData) {
            return next(new ErrorHandler("Invalid Email or seller not found.", 401));
        }

        const isOTPMatched = await CheckOTPSeller(email, OTP);

        if (!isOTPMatched) {
            return next(new ErrorHandler("Invalid OTP", 401));
        }

        sendSellerToken(seller, sellerData, 201, res);
    } catch (error) {
        console.error("[OTP_BASED_LOGIN_SELLER] Error:", error);
        return next(new ErrorHandler("Failed to login via OTP", 500));
    }
});

// Login Seller
exports.loginSeller = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email And Password", 400));
        }

        const seller = await Seller.findOne({ email }).select("+password");
        const sellerData = await SellerData.findOne({ email });

        if (!seller || !sellerData) {
            return next(new ErrorHandler("Invalid Email or Password", 401));
        }

        const isPasswordMatched = await seller.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Email or Password", 401));
        }

        sendSellerToken(seller, sellerData, 201, res);

    } catch (error) {
        console.error("[LOGIN_SELLER] Error:", error);
        return next(new ErrorHandler("Something went wrong during login", 500));
    }
});

// Send OTP
exports.OTPSendSeller = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new ErrorHandler("Please Enter Email", 400));
        }

        const seller = await Seller.findOne({ email });

        if (!seller) {
            return next(new ErrorHandler("Invalid Email seller not found", 401));
        }

        const GenerateOTP = await SendOTP(email, "Seller");

        if (!GenerateOTP) {
            return next(new ErrorHandler("Invalid Email", 401));
        }

        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error("[OTP_SEND_SELLER] Error:", error);
        return next(new ErrorHandler("Failed to send OTP", 500));
    }
});

// Logout Seller
exports.logoutSeller = asyncErrorHandler(async (req, res, next) => {
    try {
        res.cookie("SellerToken", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
    } catch (error) {
        console.error("[LOGOUT_SELLER] Error:", error);
        return next(new ErrorHandler("Failed to log out", 500));
    }
});

// Get Seller Details
exports.getSellerDetails = asyncErrorHandler(async (req, res, next) => {
    try {
        const seller = await Seller.findById(req.seller.id);
        const sellerData = await SellerData.findOne({ email: seller.email });

        res.status(200).json({
            success: true,
            seller,
            sellerData,
        });
    } catch (error) {
        console.error("[GET_SELLER_DETAILS] Error:", error);
        return next(new ErrorHandler("Failed to fetch seller details", 500));
    }
});

// Forgot Password
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    try {
        const seller = await Seller.findOne({ email: req.body.email });

        if (!seller) {
            return next(new ErrorHandler("Seller Not Found", 404));
        }

        const resetToken = await seller.getResetPasswordToken();
        await seller.save({ validateBeforeSave: false });

        const resetPasswordUrl = `http://localhost:3000/password/seller/reset/${resetToken}`;
        const MailSubject = "Your RedCart24X7 OTP Code";
        const MailText = `
Dear ${seller.name},

Reset your password by clicking the link below:
${resetPasswordUrl}

If you did not request this, please ignore.

Best regards,
RedCart24X7 Team
      `;

        try {
            await SendmailTootp(seller.email, MailSubject, MailText);

            res.status(200).json({
                success: true,
                message: `Email sent to ${seller.email} successfully`,
            });
        } catch (error) {
            seller.resetPasswordToken = undefined;
            seller.resetPasswordExpire = undefined;
            await seller.save({ validateBeforeSave: false });
            return next(new ErrorHandler(error.message, 500));
        }
    } catch (error) {
        console.error("[FORGOT_PASSWORD] Error:", error);
        return next(new ErrorHandler("Failed to process forgot password request", 500));
    }
});

// Reset password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const seller = await Seller.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!seller) {
        return next(new ErrorHandler("Invalid or expired reset password token", 404));
    }

    const sellerData = await SellerData.findOne({ email: seller.email });

    seller.password = req.body.password;
    seller.resetPasswordToken = undefined;
    seller.resetPasswordExpire = undefined;
    await seller.save();

    try {
        sendSellerToken(seller, sellerData, 200, res);
    } catch (error) {
        return next(new ErrorHandler("Failed to login after password reset", 500));
    }
});

// Update Password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    const seller = await Seller.findById(req.seller.id).select("+password");

    if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
    }

    const sellerData = await SellerData.findOne({ email: seller.email });

    const isPasswordMatched = await seller.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is Invalid", 400));
    }

    seller.password = req.body.newPassword;
    await seller.save();

    sendSellerToken(seller, sellerData, 201, res);
});

// Update seller Profile
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
    try {
        const newSellerData = {
            name: req.body.name,
            email: req.body.email,
        };

        if (req.body.avatar !== "") {
            const seller = await Seller.findById(req.seller.id);

            if (!seller) {
                return next(new ErrorHandler("Seller not found", 404));
            }

            const imageId = seller.avatar?.public_id;

            if (imageId) {
                await cloudinary.v2.uploader.destroy(imageId);
            }

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });

            newSellerData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        const sellerData = await SellerData.findOne({ email: req.seller.email });
        if (sellerData) {
            sellerData.email = newSellerData.email;
            await sellerData.save();
        }

        await Seller.findByIdAndUpdate(req.seller.id, newSellerData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Failed to update profile", 500));
    }
});

// Delete request controller 
exports.deleteRequestAccount = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required to request account deletion.",
            });
        }

        const existingSeller = await Seller.findOne({ email });

        if (!existingSeller) {
            return res.status(404).json({
                success: false,
                message: "No seller found with the provided email.",
            });
        }

        if (existingSeller.isDeleteRequest) {
            return res.status(200).json({
                success: true,
                message: "Delete request already submitted.",
            });
        }

        existingSeller.isDeleteRequest = true;
        await existingSeller.save();

        return res.status(200).json({
            success: true,
            message: "Delete request submitted successfully.",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Failed to submit delete request", 500));
    }
});

// Deactivate account controller 
exports.deactivateAccount = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required to deactivate the account.",
            });
        }

        const existingSeller = await Seller.findOne({ email });

        if (!existingSeller) {
            return res.status(404).json({
                success: false,
                message: "No seller found with the provided email.",
            });
        }

        if (existingSeller.isDeactivate) {
            return res.status(200).json({
                success: true,
                message: "Account is already deactivated.",
            });
        }

        existingSeller.isDeactivate = true;
        await existingSeller.save();

        return res.status(200).json({
            success: true,
            message: "Seller account has been deactivated successfully.",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Failed to deactivate account", 500));
    }
});

// Get Single seller Details 
exports.getSingleSeller = asyncErrorHandler(async (req, res, next) => {
    try {
        const seller = await Seller.findById(req.params.id);

        if (!seller) {
            return next(new ErrorHandler(`Seller doesn't exist with id: ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            seller,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || 'Failed to get seller', 500));
    }
});

