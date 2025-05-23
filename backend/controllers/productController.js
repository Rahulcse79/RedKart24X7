const Product = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Get All Products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    try {
        const resultPerPage = 12;
        const sellerId = req.seller?.id;

        if (!sellerId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Seller ID not found",
            });
        }
        const productsCount = await Product.countDocuments({ seller: sellerId });
        const searchFeature = new SearchFeatures(Product.find({ seller: sellerId }), req.query)
            .search()
            .filter();
        let products = await searchFeature.query;
        const filteredProductsCount = products.length;
        searchFeature.pagination(resultPerPage);
        products = await searchFeature.query.clone();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products,
            productsCount,
            filteredProductsCount,
            resultPerPage,
        });
    } catch (err) {
        console.error("[GET_PRODUCTS] Error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products. Please try again later.",
        });
    }
});

// Get All Products ---Product Sliders
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            products,
        });
    } catch (err) {
        console.error("[GET_PRODUCTS] Error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
});

// Get Product Details
exports.getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error("[GET_PRODUCT_DETAILS] Error:", error);
        return next(new ErrorHandler("Failed to fetch product details", 500));
    }
};

// Create Product 
exports.createProduct = async (req, res, next) => {
    try {
        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        const result = await cloudinary.v2.uploader.upload(req.body.logo, {
            folder: "brands",
        });
        const brandLogo = {
            public_id: result.public_id,
            url: result.secure_url,
        };

        req.body.brand = {
            name: req.body.brandname,
            logo: brandLogo,
        };
        req.body.images = imagesLink;
        req.body.seller = req.seller.id;

        let specs = [];
        req.body.specifications.forEach((s) => {
            specs.push(JSON.parse(s));
        });
        req.body.specifications = specs;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error("[CREATE_PRODUCT] Error:", error);
        return next(new ErrorHandler("Failed to create product", 500));
    }
};

// Update Product
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        if (product.seller.toString() !== req.seller.id.toString()) {
            return next(new ErrorHandler("Unauthorized: You can update only your own products", 403));
        }

        if (req.body.images !== undefined) {
            let images = [];
            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            const imagesLink = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });

                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
            req.body.images = imagesLink;
        }

        if (req.body.logo && req.body.logo.length > 0) {
            if (product.brand && product.brand.logo && product.brand.logo.public_id) {
                await cloudinary.v2.uploader.destroy(product.brand.logo.public_id);
            }
            const result = await cloudinary.v2.uploader.upload(req.body.logo, {
                folder: "brands",
            });

            const brandLogo = {
                public_id: result.public_id,
                url: result.secure_url,
            };

            req.body.brand = {
                name: req.body.brandname,
                logo: brandLogo,
            };
        }

        if (req.body.specifications && Array.isArray(req.body.specifications)) {
            let specs = [];
            for (const s of req.body.specifications) {
                try {
                    specs.push(JSON.parse(s));
                } catch (err) {
                    return next(new ErrorHandler("Invalid specification format", 400));
                }
            }
            req.body.specifications = specs;
        }

        req.body.seller = req.seller.id;

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        console.error("[UPDATE_PRODUCT] Error:", error);
        return next(new ErrorHandler("Failed to update product", 500));
    }
};

// Delete Product 
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        if (product.seller.toString() !== req.seller._id.toString()) {
            return next(new ErrorHandler("Unauthorized: You can delete only your own products", 403));
        }

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        await product.remove();

        res.status(201).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("[DELETE_PRODUCT] Error:", error);
        return next(new ErrorHandler("Failed to delete product", 500));
    }
};

// Create OR Update Reviews
exports.createProductReview = async (req, res, next) => {
    try {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };

        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        const isReviewed = product.reviews.find(
            (rev) => rev.seller?.toString() === req.seller._id.toString()
        );

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.seller?.toString() === req.seller._id.toString()) {
                    rev.rating = rating;
                    rev.comment = comment;
                }
            });
        } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        let avg = 0;

        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error("[CREATE_PRODUCT_REVIEW] Error:", error);
        return next(new ErrorHandler("Failed to create/update review", 500));
    }
};

// Get All Reviews of a Product (for the logged-in seller)
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
    try {
        const { id: productId } = req.query;
        const sellerId = req.seller.id;

        if (!productId) {
            return next(new ErrorHandler("Product ID is required", 400));
        }

        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        if (product.seller.toString() !== sellerId.toString()) {
            return next(new ErrorHandler("You are not authorized to view reviews of this product", 403));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews,
        });
    } catch (error) {
        console.error("[GET_PRODUCT_REVIEWS] Error:", error);
        return next(new ErrorHandler("Failed to fetch product reviews", 500));
    }
});

// Delete Review (Only for Product Owner Seller)
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
    try {
        const { productId, id: reviewId } = req.query;
        const sellerId = req.seller?.id;

        if (!productId || !reviewId) {
            return next(new ErrorHandler("Product ID and Review ID are required", 400));
        }

        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        if (product.seller.toString() !== sellerId.toString()) {
            return next(new ErrorHandler("You are not authorized to delete this review", 403));
        }

        const reviews = product.reviews.filter((rev) => rev._id.toString() !== reviewId.toString());

        let avg = 0;
        reviews.forEach((rev) => {
            avg += rev.rating;
        });

        const ratings = reviews.length === 0 ? 0 : avg / reviews.length;
        const numOfReviews = reviews.length;

        await Product.findByIdAndUpdate(productId, {
            reviews,
            ratings,
            numOfReviews,
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        console.error("[DLETE_REVIEWS] Error:", error);
        return next(new ErrorHandler("Failed to delete reviews", 500));
    }
});
