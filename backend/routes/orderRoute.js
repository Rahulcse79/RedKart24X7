const express = require('express');
const { newOrder, getSingleOrderDetails, myOrders, getAllOrders } = require('../controllers/orderController');
const { isAuthenticatedUser, isAuthenticatedSeller } = require('../middlewares/auth');

const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetails);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
// router.route('/orders').get(isAuthenticatedSeller, getAllOrders);


module.exports = router;