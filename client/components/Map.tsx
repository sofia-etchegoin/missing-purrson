import React, { useState, useEffect, useRef } from 'react'
import {
  useGoogleMap,
  GoogleMapsProvider,
} from '@ubilabs/google-maps-react-hooks'

const mapOptions = {
  zoom: 6,
  center: {
    lat: -41.2924,
    lng: 174.7787,
  },
}

export default function Map({ catSightings }) {
  const [mapContainer, setMapContainer] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const handleLoad = (map) => {
    setMapLoaded(true)
  }

  return (
    <GoogleMapsProvider
      googleMapsAPIKey="AIzaSyD499QbrpxctpzIhJlz48TDok-4hXTRTWw"
      mapOptions={mapOptions}
      mapContainer={mapContainer}
      onLoad={handleLoad}
    >
      <div
        ref={(node) => setMapContainer(node)}
        style={{ height: '100%', borderRadius: '15px' }}
      />
      {/* <Location catSightings={catSightings} /> */}
      {mapLoaded && <Location catSightings={catSightings} />}
    </GoogleMapsProvider>
  )
}

function Location({ catSightings }) {
  const [lat, setLat] = useState(-41.2924)
  const [lng, setLng] = useState(174.7787)
  const map = useGoogleMap()
  const markerRef = useRef()

  useEffect(() => {
    if (!map || !catSightings || catSightings.length === 0) {
      return
    }

    // Clear existing markers
    if (markerRef.current) {
      markerRef.current.setMap(null)
    }

    // Create markers for each sighting
    catSightings.forEach((sighting) => {
      const [latString, lngString] = sighting.location.split(', ')
      const lat = parseFloat(latString.trim())
      const lng = parseFloat(lngString.trim())

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
      })

      markerRef.current = marker
    })

    // Pan to the first sighting's location
    const [firstLatString, firstLngString] =
      catSightings[0].location.split(', ')
    const firstLat = parseFloat(firstLatString.trim())
    const firstLng = parseFloat(firstLngString.trim())

    map.panTo({ lat: firstLat, lng: firstLng })
  }, [map, catSightings])

  return (
    <div className="lat-lng">
      <input
        type="number"
        value={lat}
        onChange={(event) => setLat(parseFloat(event.target.value))}
        step={0.01}
      />
      <input
        type="number"
        value={lng}
        onChange={(event) => setLng(parseFloat(event.target.value))}
        step={0.01}
      />
    </div>
  )
}
