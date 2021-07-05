import React from "react";
import "./map.scss";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
  Circle,
} from "react-google-maps";

const Map = () => {
  return (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: 44.18, lng: 28.63 }}>
      <Marker
        position={{
          lat: 44.18,
          lng: 28.63,
        }}
      />
      <Circle center={{ lat: 44.18, lng: 28.63 }} radius={10000} />
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));
