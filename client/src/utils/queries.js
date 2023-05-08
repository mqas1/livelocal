import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      location {
        address
        location {
          type
          coordinates
        }
      }
      userAvatar
      userCover
      artistAdmin {
        _id
        artistName
        artistAvatar
      }
      savedArtists {
        _id
        artistName
        artistAvatar
      }
      events {
        _id
        artists {
          artistName
        }
        description
        venue {
          venueName
          venueAddress
        }
        date
        startTime
      }
      orders {
        _id
        purchaseDate
        tickets {
          _id
          event {
            _id
            artists {
              artistName
            }
            venue {
              venueName
            }
            date
            startTime
          }
          price
        }
      }
      savedArtistCount
      eventCount
    }
  }
`;

export const QUERY_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      _id
      username
      userAvatar
      userCover
      savedArtists {
        _id
        artistName
        artistAvatar
      }
      events {
        _id
        artists {
          _id
          artistName
        }
        description
        venue {
          venueName
        }
        date
        startTime
      }
      savedArtistCount
      eventCount
    }
  }
`;

export const QUERY_SINGLE_ARTIST = gql`
  query Artist($id: ID!) {
    artist(_id: $id) {
      _id
      artistName
      artistBio
      genre
      artistAvatar
      artistCover
      followedBy {
        _id
        username
        userAvatar
      }
      events {
        _id
        description
        venue {
          venueName
        }
        date
        startTime
      }
      followerCount
      eventCount
    }
  }
`;

export const QUERY_FILTER_ARTISTS = gql`
  query FilterArtists($artistName: String, $genre: String) {
    filterArtists(artistName: $artistName, genre: $genre) {
      _id
      artistName
      artistBio
      genre
      artistAvatar
      artistCover
      followerCount
      eventCount
    }
  }
`;

export const QUERY_ARTISTS = gql`
  query Artists {
    artists {
      _id
      artistName
      artistBio
      genre
      artistAvatar
      artistCover
      followerCount
      eventCount
    }
  }
`;

export const QUERY_SINGLE_EVENT = gql`
  query Event($id: ID!) {
    event(_id: $id) {
      _id
      artists {
        _id
        artistName
        artistAvatar
      }
      description
      venue {
        venueName
        venueAddress
      }
      date
      startTime
      eventCover
      comments {
        _id
        commentBody
        user {
          _id
          username
          userAvatar
        }
        createdAt
      }
      tickets {
        _id
        price
        quantity
      }
      attendees {
        _id
        username
        userAvatar
      }
      attendanceCount
    }
  }
`;

export const QUERY_EVENTS = gql`
  query Events {
    events {
      _id
      artists {
        _id
        artistName
        artistAvatar
      }
      description
      venue {
        venueName
        venueAddress
      }
      date
      startTime
      eventCover
      tickets {
        _id
        price
        quantity
      }
      attendanceCount
    }
  }
`;