const SellerData = require('../models/sellerDataModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require("cloudinary");

// Create store setup controller.
exports.createStoreSetup = asyncErrorHandler(async (req, res, next) => {
    try {
        const {
            storeName,
            storeNumber,
            address,
            pincode,
            country,
            businessReg,
            taxId,
            GSTNumber,
            storeDescription,
            email,
        } = req.body;
        let logoLink = [];
        if (req.body && req.body.logo) {
            const logoFile = req.body.logo;
            const result = await cloudinary.v2.uploader.upload(logoFile, {
                folder: "sellerData",
            });

            logoLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        const existingSeller = await SellerData.findOne({ email: email });
        if (!existingSeller) {
            return next(new ErrorHandler("Seller not found for given email", 404));
        }
        existingSeller.storeName = storeName;
        existingSeller.storeNumber = storeNumber;
        existingSeller.address = address;
        existingSeller.pincode = pincode;
        existingSeller.country = country;
        existingSeller.businessReg = businessReg;
        existingSeller.taxId = taxId;
        existingSeller.GSTNumber = GSTNumber;
        existingSeller.storeDescription = storeDescription;
        if (logoLink.length > 0) {
            existingSeller.logo = logoLink;
        }

        await existingSeller.save();
        return res.status(200).json({
            success: true,
            message: "Store setup updated or created successfully",
        });

    } catch (err) {
        return next(new ErrorHandler("Seller create store failed", 500));
    }
});

// Bank account setup controller.
exports.bankAccountSetup = asyncErrorHandler(async (req, res, next) => {
    try {
        const {
            holderName,
            bankName,
            accountNumber,
            IFSCCode,
            UPIID,
            mobileNumber,
            accountType,
            email,
        } = req.body;

        let logoLink = [];
        if (req.body && req.body.logo) {
            const logoFile = req.body.logo;
            const result = await cloudinary.v2.uploader.upload(logoFile, {
                folder: "sellerData",
            });

            logoLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        const existingSeller = await SellerData.findOne({ email });
        if (!existingSeller) {
            return next(new ErrorHandler("Seller not found for given email", 404));
        }
        existingSeller.holderName = holderName;
        existingSeller.bankName = bankName;
        existingSeller.accountNumber = accountNumber;
        existingSeller.IFSCCode = IFSCCode;
        existingSeller.UPIID = UPIID;
        existingSeller.mobileNumber = mobileNumber;
        existingSeller.accountType = accountType;
        if (logoLink.length > 0) {
            existingSeller.bankAccountPhoto = logoLink;
        }
    
        await existingSeller.save();
        return res.status(200).json({
            success: true,
            message: "Bank account setup updated or created successfully",
        });
    } catch (err) {
        return next(new ErrorHandler("Seller create or update bank account failed", 500));
    }
});

// Bank business information setup controller.
exports.businessInformationSetup = asyncErrorHandler(async (req, res, next) => {
    try {
        const {
            allCheck,
            email,
        } = req.body;

        const existingSeller = await SellerData.findOne({ email });
        if (!existingSeller) {
            return next(new ErrorHandler("Seller not found for given email", 404));
        }
        existingSeller.businessPoints = allCheck;

        await existingSeller.save();
        return res.status(200).json({
            success: true,
            message: "Business information setup updated or created successfully",
        });
    } catch (err) {
        return next(new ErrorHandler("Seller create or update business information failed", 500));
    }
});

// Document setup controller.
exports.documentUploadSetup = asyncErrorHandler(async (req, res, next) => {
    try {
        const {
            aadharNumber,
            panNumber,
            dob,
            email,
        } = req.body;

        let aadharLogo = [];
        if (req.body && req.body.aadharLogo) {
            const logoFile = req.body.aadharLogo;
            const result = await cloudinary.v2.uploader.upload(logoFile, {
                folder: "sellerData",
            });

            aadharLogo.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        let profileLogo = [];
        if (req.body && req.body.profileLogo) {
            const logoFile = req.body.profileLogo;
            const result = await cloudinary.v2.uploader.upload(logoFile, {
                folder: "sellerData",
            });

            profileLogo.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        let panLogo = [];
        if (req.body && req.body.panLogo) {
            const logoFile = req.body.panLogo;
            const result = await cloudinary.v2.uploader.upload(logoFile, {
                folder: "sellerData",
            });

            panLogo.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        const existingSeller = await SellerData.findOne({ email });
        if (!existingSeller) {
            return next(new ErrorHandler("Seller not found for given email", 404));
        }
        existingSeller.aadharNumber = aadharNumber;
        existingSeller.panNumber = panNumber;
        existingSeller.dob = dob;
        if (aadharLogo.length > 0) {
            existingSeller.aadharLogo = aadharLogo;
        }
        if (profileLogo.length > 0) {
            existingSeller.profileLogo = profileLogo;
        }
        if (panLogo.length > 0) {
            existingSeller.panLogo = panLogo;
        }

        await existingSeller.save();
        return res.status(200).json({
            success: true,
            message: "Document setup updated or created successfully",
        });
    } catch (err) {
        return next(new ErrorHandler("Seller create or update document failed", 500));
    }
});

// Verification setup controller.
exports.verification = asyncErrorHandler(async (req, res, next) => {
    try {
        const {
            Verification,
            email,
        } = req.body;

        const existingSeller = await SellerData.findOne({ email });
        if (!existingSeller) {
            return next(new ErrorHandler("Seller not found for given email", 404));
        }

        if(Verification) {
            existingSeller.onBoarding[4] = -1;
            await existingSeller.save();
        }
        return res.status(200).json({
            success: true,
            message: "Verification updated successfully",
        });
    } catch (err) {
        return next(new ErrorHandler("Seller create or update verification failed", 500));
    }
});

// Get store data data by seller email
exports.getStoreData = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required to fetch store data.",
            });
        }

        const existingSeller = await SellerData.findOne({ email });

        if (!existingSeller) {
            return res.status(404).json({
                success: false,
                message: "No seller found with the provided email.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Store data fetched successfully.",
            sellerData: existingSeller,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch store data. Please try again later.",
        });
    }
});





