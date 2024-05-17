const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  eatery: {
    type: Schema.Types.ObjectId,
    ref: 'Eatery',
    required: true
  },
  
  items: [{
    menuItem: {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalCost: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'In Progress', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  dispatchRider: {
    type: Schema.Types.ObjectId,
    ref: 'DispatchRider',
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
