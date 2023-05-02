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
        artist {
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
            artist {
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