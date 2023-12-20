//Map.tsx
import { useState, useEffect, useRef } from 'react'
import {
  useGoogleMap,
  GoogleMapsProvider,
} from '@ubilabs/google-maps-react-hooks'

import { fetchGoogleMapsAPIKey } from '../apis/api-map'

const mapOptions = {
  zoom: 15,
  center: {
    lat: -41.2924,
    lng: 174.7787,
  },
}

export default function Map({ catSightings }) {
  const [mapContainer, setMapContainer] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [googleMapsAPIKey, setGoogleMapsAPIKey] = useState('')

  useEffect(() => {
    const getGoogleMapsKey = async () => {
      try {
        const apiKey = await fetchGoogleMapsAPIKey()
        setGoogleMapsAPIKey(apiKey)
      } catch (error) {
        console.error('Error setting Google Maps API key:', error)
      }
    }

    getGoogleMapsKey()
  }, [])

  const handleLoad = (map) => {
    setMapLoaded(true)
  }

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={googleMapsAPIKey}
      mapOptions={mapOptions}
      mapContainer={mapContainer}
      onLoad={handleLoad}
    >
      <div
        ref={(node) => setMapContainer(node)}
        style={{ height: '100%', borderRadius: '15px' }}
      />
      {catSightings.map((sighting) => (
        <Location key={sighting.id} sighting={sighting} />
      ))}

      {/* {mapLoaded && <Location catSightings={catSightings} />} */}
    </GoogleMapsProvider>
  )
}

function Location({ sighting }) {
  const map = useGoogleMap()
  const markerRef = useRef()

  useEffect(() => {
    if (!map || !sighting) {
      return
    }

    // Clear existing markers
    if (markerRef.current) {
      markerRef.current.setMap(null)
    }

    // Create markers for each sighting
    const [latString, lngString] = sighting.location.split(', ')
    const lat = parseFloat(latString.trim())
    const lng = parseFloat(lngString.trim())

    if (window.google && window.google.maps) {
      console.log('running')
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
      })
      markerRef.current = marker
    }

    // Pan to the first sighting's location
    const [firstLatString, firstLngString] = sighting.location.split(', ')
    const firstLat = parseFloat(firstLatString.trim())
    const firstLng = parseFloat(firstLngString.trim())

    map.panTo({ lat: firstLat, lng: firstLng })
  }, [map, sighting])

  return <></>
}
