import React from 'react';
import { Spinner } from 'react-bootstrap';

import EventCard from '../EventCard';

function EventSearchContainer({ eventData, loading }) {
  if(loading) {
    return <Spinner animation='border' role='status'>
      <span className='visually-hidden'><h2>Loading...</h2></span>
    </Spinner>
  }
  
  return (
    <>
    <EventCard eventData={eventData} loading={loading}/>
    </>
  );
};

export default EventSearchContainer;