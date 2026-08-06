const express = require('express');
const { addOrderItems, getMyOrders, getOrders, updateOrderStatus } = require('../controllers/order.controller');
const admin = require('../middleware/admin.middleware');

const router = express.Router();

router.route('/').post(addOrderItems).get(admin, getOrders);
router.route('/myorders').get(getMyOrders);
router.route('/:id/status').put(admin, updateOrderStatus);

module.exports = router;