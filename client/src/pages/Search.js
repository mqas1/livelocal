import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  ButtonGroup,
  Dropdown,
  Spinner
} from 'react-bootstrap';
import styled from 'styled-components';

import EventSearchContainer from '../components/EventSearchContainer';
import ArtistSearchContainer from '../components/ArtistSearchContainer';
import { 
  QUERY_EVENTS, 
  QUERY_ARTISTS, 
  QUERY_FILTER_ARTISTS 
} from '../utils/queries';

const StyledFormDiv = styled.div`
  background-color: #838af3;
`;

const StyledButton = styled(Button)`
  background-color: #50DD82;
  border: 1px solid #ffff;

  &:hover {
    background-color: #ffff;
    color: #50DD82;
    border: 1px solid #50DD82;
  }

  @media(max-width: 768px) {
    margin-top: .5rem;
  }
`;

const StyledToggle = styled(Dropdown.Toggle)`

  &.btn-primary {
    background-color: #838af3;
    border: 1px solid #ffff;
    color: #ffff;
  }

  &.btn-primary:hover {
    background-color: #ffff;
    color: #838af3;
    border: 1px solid #838af3;
  }
`;

function Search() {
  const { loading: eventsLoading, data: eventsData, error: eventsError } = useQuery(QUERY_EVENTS);
  const { loading: artistsLoading, data: artistsData, error: artistsError } = useQuery(QUERY_ARTISTS);
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('Events')
  const handleFormSubmit = () => {

  }
  
  const loading = artistsLoading || eventsLoading;
  const eventData = eventsData?.events || {};
  const artistData = artistsData?.artists || {};

  console.log(artistData);
  console.log(eventData);
  
  const handleInputSelect = (event) => {
    setSearchType(event);
  };

  const renderContainer = () => {
    if(searchType === 'Artists') {
      return <ArtistSearchContainer artistData={artistData} loading={loading}/>
      
    } else {
      return <EventSearchContainer event={eventData} loading={loading}/>
    }
  };

  return (
    <>
      <StyledFormDiv className="text-light p-5">
        <Container className='pb-5 d-flex flex-end'>
          <Dropdown onSelect={handleInputSelect}>
            <StyledToggle id="dropdown-basic">
              {searchType}
            </StyledToggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={'Artists'}>Artists</Dropdown.Item>
              <Dropdown.Item eventKey={'Events'}>Events</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
        <Container>
          <h1>{`Search for ${searchType}!`}</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for...'
                />
              </Col>
              <Col xs={12} md={4}>
                <StyledButton type='submit' variant='success' size='lg'>
                  Submit Search
                </StyledButton>
              </Col>
            </Row>
          </Form>
        </Container>
      </StyledFormDiv>
    {renderContainer()}
    </>
  )

};

export default Search;