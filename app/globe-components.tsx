"use client";

import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";
import countries from "@/data/world-countries.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const aspect = 1.2;
const cameraZ = 250;

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: any[];
}

function Globe({ globeConfig }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: false,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(0,0,0,0.8)",
    globeColor: "#1a1a1a",
    emissive: "#000000",
    emissiveIntensity: 0.02,
    shininess: 0.1,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 0,
    maxRings: 0,
    ...globeConfig,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame(() => {
    if (globeRef.current && isInitialized) {
      const material = globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
      if (material.opacity < 1) {
        material.opacity = Math.min(1, material.opacity + 0.001);
      }
    }
  });

  // Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current && mounted) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      setIsInitialized(true);
    }
  }, [mounted]);

  // Build material when globe is initialized or when theme changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !mounted) return;

    const effectiveTheme = theme === 'system'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;

    const isDark = effectiveTheme === 'dark';

    // Set up the globe material properly
    const globeMaterial = globeRef.current.globeMaterial() as unknown as THREE.MeshPhongMaterial;
    
    if (isDark) {
      globeMaterial.color = new Color("#2a2a2a");
      globeMaterial.emissive = new Color("#000000");
      globeMaterial.emissiveIntensity = 0.02;
      globeMaterial.shininess = 30;
      globeMaterial.transparent = true;
      globeMaterial.opacity = 0;
    } else {
      globeMaterial.color = new Color("#e8e8e8");
      globeMaterial.emissive = new Color("#f0f0f0");
      globeMaterial.emissiveIntensity = 0.05;
      globeMaterial.shininess = 30;
      globeMaterial.transparent = true;
      globeMaterial.opacity = 0;
    }
    
    globeMaterial.needsUpdate = true;
  }, [isInitialized, theme, mounted]);

  // Build data when globe is initialized
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !mounted) return;

    const effectiveTheme = theme === 'system'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;

    const isDark = effectiveTheme === 'dark';

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.4)
      .showAtmosphere(false)
      .hexPolygonColor(() => isDark ? "#555555" : "#888888")
      .hexPolygonAltitude(0.008)
      .hexPolygonUseDots(false);

    globeRef.current
      .arcsData([])
      .pointsData([])
      .ringsData([]);

    // Set initial rotation
    if (globeRef.current) {
      globeRef.current.rotation.y = 0;
    }
  }, [isInitialized, theme, mounted]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 0);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl, size]);

  return null;
}

export function World(props: WorldProps) {
  const scene = new Scene();
  scene.fog = new Fog(0x000000, 400, 2000);
  
  return (
    <Canvas 
      scene={scene} 
      camera={new PerspectiveCamera(45, aspect, 180, 1800)}
      style={{ background: 'transparent' }}
      gl={{ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      }}
    >
      <WebGLRendererConfig />
      
      {/* Improved lighting setup */}
      <ambientLight color="#ffffff" intensity={0.4} />
      <directionalLight 
        color="#ffffff" 
        position={new Vector3(100, 100, 50)} 
        intensity={0.8}
        castShadow
      />
      <directionalLight 
        color="#ffffff" 
        position={new Vector3(-100, -100, 50)} 
        intensity={0.3} 
      />
      <pointLight 
        color="#ffffff" 
        position={new Vector3(0, 0, 100)} 
        intensity={0.2}
      />
      
      <Globe {...props} />
      
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.03}
        rotateSpeed={0.8}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotate={true}
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI - Math.PI / 4}
        target={new Vector3(0, 0, 0)}
      />
    </Canvas>
  );
}