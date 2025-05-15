const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    storeName: {
        type: String,
        trim: true,
        maxlength: [100, "Store name cannot exceed 100 characters"]
    },
    storeNumber: {
        type: String,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    },
    address: {
        type: String,
        maxlength: [300, "Address cannot exceed 300 characters"]
    },
    pincode: {
        type: String,
        match: [/^\d{6}$/, "Please enter a valid 6-digit Indian pincode"]
    },
    country: {
        type: String,
    },
    businessReg: {
        type: String,
        default: ""
    },
    taxId: {
        type: String,
        default: ""
    },
    GSTNumber: {
        type: String,
        default: ""
    },
    storeDescription: {
        type: String,
        maxlength: [1000, "Store description must be within 1000 characters"]
    },
    logo: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ],
    bankAccountPhoto: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ],
    aadharNumber: {
        type: Number,
        default: null,
    },
    panNumber: {
        type: String,
        default: "",
    },
    dob: {
        type: String,
        default: "",
    },
    profileLogo: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ],
    panLogo: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ],
    aadharLogo: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }
    ],
    businessPoints: {
        type: Boolean,
        default: false,
    },
    holderName: {
        type: String,
        trim: true
    },
    bankName: {
        type: String,
        trim: true
    },
    accountNumber: {
        type: String,
        trim: true
    },
    IFSCCode: {
        type: String,
        trim: true,
    },
    UPIID: {
        type: String,
        trim: true
    },
    mobileNumber: {
        type: String,
        match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    accountType: {
        type: String,
        enum: ["Savings", "Current", "Other"],
        default: "Savings"
    },
    onBoarding: {
        type: [Number],
        default: [0, 0, 0, 0, 0, 0],
        validate: {
            validator: function (val) {
                return val.length === 6;
            },
            message: "onBoarding must have exactly 6 steps"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SellerData', sellerSchema);
