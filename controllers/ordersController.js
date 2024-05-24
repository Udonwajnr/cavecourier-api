const asyncHandler = require("express-async-handler")
const Order = require("../model/order")

// Get all orders
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user eatery items.menuItem dispatchRider');
    res.status(200).json(orders);
  });
  
  // Get a single order by ID
  const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user eatery items.menuItem dispatchRider');
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });
  
  const createOrder = asyncHandler(async (req, res) => {
    const { user, eatery, items, totalCost, deliveryAddress } = req.body;
  
    const order = new Order({
      user,
      eatery,
      items,
      totalCost,
      deliveryAddress,
    });
  
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  });

  const updateOrder = asyncHandler(async (req, res) => {
    const { status, dispatchRider } = req.body;
    const order = await Order.findById(req.params.id);
  
    if (order) {
      order.status = status || order.status;
      order.dispatchRider = dispatchRider || order.dispatchRider;
      order.updatedAt = Date.now();
      await order.save();
      res.status(200).json({ message: 'Order updated successfully', order });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });

// Delete an order by ID
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        await order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
  });

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}