const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const venueSchema = new Schema (
  {
    venueName: {
      type: String,
      required: true,
    },
    venueAddress: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
  },
);

const commentSchema = new Schema(
  {
    commentBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: v => dateFormat(v),
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

const eventSchema = new Schema(
  {
    artistId: {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    venue: venueSchema,
    date: {
      type: String,
    },
    startTime: {
      type: String,
    },
    comments: [commentSchema],
    ticketsAvailable: {
      type: Number,
    },
    ticketPrice: {
      type: Number,
      default: 0,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ]
  },
);

const Event = model('Event', eventSchema);

module.exports = Event;