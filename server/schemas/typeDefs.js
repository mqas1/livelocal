const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar JSON  

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
    createdAt: String
  }

  type Event {
    _id: ID
    artists: [Artist!]
    description: String!
    venue: Venue
    date: String!
    startTime: String
    eventCover: String
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
    purchaseDate: String
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
    admins: [ID!]
    artistName: String!
    artistBio: String
    genre: String!
    artistAvatar: String
    artistCover: String
  }
  
  input EventInput {
    artists: [ID!]
    description: String!
    venue: VenueInput
    date: String!
    startTime: String
    eventCover: String
  }

  input VenueInput {
    venueName: String!
    venueAddress: String
    location: CoordinatesInput
  }
  
  input UpdateUserInput {
    userId: ID!
    username: String
    email: String
    location: UserLocationInput
    userAvatar: String
    userCover: String
  }

  input UserLocationInput {
    address: String
    location: CoordinatesInput
  }

  input CoordinatesInput {
    type: String
    coordinates: [JSON]
  }

  input UpdateArtistInput {
    artistId: ID!
    artistName: String
    artistBio: String
    genre: String
    artistAvatar: String
    artistCover: String
  }

  input UpdateEventInput {
    eventId: ID!
    description: String
    date: String
    startTime: String
    eventCover: String
    venue: VenueInput
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
    updateUser(input: UpdateUserInput): User
    addArtist(input: ArtistInput): Artist
    updateArtist(input: UpdateArtistInput): Artist
    updateArtistAdmins(artistId: ID!, admins: [ID!]): Artist
    addEvent(input: EventInput): Event
    updateEvent(input: UpdateEventInput): Event
    updateEventArtists(eventId: ID!, artists: [ID!]): Event
    addTicket(eventId: ID!, price: Float, quantity: Int): Event
    updateTicket(tickedId: ID!, price: Float, quantity: Int): Ticket
    addOrder(tickets: [ID!]): Order
    saveArtist(artistId: ID!): User
  }
`;

module.exports = typeDefs;