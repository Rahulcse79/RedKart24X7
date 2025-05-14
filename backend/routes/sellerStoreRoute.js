const express = require('express');

const { createStoreSetup, bankAccountSetup, businessInformationSetup, documentUploadSetup, verification, getCreateStoreSetup, getBankAccountSetup, getBusinessInformationSetup, getDocumentUploadSetup, getVerification } = require('../controllers/sellerStoreController');
const { isAuthenticatedSeller, authorizeRolesForSeller } = require('../middlewares/auth');
const router = express.Router();

router.route('/createStore-setup').post(isAuthenticatedSeller, createStoreSetup);
router.route('/bankAccount-setup').post(isAuthenticatedSeller, bankAccountSetup);
// router.route('/businessInfo-setup').post(isAuthenticatedSeller, businessInformationSetup);
// router.route('/documentUpload-setup').post(isAuthenticatedSeller, documentUploadSetup);
// router.route('/verification').post(isAuthenticatedSeller, verification);
// router.route('admin/get/storeData').get(isAuthenticatedSeller, authorizeRolesForSeller("admin"), getCreateStoreSetup);

module.exports = router;