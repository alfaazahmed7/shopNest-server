const Order = require("../model/Order");
const sendEmail = require("../utils/sendEmail");

const addOrderItems = async (req, res) => {
    try {
        const { items, totalAmount, adddress, paymentId } = req.body;

        if (items && items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }
        else {
            const order = new Order({
                userId: req.user._id,
                itmes,
                totalAmount,
                address,
                paymentId,
            });
            const createOrder = await order.save();

            // send email confirmation email
            const message = `
        <h2>Order Confirmation</h2>
        <p>Hello ${req.user.name},</p>
        <p>Your order has been successfully placed! Order ID: <strong>${createdOrder._id}</strong></p>
        <p>Total Amount Paid: $${totalAmount.toFixed(2)}</p>
        <p>It will be shipped to: ${address.street}, ${address.city}</p>
        <p>Thank you for shopping with ShopNest!</p>
      `;

            await sendEmail({
                email: req.user.email,
                subject: 'Shopnest - Order Confirmation',
                message
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order
            .find({ user: req.user._id })
            .populate('items.productId', 'name price');
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'id name');
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.find(req.params.id);
        if (order) {
            order.status = status;
            await order.save();
            res.json({ message: 'Order status updated', order });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};

module.exports = {
    addOrderItems,
    getMyOrders,
    getOrders,
    updateOrderStatus
};