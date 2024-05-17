const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  eatery: {
    type: Schema.Types.ObjectId,
    ref: 'Eatery',
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

module.exports = mongoose.model('Promotion', promotionSchema);
