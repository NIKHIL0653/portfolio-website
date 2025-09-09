"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    google: any
  }
}

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3H_IUAadsY3-w7u9RqMzZyKJCBIacw0o&v=weekly`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      // Kolkata coordinates
      const kolkata = { lat: 22.5726, lng: 88.3639 }

      // Create map with zoom restrictions
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: kolkata,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        gestureHandling: 'cooperative',
        minZoom: 10, // Prevent zooming out too much
        maxZoom: 12, // Prevent zooming in too much
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      // Restrict map bounds to Kolkata region
      const kolkataBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(22.4, 88.2), // Southwest corner
        new window.google.maps.LatLng(22.7, 88.5)  // Northeast corner
      )

      // Listen for bounds changes and restrict them
      window.google.maps.event.addListener(map, 'bounds_changed', () => {
        if (!kolkataBounds.contains(map.getCenter()!)) {
          map.panTo(kolkata)
        }
      })

      mapInstanceRef.current = map

      // Create pulsating marker
      const marker = new window.google.maps.Marker({
        position: kolkata,
        map: map,
        title: 'Kolkata, West Bengal',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 0,
          fillColor: '#10b981',
          fillOpacity: 0.8,
          strokeColor: '#059669',
          strokeWeight: 2,
        }
      })

      // Add pulsating animation
      let pulseCount = 0
      const animatePulse = () => {
        pulseCount += 0.05
        const scale = 1 + Math.sin(pulseCount) * 0.3
        const opacity = 0.6 + Math.sin(pulseCount) * 0.2

        marker.setIcon({
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: scale * 8,
          fillColor: '#10b981',
          fillOpacity: opacity,
          strokeColor: '#059669',
          strokeWeight: 1,
        })

        requestAnimationFrame(animatePulse)
      }

      animatePulse()

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family: system-ui, sans-serif; padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">Kolkata, West Bengal</h3>
            <p style="margin: 0; font-size: 14px; color: #666;">India</p>
          </div>
        `
      })

      marker.addListener('click', () => {
        infoWindow.open(map, marker)
      })
    }

    loadGoogleMaps()

    return () => {
      if (mapInstanceRef.current) {
        // Clean up map instance if needed
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}