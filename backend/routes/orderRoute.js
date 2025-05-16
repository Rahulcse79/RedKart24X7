const express = require('express');
const { newOrder, getSingleOrderDetails, myOrders } = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetails);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

module.exports = router;