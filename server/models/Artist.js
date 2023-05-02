const { Schema, model } = require('mongoose');

const artistSchema = new Schema(
  {
    artistName: {
      type: String,
      required: true,
    },
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    artistBio: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    artistAvatar: {
      type: String,
    },
    artistCover: {
      type: String,
    },
    followedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

artistSchema.virtual('followerCount').get(function () {
  return this.followedBy.length;
});

artistSchema.virtual('eventCount').get(function () {
  return this.events.length;
});

const Artist = model('Artist', artistSchema);

module.exports = Artist;