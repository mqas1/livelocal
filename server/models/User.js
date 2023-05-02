const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const locationSchema = new Schema (
  {
    address: {
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

const userSchema = new Schema (
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    location: locationSchema,
    userAvatar: {
      type: String,
    },
    userCover: {
      type: String,
    },
    artistAdmin: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
      },
    ],
    savedArtists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('savedArtistCount').get(function () {
  return this.savedArtists.length;
});

userSchema.virtual('eventCount').get(function () {
  return this.events.length;
});

const User = model('User', userSchema);

module.exports = User;
