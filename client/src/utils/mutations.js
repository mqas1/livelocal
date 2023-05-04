import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        location {
          location {
            type
            coordinates
          }
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input) {
      _id
      username
      email
      location {
        address
        location {
          type
          coordinates
        }
      }
      userAvatar
      userCover
    }
  }
`;

export const ADD_ARTIST = gql`
  mutation AddArtist($input: ArtistInput) {
    addArtist(input: $input) {
      _id
      artistName
      admins {
        _id
      }
      artistBio
      genre
      artistAvatar
      artistCover
    }
  }
`;

export const UPDATE_ARTIST = gql`
  mutation UpdateArtist($input: UpdateArtistInput) {
    updateArtist(input: $input) {
      _id
      artistName
      admins {
        _id
      }
      artistBio
      genre
      artistAvatar
      artistCover
    }
  }
`;

export const ADD_ADMINS = gql`
  mutation UpdateArtistAdmins($artistId: ID!, $admins: [ID!]) {
    updateArtistAdmins(artistId: $artistId, admins: $admins) {
      _id
      artistName
      admins {
        _id
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($input: EventInput) {
    addEvent(input: $input) {
      _id
      artists {
        _id
      }
      description
      venue {
        venueName
        venueAddress
        location {
          type
          coordinates
        }
      }
      date
      startTime
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($input: UpdateEventInput) {
    updateEvent(input: $input) {
      _id
      artists {
        _id
      }
      description
      venue {
        venueName
        venueAddress
        location {
          type
          coordinates
        }
      }
      date
      startTime
    }
  }
`;

export const ADD_EVENT_ARTISTS = gql`
  mutation UpdateEventArtists($eventId: ID!, $artists: [ID!]) {
    updateEventArtists(eventId: $eventId, artists: $artists) {
      _id
      artists {
        _id
      }
      description
      venue {
        venueName
      }
      date
      startTime
    }
  }
`;

