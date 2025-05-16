const express = require('express');

const { createStoreSetup, bankAccountSetup, businessInformationSetup, documentUploadSetup, verification } = require('../controllers/sellerStoreController');
const { isAuthenticatedSeller } = require('../middlewares/auth');
const router = express.Router();

router.route('/createStore-setup').post(isAuthenticatedSeller, createStoreSetup);
router.route('/bankAccount-setup').post(isAuthenticatedSeller, bankAccountSetup);
router.route('/businessInfo-setup').post(isAuthenticatedSeller, businessInformationSetup);
router.route('/documentUpload-setup').post(isAuthenticatedSeller, documentUploadSetup);
router.route('/verification').post(isAuthenticatedSeller, verification)

module.exports = router;