const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispatchRiderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  vehicleDetails: {
    type: String,
    required: true,
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('DispatchRider', dispatchRiderSchema);
