const { AuthenticationError } = require('apollo-server-express');
const { User, Artist, Event } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLJSON } = require('graphql-type-json');

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User
          .findOne({ _id: context.user._id })
          .populate({ 
            path: 'artistAdmin',
            sort: { artistName: 1 },
          })
          .populate({ 
            path: 'savedArtists',
            sort: { artistName: 1 },
          })
          .populate({ 
            path:'events', 
            populate: { 
              path: 'artists' 
            },
            sort: { date: -1 }, 
          })
          .populate({ 
            path: 'orders', 
            populate: { 
              path: 'tickets', 
              populate: { 
                path: 'event', 
                populate: { 
                  path: 'artists' 
                }, 
              }, 
            },
            sort: { purchaseDate: -1 }, 
          });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    user: async (parent, { userId }, context) => {
      if(context.user){
        return await User
          .findOne({ userId })
          .populate({ 
            path: 'savedArtists',
            sort: { artistName: 1 },
          })
          .populate({ 
            path: 'events',
            populate: {
              path: 'artists'
            },
            sort: { date: -1 }, 
          });
      }
      throw new AuthenticationError('Not logged in');
    },
    artist: async (parent, { artistId }, context) => {
      if(context.user) {
        return await Artist
          .findOne({ artistId })
          .populate('followedBy')
          .populate({ 
            path: 'events',
            sort: { date: -1 }
          });
      }
      throw new AuthenticationError('Not logged in');
    },
    filterArtists: async (parent, { artistName, genre }) => {
      const params = {};
  
      if (artistName) {
        params.artistName = {
          $regex: artistName
        };
      }
  
      if (genre) {
        params.genre = genre; 
      }
      
      return await Artist.find(params).sort({ artistName: 1 });
    },
    artists: async () => {
      return await Artist.find({}).sort({ artistName: 1 });
    },
    event: async (parent, { eventId }, context) => {
      if(context.user) {
        const event =  await Event
          .findOne({ eventId })
          .populate('artists')
          .populate({ 
            path: 'comments',
            select: 'user',
          })
          .populate('tickets')
          .populate({ 
            path: 'attendees', 
            sort: { username: 1 } 
          });

        event.comments.sort((a, b) => b.createdAt - a.createdAt);

        return event;
      }
      throw new AuthenticationError('Not logged in');
    },
    events: async () => {
      return await Event.find({}).populate('artists')
        .populate('tickets').sort({ date: -1 });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, { input }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(input.userId, input, { new: true, runValidators: true, });
      }
      throw new AuthenticationError('Not logged in');
    },
    addArtist: async (parent, { input }, context) => {
      if (context.user) {
        const newArtist = await Artist.create(input);

        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { artistAdmin: newArtist._id } },
          { new: true, runValidators: true }
        );
        
        return newArtist;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateArtist: async (parent, { input }, context) => {
      if (context.user) {
        return await Artist.findByIdAndUpdate(input.artistId, input, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    updateArtistAdmins: async (parent, { artistId, admins }, context) => {
      if(context.user) {
        const updatedArtist = await Artist.findByIdAndUpdate(
          artistId,
          { $addToSet: { admins:{ $each: admins } } },
          { new: true },
        );
      
        await User.updateMany(
          { _id: { $in: admins } },
          { $addToSet: { artistAdmin: artistId } },
          { new: true, runValidators: true }
        );

        return updatedArtist;
      }
      throw new AuthenticationError('Not logged in');
    },
    addEvent: async (parent, { input }, context) => {
      if(context.user) {
        const event = await Event.create(input);

        await Artist.updateMany(
          { _id: { $in: input.artists} }, 
          { $addToSet: { events: event._id } },
          { new: true }
        );
    
        return event;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateEvent: async (parent, { input }, context) => {
      if(context.user) {
        return await Event.findByIdAndUpdate(input.eventId, input, { new: true });
    
      }
      throw new AuthenticationError('Not logged in');
    },
    updateEventArtists: async (parent, { eventId, artists }, context) => {
      if(context.user) {
        const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          { $addToSet: { artists:{ $each: artists } } },
          { new: true },
        );

        await Artist.updateMany(
          { _id: { $in: artists} }, 
          { $addToSet: { events: updatedEvent._id } },
          { new: true }
        );

      return updatedEvent;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;