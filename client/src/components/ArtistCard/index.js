import React from 'react';
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin: 1rem;
  max-height: 100vh;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  border: none;
  transition: 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 0 20px;
    transform: scale(1.01);
  }
`;

const StyledCardImg = styled(Card.Img)`
  display: flex;
  height: 250px;
  width: 100%;
  postition: relative;
  object-fit: cover;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  opacity: 50%;

  &:hover {
    opacity: 75%;
  }
`;

const StyledAvatar = styled.img`
  position: absolute;
  display: flex;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffff;
  height: 10rem;
  width: 10rem;
  z-index: 1;
  margin: -4.25rem 0 0 .5rem;

  @media(min-width: 768px){
    height: 8rem;
    width: 8rem;
  }
`;

const StyledArtistName = styled(Link)`
  display: flex;
  margin: 4rem 0 1rem; 1rem;
  text-decoration: none;
  color: black;

  &:hover {
    color: black;
  }

  @media(max-width: 768px) {
    margin-top: 6rem;
  }
`;

const StyledStat = styled.p`
  display: flex;
  font-size: 14px;
  font-style: italic;
  
  @media(max-width: 768px) {
    font-size: 16px;
  }
`;

const StyledStatContainer = styled(Container)`
  display: flex;
  flex-direction: flex-row;
  margin-top: -1rem;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: start;

  &:last-child {
    flex-grow: 1;
  }
`;

const StyledBio = styled.p`
  overflow: hidden;
  white-space: break-spaces;
  text-overflow: ellipsis;
  height: 50px;
  width: auto;

  &:hover {
    overflow: auto;
  }
`;

const StyledCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;

  &:last-child {
    flex-grow: 1;
  }
`;

function ArtistCard({ artistData, loading }) {
  console.log(artistData);
  console.log(loading);

  return (
    <>
    <Container>
      <CardGroup>
      {artistData.map((artist) => (
        <Col key={artist._id} xs={12} md={6} lg={3} className='d-flex'>
        <StyledCard >
          <Link to={`/artist/${artist._id}`}>
           <StyledCardImg src={artist?.artistCover}/>
          <StyledAvatar src={artist?.artistAvatar}/>
          </Link>
          <StyledCardBody className='d-flex flex-column'>
            <StyledArtistName to={`/artist/${artist._id}`}><h4>{artist.artistName}</h4></StyledArtistName>
            <StyledStatContainer className='d-flex flex-row'>
            <Row className='mx-1'>
              <Col xs='auto'>
            <StyledStat>{`Followers: ${artist.followerCount}`}</StyledStat>
            </Col>
            <Col xs='auto'>
            <StyledStat>{`Events: ${artist.eventCount}`}</StyledStat>
            </Col>
            </Row>
            <Row>
              <Col xs='auto'>
              <StyledStat>{`Genre: ${artist.genre}`}</StyledStat>
              </Col>
            </Row>
            </StyledStatContainer>
            <StyledBio>
              {artist.artistBio}
            </StyledBio>
          </StyledCardBody>
        </StyledCard>
        </Col>
      ))}
    
      </CardGroup>
    </Container>
    </>
  );
};

export default ArtistCard;