const UserModel = require('../models/userModel');
// const ProductsModel = require('../models/productModel');
// const OrderModel = require('../models/productModel');
const SellerModel = require('../models/sellerModel');
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
            gender: req.body.gender,
            role: req.body.role,
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

// Get single seller 
exports.getSingleSeller = asyncErrorHandler(async (req, res, next) => {
    try {
        const seller = await SellerModel.findById(req.params.id);

        if (!seller) {
            return next(new ErrorHandler(`Seller doesn't exist with id: ${req.params.id}`, 404));
        }

        const sellerStoreData = await SellerDataModel.findOne({ email: seller.email });

        if (!sellerStoreData) {
            return next(new ErrorHandler(`Seller store data doesn't exist for seller with email: ${seller.email}`, 404));
        }

        res.status(200).json({
            success: true,
            seller,
            sellerStoreData,
        });
    } catch (error) {
        console.error("[GET_SINGLE_SELLER] Error:", error);
        return next(new ErrorHandler("Failed to fetch seller details", 500));
    }
});

// Delete account controller --Admin
exports.deleteAccount = asyncErrorHandler(async (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required to delete the account.",
            });
        }

        const existingSeller = await SellerModel.findOne({ email });

        if (!existingSeller) {
            return res.status(404).json({
                success: false,
                message: "No seller found with the provided email.",
            });
        }

        await SellerModel.deleteOne({ email });
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
