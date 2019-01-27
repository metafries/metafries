import React from 'react'
import GoogleMapReact from 'google-map-react';

const Marker = () => (
  <img 
    src='/static/images/whazup-square-logo.png' 
    className="map-marker rounded-circle" 
    alt="..."
  />
)

const EventDetailMap = ({venuelatlng}) => {
  const center = [venuelatlng.lat, venuelatlng.lng]
  const zoom = 14
  return (
    <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA8xyoeTTfh5SOxWdF8C5J9oD0PrBQv3WQ' }}
        defaultCenter={center}
        defaultZoom={zoom}
        >
        <Marker
            lat={venuelatlng.lat}
            lng={venuelatlng.lng}
        />
        </GoogleMapReact>
    </div>
  )
}

export default EventDetailMap
