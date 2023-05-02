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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
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
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
      }
    ],
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
    tickets: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

eventSchema.virtual('attendanceCount').get(function () {
  return this.attendees.length;
});

const Event = model('Event', eventSchema);

module.exports = Event;