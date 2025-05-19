const express = require('express');

const { OTPBasedLoginUser, OTPSendUser, registerUser, deactivateAccount, deleteRequestAccount, loginUser, logoutUser, getUserDetails, forgotPassword, resetPassword, updatePassword, updateProfile } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.route('/register').post(registerUser); 
router.route('/login').post(loginUser);
router.route('/otp/send').post(OTPSendUser);
router.route('/otp/based/login').post(OTPBasedLoginUser);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/deactivate').get(isAuthenticatedUser, deactivateAccount);
router.route('/request/delete').get(isAuthenticatedUser, deleteRequestAccount); 

module.exports = router;