import React from 'react';
import { Spinner } from 'react-bootstrap';

import ArtistCard from '../ArtistCard';

function ArtistSearchContainer({ artistData, loading }) {
  
  if(loading) {
    return <Spinner animation='border' role='status'>
      <span className='visually-hidden'><h2>Loading...</h2></span>
    </Spinner>
  }
  
  return (
    <>
    <ArtistCard artistData={artistData} loading={loading} />
    </>
  );
};

export default ArtistSearchContainer;