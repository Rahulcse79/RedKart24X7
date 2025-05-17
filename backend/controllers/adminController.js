const UserModel = require('../models/userModel');
const SellerModel = require('../models/sellerModel');
const ProductModel = require('../models/productModel');
const SellerDataModel = require('../models/sellerDataModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

// Get All users 
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    try {
        const users = await UserModel.find();

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error("[GET_ALL_USERS] Error:", error);
        return next(new ErrorHandler("Failed to fetch users", 500));
    }
});

// Delete User by ID
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id); 

        if (!user) {
            return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
        }

        await user.remove();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("[DELETE_USER] Error:", error);
        return next(new ErrorHandler("Failed to delete user", 500));
    }
});

// Get single user 
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("[GET_SINGLE_USER] Error:", error);
        return next(new ErrorHandler("Failed to fetch user details", 500));
    }
});

// Update User Role
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender
        };

        await UserModel.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error("[UPDATE_USER_ROLE] Error:", error);
        return next(new ErrorHandler("Failed to update user role", 500));
    }
});

// Get all sellers 
exports.getAllSellers = asyncErrorHandler(async (req, res, next) => {
    try {
        const sellers = await SellerModel.find();

        res.status(200).json({
            success: true,
            sellers,
        });
    } catch (error) {
        console.error("[GET_ALL_SELLERS] Error:", error);
        return next(new ErrorHandler("Failed to fetch sellers", 500));
    }
});

// Update Seller Role
exports.updateSellerRole = asyncErrorHandler(async (req, res, next) => {
    try {
        const newSellerData = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender
        };

        await SellerModel.findByIdAndUpdate(req.params.id, newSellerData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error("[UPDATE_SELLER_ROLE] Error:", error);
        return next(new ErrorHandler("Failed to update selelr role", 500));
    }
});

// Get single seller 
exports.getSingleSeller = asyncErrorHandler(async (req, res, next) => {
    try {
        const seller = await SellerModel.findById(req.params.id);

        if (!seller) {
            return next(new ErrorHandler(`Seller doesn't exist with id: ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            seller,
        });
    } catch (error) {
        console.error("[GET_SINGLE_SELLER] Error:", error);
        return next(new ErrorHandler("Failed to fetch seller details", 500));
    }
});

// Delete account controller --Admin
exports.deleteAccount = asyncErrorHandler(async (req, res, next) => {
    try {
        const seller = await SellerModel.findById(req.params.id);

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "Seller not found with the provided ID.",
            });
        }

        const email = seller.email;

        await SellerModel.deleteOne({ _id: req.params.id });
        await SellerDataModel.deleteOne({ email });

        return res.status(200).json({
            success: true,
            message: "Seller account deleted successfully.",
        });
    } catch (error) {
        console.error("[DELETE_ACCOUNT] Error:", error);
        return next(new ErrorHandler("Failed to delete seller account", 500));
    }
});

// Delete Order
exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {
    try {
        const order = await orderModel.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order Not Found", 404));
        }

        await order.remove();

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error("[DELETE_ORDER] Error:", error);
        return next(new ErrorHandler("Failed to delete order", 500));
    }
});

// Update Order Status 
exports.updateOrder = asyncErrorHandler(async (req, res, next) => {
    try {
        const order = await orderModel.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order Not Found", 404));
        }

        if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler("Already Delivered", 400));
        }

        if (req.body.status === "Shipped") {
            order.shippedAt = Date.now();
            order.orderItems.forEach(async (i) => {
                await updateStock(i.product, i.quantity);
            });
        }

        order.orderStatus = req.body.status;
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.error("[UPDATE_ORDER] Error:", error);
        return next(new ErrorHandler("Failed to update order status", 500));
    }
});

// Create an offer for a single user
exports.singleUserOffer = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const { discount, offerName, count, highestPrice } = req.body;

        if (
            typeof discount !== "number" ||
            !offerName ||
            typeof count !== "number" ||
            typeof highestPrice !== "number"
        ) {
            return next(new ErrorHandler("All offer fields are required and must be valid", 400));
        }

        if (discount < 0 || count < 0 || highestPrice < 0) {
            return next(new ErrorHandler("Values cannot be negative", 400));
        }

        if (discount > highestPrice) {
            return next(new ErrorHandler("Discount cannot be greater than highest price", 400));
        }

        const newOffer = { discount, offerName, count, highestPrice };
        user.offer.push(newOffer);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Offer added successfully",
            offer: newOffer,
        });
    } catch (error) {
        console.error("[CREATE_USER_OFFER] Error:", error);
        return next(new ErrorHandler("Failed to create user offer", 500));
    }
};

// Update an offer for a single user by offer index
exports.updateUserOffer = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const { discount, offerName, count, highestPrice, offerIndex } = req.body;

        if (
            typeof discount !== "number" ||
            !offerName ||
            typeof count !== "number" ||
            typeof highestPrice !== "number"
        ) {
            return next(new ErrorHandler("All offer fields are required and must be valid", 400));
        }

        if (discount < 0 || count < 0 || highestPrice < 0) {
            return next(new ErrorHandler("Values cannot be negative", 400));
        }

        if (discount > highestPrice) {
            return next(new ErrorHandler("Discount cannot be greater than highest price", 400));
        }

        if (offerIndex < 0 || offerIndex >= user.offer.length) {
            return next(new ErrorHandler("Offer not found", 404));
        }

        user.offer[offerIndex].discount = discount;
        user.offer[offerIndex].offerName = offerName;
        user.offer[offerIndex].count = count;
        user.offer[offerIndex].highestPrice = highestPrice;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Offer updated successfully",
            offer: user.offer[offerIndex],
        });
    } catch (error) {
        console.error("[UPDATE_USER_OFFER] Error:", error);
        return next(new ErrorHandler("Failed to update user offer", 500));
    }
};

// Delete an offer from a user by offer index
exports.deleteUserOffer = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const offerIndex = req.params.offerIndex;

        if (offerIndex < 0 || offerIndex >= user.offer.length) {
            return next(new ErrorHandler("Offer not found", 404));
        }

        user.offer.splice(offerIndex, 1);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Offer deleted successfully",
            offers: user.offer,
        });
    } catch (error) {
        console.error("[DELETE_USER_OFFER] Error:", error);
        return next(new ErrorHandler("Failed to delete user offer", 500));
    }
};

// Get all offers for a user
exports.getUserOffers = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id).select('offer');
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            offers: user.offer,
        });
    } catch (error) {
        console.error("[GET_USER_OFFERS] Error:", error);
        return next(new ErrorHandler("Failed to get user offers", 500));
    }
};

// Controller function to fetch all users' id and their offers
exports.getAllUsersOffers = asyncErrorHandler(async (req, res, next) => {
    try {
        const usersOffers = await UserModel.find({}, { _id: 1, offer: 1 });

        res.status(200).json({
            success: true,
            count: usersOffers.length,
            data: usersOffers,
        });
    } catch (error) {
        console.error("[GET_ALL_USERS_OFFERS] Error:", error);
        return next(new ErrorHandler("Failed to fetch users offers", 500));
    }
});

// Update stock
async function updateStock(id, quantity) {
    try {
        const product = await ProductModel.findById(id);

        if (!product) {
            throw new Error(`Product not found with id: ${id}`);
        }

        product.stock -= quantity;

        if (product.stock < 0) {
            product.stock = 0;
        }

        await product.save({ validateBeforeSave: false });
    } catch (error) {
        console.error(`[UPDATE_STOCK] Error updating stock for product ${id}:`, error);
        throw error;
    }
}
