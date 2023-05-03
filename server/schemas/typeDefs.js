const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar JSON  

  scalar Date

  type GeoJSON {
    type: String
    coordinates: [JSON]
  }

  type Location {
    address: String
    location: GeoJSON
  }

  type User {
    _id: ID
    username: String!
    email: String!
    location: Location
    userAvatar: String
    userCover: String
    artistAdmin: [Artist]
    savedArtists: [Artist]
    events: [Event]
    orders: [Order]
    savedArtistCount: Int
    eventCount: Int
  }

  type Artist {
    _id: ID
    artistName: String!
    admins: [User]
    artistBio: String
    genre: String!
    artistAvatar: String
    artistCover: String
    followedBy: [User]
    events: [Event]
    followerCount: Int
    eventCount: Int
  }

  type Venue {
    venueName: String!
    venueAddress: String
    location: GeoJSON
  }  

  type Comment {
    _id: ID
    commentBody: String!
    user: User!
    createdAt: Date
  }

  type Event {
    _id: ID
    artists: [Artist!]
    description: String!
    venue: Venue
    date: Date!
    startTime: String
    comments: [Comment]
    tickets: Ticket
    attendees: [User]
    attendanceCount: Int
  }

  type Ticket {
    _id: ID
    event: Event!
    price: Float
    quantity: Int
  }

  type Order {
    _id: ID
    purchaseDate: Date
    tickets: [Ticket]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ArtistInput {
    artistName: String!
    artistBio: String
    genre: String!
    artistAvatar: String
    artistCover: String
  }
  
  input EventInput {
    artists: [ID!]
    description: String!
    venueName: String!
    venueAddress: String
    type: String
    coordinates: [JSON]
    date: Date!
    startTime: String
  }
  
  input UpdateUserInput {
    username: String
    email: String
    address: String
    coordinates: [JSON]
    userAvatar: String
    userCover: String
  }

  input UpdateArtistInput {
    artistName: String
    admins: [ID]
    artistBio: String
    genre: String
    artistAvatar: String
    artistCover: String
  }

  input UpdateEventInput {
    artists: [ID]
    description: String
    date: Date
    startTime: String
    venueName: String
    venueAddress: String
    coordinates: [JSON]
  }
  
  type Query {
    me: User
    user(id: ID!): User
    artist(_id: ID!): Artist
    filterArtists(artistName: String, genre: String): [Artist]
    artists: [Artist]
    event(_id: ID!): Event
    events: [Event]
    order(_id: ID!): Order
    checkout(tickets: [ID!]): Checkout
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addArtist(input: ArtistInput): Artist
    addEvent(input: EventInput): Event
    addTicket(eventId: ID!, price: Float, quantity: Int): Event
    addOrder(tickets: [ID!]): Order
    updateUser(input: UpdateUserInput): User
    updateArtist(input: UpdateArtistInput): Artist
    updateEvent(input: UpdateEventInput): Event
    updateTicket(tickedId: ID!, price: Float, quantity: Int): Ticket
    saveArtist(artistId: ID!): User
  }
`;

module.exports = typeDefs;