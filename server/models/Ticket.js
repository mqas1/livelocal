const { Schema, model } = require('mongoose');

const ticketSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
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