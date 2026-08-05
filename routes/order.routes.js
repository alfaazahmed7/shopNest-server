const express = require('express');
const { admin } = require('../middleware/adminMiddleware');
const { addOrderItems, getMyOrders, getOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

router.route('/').post(addOrderItems).get(admin, getOrders);
router.route('/myorders').get(getMyOrders);
router.route('/:id/status').put(admin, updateOrderStatus);

module.exports = router;