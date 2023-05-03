const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
  },
);

const Order = model('Order', orderSchema);

module.exports = Order;
