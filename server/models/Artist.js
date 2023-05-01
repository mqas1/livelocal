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
  }  
);

const Artist = model('Artist', artistSchema);

module.exports = Artist;