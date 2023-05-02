const { Schema, model } = require('mongoose');

const ticketSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.99
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