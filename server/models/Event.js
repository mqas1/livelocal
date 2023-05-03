const { Schema, model } = require('mongoose');

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
      require: true,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
);

const eventSchema = new Schema(
  {
    artists: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Artist',
      }
    ],
    description: {
      type: String,
      required: true,
    },
    venue: venueSchema,
    date: {
      type: Date,
      required: true,
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
    },
    id: false,
  },
);

eventSchema.virtual('attendanceCount').get(function () {
  return this.attendees.length;
});

const Event = model('Event', eventSchema);

module.exports = Event;