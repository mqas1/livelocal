const { Schema, model } = require('mongoose');

const ticketSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Event',
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0
    },
  },
);

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;