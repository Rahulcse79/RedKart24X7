const express = require('express');

const { registerSeller, loginSeller, OTPSendSeller, OTPBasedLoginSeller, logoutSeller, forgotPassword, resetPassword, updatePassword, getSellerDetails, updateProfile, deactivateAccount, deleteRequestAccount } = require('../controllers/sellerController');
const { isAuthenticatedSeller } = require('../middlewares/auth');
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
router.route('/deactivate').get(isAuthenticatedSeller, deactivateAccount);
router.route('/request/delete').get(isAuthenticatedSeller, deleteRequestAccount);
router.route('/me/update').put(isAuthenticatedSeller, updateProfile);

module.exports = router;