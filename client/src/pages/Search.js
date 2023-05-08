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
  
  &.btn-primary {
    background-color: #50DD82 !important;
    border: 1px solid #ffff !important;
  }

  &.btn-primary:hover {
    background-color: #ffff !important;
    color: #50DD82 !important;
    border: 1px solid #50DD82 !important;
  }

  @media(max-width: 768px) {
    margin-top: .5rem;
  }
`;

const StyledToggle = styled(Dropdown.Toggle)`

  &.btn-primary {
    background-color: #838af3 !important;
    border: 1px solid #ffff !important;
    color: #ffff !important;
  }

  &.btn-primary:hover,
  &.dropdown-toggle.show {
    background-color: #ffff !important;
    color: #838af3 !important;
    border: 1px solid #838af3 !important;
  }

  &.dropdown-toggle.show {
    opacity: 0.75;
  }
`;

function Search() {
  const { loading: eventsLoading, data: eventsData, error: eventsError } = useQuery(QUERY_EVENTS);
  const { loading: artistsLoading, data: artistsData, error: artistsError } = useQuery(QUERY_ARTISTS);
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('Events')
  const [getAllResults, setGetAllResults] = useState(true);
  
  let eventData = [];
  let artistData = [];
  const loading = artistsLoading || eventsLoading;
  
  if (getAllResults){
    eventData = eventsData?.events || [];
    artistData = artistsData?.artists || [];
  }

  const handleFormSubmit = () => {

  };
 
  const handleInputSelect = (event) => {
    setSearchType(event);
  };

  const renderContainer = () => {
    if(searchType === 'Artists') {
      return <ArtistSearchContainer artistData={artistData} loading={loading}/>
      
    } else {
      return <EventSearchContainer eventData={eventData} loading={loading}/>
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
          <Form onSubmit={handleFormSubmit(artistData)}>
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
                <StyledButton type='submit' size='lg'>
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