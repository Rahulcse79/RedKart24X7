const express = require('express');

const { registerSeller, loginSeller, OTPSendSeller, OTPBasedLoginSeller, getAllSellers, logoutSeller, getSingleSeller, forgotPassword, resetPassword, updatePassword, getSellerDetails, updateProfile, deleteSeller, updateSellerRole } = require('../controllers/sellerController');
const { isAuthenticatedSeller, authorizeRolesForSeller } = require('../middlewares/auth');
const router = express.Router();

router.route('/register').post(registerSeller);
router.route('/login').post(loginSeller);
router.route('/otp/send').post(OTPSendSeller);
router.route('/otp/based/login').post(OTPBasedLoginSeller);
router.route('/logout').get(logoutSeller);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticatedSeller, updatePassword);
router.route('/me').get(isAuthenticatedSeller, getSellerDetails);
router.route('/me/update').put(isAuthenticatedSeller, updateProfile);
router.route("/admin/sellers").get(isAuthenticatedSeller, authorizeRolesForSeller("admin"), getAllSellers);
router.route("/admin/seller/:id").get(isAuthenticatedSeller, authorizeRolesForSeller("admin"), getSingleSeller).put(isAuthenticatedSeller, authorizeRolesForSeller("admin"), updateSellerRole).delete(isAuthenticatedSeller, authorizeRolesForSeller("admin"), deleteSeller);

module.exports = router;