const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // MongoDB CastError (invalid ObjectId)
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Error (Invalid Token)
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid JSON Web Token";
        err = new ErrorHandler(message, 401);
    }

    // JWT Expired Error
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token has expired";
        err = new ErrorHandler(message, 401);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
