import React from 'react';
import { Spinner } from 'react-bootstrap';

import ArtistCard from '../ArtistCard';

function ArtistSearchContainer({ artistData, loading }) {
  console.log(loading);
  
  if(loading) {
    return <Spinner animation="border" role="status">
      <span><h2>Loading...</h2></span>
    </Spinner>
  }
  
  return (
    <>
    <div>Artists go here.</div>
    <ArtistCard />
    </>
  );
};

export default ArtistSearchContainer;