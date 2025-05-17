const express = require('express');
const { getAllProducts, getProductDetails, updateProduct, deleteProduct, getProductReviews, deleteReview, createProductReview, createProduct, getProducts } = require('../controllers/productController');
const { isAuthenticatedSeller, isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/seller/d2/products').get(isAuthenticatedSeller, getAllProducts);
router.route('/seller/d2/products/all').get(isAuthenticatedSeller, getProducts);
router.route('/seller/d2/product/new').post(isAuthenticatedSeller, createProduct);
router.route('/seller/d2/product/:id').get(isAuthenticatedSeller, getProductDetails);
router.route('/seller/d2/product/:id').put(isAuthenticatedSeller, updateProduct).delete(isAuthenticatedSeller, deleteProduct);
router.route('/seller/d2/reviews').get(isAuthenticatedSeller, getProductReviews).delete(isAuthenticatedSeller, deleteReview);

module.exports = router;