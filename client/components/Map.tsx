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

export default function Map() {
  const [mapContainer, setMapContainer] = useState(null)

  return (
    <GoogleMapsProvider
      googleMapsAPIKey="AIzaSyD499QbrpxctpzIhJlz48TDok-4hXTRTWw"
      mapOptions={mapOptions}
      mapContainer={mapContainer}
    >
      <div ref={(node) => setMapContainer(node)} style={{ height: '100vh' }} />
      <Location />
    </GoogleMapsProvider>
  )
}

function Location() {
  const [lat, setLat] = useState(-41.2924)
  const [lng, setLng] = useState(174.7787)
  const map = useGoogleMap()
  const markerRef = useRef()

  useEffect(() => {
    if (!map) {
      return
    }

    const tilesLoadedListener = map.addListener('tilesloaded', () => {
      // Tiles are loaded, now we can safely interact with the map
      console.log('Map: ', map)

      if (markerRef.current) {
        markerRef.current.setMap(map)
      } else {
        markerRef.current = new window.google.maps.Marker({ map })
      }

      // Clean up the listener after it's been called
      tilesLoadedListener.remove()
    })

    return () => {
      // Remove the listener when the component unmounts
      tilesLoadedListener.remove()
    }
  }, [map])

  useEffect(() => {
    if (!markerRef.current) return
    if (isNaN(lat) || isNaN(lng)) return
    markerRef.current.setPosition({ lat, lng })
    map.panTo({ lat, lng })
  }, [lat, lng, map])

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
