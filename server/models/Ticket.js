const { Schema, model } = require('mongoose');

const ticketSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
);

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;