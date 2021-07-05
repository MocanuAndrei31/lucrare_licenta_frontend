import React from 'react';
import './map.scss';
import Map from './map';

const SimpleMap = () => {
  return (
    <div style={{ width: '100%', height: '60vh' }}>
      <Map
        googleMapURL= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAJ7tP5KberfV9597DQvstX3o0B7EBhAqU&v=3.exp&libraries=geometry,drawing,places'
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default SimpleMap;
