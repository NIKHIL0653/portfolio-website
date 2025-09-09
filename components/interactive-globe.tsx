"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "./theme-provider"
import * as THREE from "three"

export function InteractiveGlobe() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const globeRef = useRef<THREE.Group>()
  const animationIdRef = useRef<number>()
  const { theme } = useTheme()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 2.5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Globe group
    const globeGroup = new THREE.Group()
    globeRef.current = globeGroup
    scene.add(globeGroup)

    // Create the globe sphere
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64)
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: theme === 'dark' ? 0x1f2937 : 0xf3f4f6,
      transparent: true,
      opacity: 0.7,
      shininess: 30
    })
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial)
    globeGroup.add(globeMesh)

    // Add wireframe for better visibility
    const wireframeGeometry = new THREE.SphereGeometry(1.001, 32, 16)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x374151 : 0xd1d5db,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    })
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    globeGroup.add(wireframeMesh)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create continents as dots
    const continentsData = [
      // Simplified continent coordinates (lat, lng, density)
      { name: 'Asia', points: generateContinentPoints('asia') },
      { name: 'Europe', points: generateContinentPoints('europe') },
      { name: 'Africa', points: generateContinentPoints('africa') },
      { name: 'North America', points: generateContinentPoints('north-america') },
      { name: 'South America', points: generateContinentPoints('south-america') },
      { name: 'Australia', points: generateContinentPoints('australia') },
    ]

    continentsData.forEach(continent => {
      const pointsGeometry = new THREE.BufferGeometry()
      const positions: number[] = []

      continent.points.forEach(point => {
        const phi = (90 - point.lat) * (Math.PI / 180)
        const theta = (point.lng + 180) * (Math.PI / 180)

        const x = -(Math.sin(phi) * Math.cos(theta))
        const z = Math.sin(phi) * Math.sin(theta)
        const y = Math.cos(phi)

        positions.push(x * 1.01, y * 1.01, z * 1.01)
      })

      pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

      const pointsMaterial = new THREE.PointsMaterial({
        color: theme === 'dark' ? 0x6b7280 : 0x9ca3af,
        size: 0.012,
        transparent: true,
        opacity: 0.9
      })

      const points = new THREE.Points(pointsGeometry, pointsMaterial)
      globeGroup.add(points)
    })

    // Kolkata marker (green pulsing dot)
    const kolkataGeometry = new THREE.SphereGeometry(0.02, 8, 8)
    const kolkataMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true
    })
    const kolkataMarker = new THREE.Mesh(kolkataGeometry, kolkataMaterial)

    // Kolkata coordinates: 22.5726°N, 88.3639°E
    const kolkataPhi = (90 - 22.5726) * (Math.PI / 180)
    const kolkataTheta = (88.3639 + 180) * (Math.PI / 180)

    const kolkataX = -(Math.sin(kolkataPhi) * Math.cos(kolkataTheta)) * 1.02
    const kolkataZ = Math.sin(kolkataPhi) * Math.sin(kolkataTheta) * 1.02
    const kolkataY = Math.cos(kolkataPhi) * 1.02

    kolkataMarker.position.set(kolkataX, kolkataY, kolkataZ)
    globeGroup.add(kolkataMarker)

    // Mouse controls
    let isMouseDown = false
    let previousMousePosition = { x: 0, y: 0 }

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true
      previousMousePosition = { x: event.clientX, y: event.clientY }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return

      const deltaX = event.clientX - previousMousePosition.x
      const deltaY = event.clientY - previousMousePosition.y

      globeGroup.rotation.y += deltaX * 0.005
      globeGroup.rotation.x += deltaY * 0.005

      previousMousePosition = { x: event.clientX, y: event.clientY }
    }

    const handleMouseUp = () => {
      isMouseDown = false
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      camera.position.z += event.deltaY * 0.001
      camera.position.z = Math.max(1.5, Math.min(5, camera.position.z))
    }

    renderer.domElement.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    renderer.domElement.addEventListener('wheel', handleWheel)

    // Animation loop
    let pulsePhase = 0
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // Auto rotation when not interacting
      if (!isMouseDown) {
        globeGroup.rotation.y += 0.005
      }

      // Pulsing Kolkata marker
      pulsePhase += 0.05
      const pulseScale = 1 + Math.sin(pulsePhase) * 0.3
      kolkataMarker.scale.setScalar(pulseScale)
      kolkataMaterial.opacity = 0.6 + Math.sin(pulsePhase) * 0.3

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }

      renderer.domElement.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      renderer.domElement.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
    }
  }, [theme])

  // Helper function to generate continent points
  function generateContinentPoints(continent: string) {
    const points = []
    const densities = {
      'asia': 1200,
      'europe': 600,
      'africa': 700,
      'north-america': 800,
      'south-america': 600,
      'australia': 300
    }

    const density = densities[continent as keyof typeof densities] || 300

    // Generate random points within continent boundaries
    for (let i = 0; i < density; i++) {
      let lat, lng

      switch (continent) {
        case 'asia':
          lat = Math.random() * 70 - 10 // -10° to 60°N (more accurate for Asia)
          lng = Math.random() * 90 + 25 // 25° to 115°E (adjusted for Asia)
          break
        case 'europe':
          lat = Math.random() * 25 + 35 // 35° to 60°N
          lng = Math.random() * 40 - 15 // -15° to 25°E
          break
        case 'africa':
          lat = Math.random() * 55 - 35 // -35° to 20°N
          lng = Math.random() * 60 - 25 // -25° to 35°E
          break
        case 'north-america':
          lat = Math.random() * 55 + 5 // 5° to 60°N
          lng = Math.random() * 100 - 170 // -170° to -70°E
          break
        case 'south-america':
          lat = Math.random() * 60 - 55 // -55° to 5°N
          lng = Math.random() * 50 - 85 // -85° to -35°E
          break
        case 'australia':
          lat = Math.random() * 25 - 45 // -45° to -20°N
          lng = Math.random() * 30 + 110 // 110° to 140°E
          break
        default:
          lat = (Math.random() - 0.5) * 180
          lng = (Math.random() - 0.5) * 360
      }

      points.push({ lat, lng })
    }

    return points
  }

  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border/50">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  )
}