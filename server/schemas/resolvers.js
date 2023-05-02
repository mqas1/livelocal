const { AuthenticationError } = require('apollo-server-express');
const { User, Artist, Event, Ticket, Order } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLJSON } = require('graphql-type-json');

const resolvers = {
  JSON: GraphQLJSON,
};

module.exports = resolvers;