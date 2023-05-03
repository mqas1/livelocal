const { AuthenticationError } = require('apollo-server-express');
const { User, Artist, Event, Ticket, Order } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLJSON } = require('graphql-type-json');
const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); 
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); 
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
    
      return new Date(parseInt(ast.value, 10));
    }
  
    return null;
  },
});

const resolvers = {
  JSON: GraphQLJSON,
  Date: dateScalar,
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
    user: async (parent, { userId }) => {
      return await User
        .findOne({ _id: userId })
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
    },
    artist: async (parent, { artistId }) => {
      return await Artist
        .findOne( {_id: artistId} )
        .populate('followedBy')
        .populate({ 
          path: 'events',
          sort: { date: -1 }
        });
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
    event: async (parent, { eventId }) => {
      const event =  await Event
        .findOne({ _id: eventId })
        .populate('artists')
        .populate('comments.user')
        .populate('tickets')
        .populate({ 
          path: 'attendees', 
          sort: { username: 1 } 
        });

        event.comments.sort((a, b) => b.createdAt - a.createdAt);

        return event;
    },
    events: async () => {
      const events =  await Event
        .find({})
        .populate('artists')
        .populate('comments.user')
        .populate('tickets')
        .populate({ 
          path: 'attendees', 
          sort: { username: 1 } 
        });

        events.comments.sort((a, b) => b.createdAt - a.createdAt);

        return events;
    }
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
  }
};

module.exports = resolvers;