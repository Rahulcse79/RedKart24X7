const express = require('express');

const { getAllUsers, getSingleUser, getAllSellers, getSingleSeller, deleteUser, deleteOrder, updateUserRole, updateOrder,
deleteAccount, singleUserOffer, deleteProductReviews, getProductReviews, updateUserOffer, deleteUserOffer, updateSellerRole, getUserOffers, getAllUsersOffers, } = require('../controllers/adminController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// User 
router.route("/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser).put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

// Seller 
router.route("/sellers").get(isAuthenticatedUser, authorizeRoles("admin"), getAllSellers);
router.route("/seller/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleSeller).put(isAuthenticatedUser, authorizeRoles("admin"), updateSellerRole);
router.route('/delete/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAccount);
// router.route('/get/storeData').get(isAuthenticatedUser, authorizeRoles("admin"), getCreateStoreSetup);

// Offers
router.route("/user/:id/offer").post(isAuthenticatedUser, authorizeRoles("admin"), singleUserOffer);
router.route("/user/:id/offer/:offerIndex").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserOffer);
router.route("/user/:id/offer/:offerIndex").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserOffer);
router.route("/user/:id/offers").get(isAuthenticatedUser, authorizeRoles("admin", "user"), getUserOffers);
router.route("/users/offers").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsersOffers);

// orders
router.route('/order/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

// products
router.route("/get/reviews").get(isAuthenticatedUser, authorizeRoles("admin"), getProductReviews);
router.route("/delete/product").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductReviews);

module.exports = router;