const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const orderSchema = new Schema(
  {
    purchaseDate: {
      type: Date,
      default: Date.now,
      get: v => dateFormat(v),
    },
    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

const Order = model('Order', orderSchema);

module.exports = Order;
