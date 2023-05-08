import React from 'react';
import { Card, CardGroup, CardImg, Container, Col, Row, Button } from 'react-bootstrap';
import styled from 'styled-components';
import dateFormat from '../../utils/dateFormat';

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
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const StyledHFour = styled.h4`
  padding: auto;
  margin: 0 .5rem 0 0;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const StyledFooter = styled(Card.Footer)`
  background-color: #ffff;
  border: none;
  justify-content: center;
  display: flex;
`;

const StyledButton = styled(Button)`
  
  &.btn-primary{
    background-color: #50DD82 !important;
    border: 1px solid #ffff !important;
  }

  &.btn-primary:hover {
    background-color: #ffff !important;
    color: #50DD82 !important;
    border: 1px solid #50DD82 !important;
  }
`;

function EventCard({ eventData, loading }) {
  console.log(eventData);
  console.log(loading);
  
  return (
    <>
    <Container>
      <CardGroup>
    {eventData.map((event) => (
      <Col key={event._id} xs={12} md={6} lg={3} className='d-flex'>
      <StyledCard>
        <StyledCardImg src={event.eventCover}/>
        <Card.Header className='bg-white border-bottom-0'>
        <StyledHeader>
          {event.artists.map((artist) => (
              <StyledHFour key={artist._id}>{artist.artistName}</StyledHFour>
          ))}
          </StyledHeader>
        </Card.Header>
        <Card.Body className='d-flex flex-column'>
        <StyledContainer>
          <p className='text-center'>{dateFormat(parseInt(event.date))}, {event.startTime}</p>
          <p className='h5'>{event.venue.venueName}</p>
          <p>{event.venue.venueAddress}</p>
          <p style={{ fontStyle: 'italic' }}>{event.description}</p>
        </StyledContainer>
        </Card.Body>
        <StyledFooter>
        <StyledButton>More Info</StyledButton>
        </StyledFooter>
      </StyledCard>
      </Col>
    ))}
    </CardGroup>
    </Container>
    </>
  );
};

export default EventCard;