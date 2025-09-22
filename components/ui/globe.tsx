// @/components/ui/globe.tsx

"use client";

import { useEffect, useRef } from "react";
import { Color, Scene, PerspectiveCamera, Vector3, AmbientLight, DirectionalLight } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import countries from "@/data/world-countries.json";
import type { WorldProps, GlobeConfig } from "./globe-types";

extend({ ThreeGlobe });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      threeGlobe: any;
    }
  }
}

function Globe({ data, globeConfig }: WorldProps & { darkMode?: boolean }) {
  const globeRef = useRef<any>(null);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const autoRotateRef = useRef(true);
  const hasDraggedRef = useRef(false);
  const { gl, camera } = useThree();

  // Store the original material settings
  const materialSettingsRef = useRef<{
    color: number;
    emissive: number;
    emissiveIntensity: number;
  } | null>(null);

  // Adjust camera position for mobile to compensate for larger canvas
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Mobile: Move camera closer to make globe appear larger
        camera.position.set(0, 100, 360);
      } else {
        // Desktop: Original camera position (unchanged from initial version)
        camera.position.set(0, 100, 280);
      }
    };

    // Set initial position
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [camera]);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = globeRef.current;

    // Adjust globe material based on theme
    const globeMaterial = globe.globeMaterial();
    
    let materialSettings;
    if (globeConfig.darkMode) {
      // Dark mode: darker grayish globe with #767676 base color
      materialSettings = {
        color: 0x767676, // Base color #767676
        emissive: 0x4A4A4A, // Darker emissive to complement the base
        emissiveIntensity: 0.3 // Lower intensity for darker appearance
      };
    } else {
      // Light mode: pure white globe
      materialSettings = {
        color: 0xFFFFFF,
        emissive: 0xFFFFFF,
        emissiveIntensity: 1.0
      };
    }

    // Store the settings for consistent application
    materialSettingsRef.current = materialSettings;

    // Apply the material settings
    globeMaterial.color.setHex(materialSettings.color);
    globeMaterial.emissive.setHex(materialSettings.emissive);
    globeMaterial.emissiveIntensity = materialSettings.emissiveIntensity;
    
    globeMaterial.shininess = 0;
    globeMaterial.specular.setHex(0x000000);
    globeMaterial.transparent = false;
    globeMaterial.opacity = 1.0;
    globeMaterial.flatShading = true;
    globeMaterial.fog = false;
    globeMaterial.lightMap = null;
    globeMaterial.aoMap = null;
    globeMaterial.normalMap = null;
    globeMaterial.bumpMap = null;
    globeMaterial.lights = false; // Disable lighting completely
    globeMaterial.needsUpdate = true;

    // Enable prominent white atmosphere glow for light mode to mask sharp horizon
    if (!globeConfig.darkMode) {
      globe.showAtmosphere(true);
      globe.atmosphereColor(new Color(0xFFFFFF));
      globe.atmosphereAltitude(0.25);
    } else {
      globe.showAtmosphere(false);
      globe.atmosphereColor(new Color(0x000000));
      globe.atmosphereAltitude(0);
    }

    // Add countries with very light gray circular dots - even smaller size
    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3) // Increased back to 3 for more dots
      .hexPolygonMargin(0.4) // Reduced margin for closer spacing between dots
      .hexPolygonUseDots(true)
      .hexPolygonColor(() => "#e0e0e0")
      .hexPolygonAltitude(0.001)
      .hexPolygonDotResolution(12); // Even smaller dots

    // Add Kolkata marker laying flat on surface
    const kolkataMarker = [{
      lat: 22.5726,
      lng: 88.3639,
      size: 0.8,
      color: '#90EE90', // Light green
      name: 'Kolkata, India'
    }];

    // Add location markers
    globe
      .pointsData([...(data || []), ...kolkataMarker])
      .pointColor('color')
      .pointAltitude((d: any) => d.name === 'Kolkata, India' ? 0.003 : 0.015) // Lower altitude for flat appearance
      .pointRadius((d: any) => d.name === 'Kolkata, India' ? 1.2 : d.size);

    // Set initial rotation - tilted downward for higher view
    globe.rotation.y = Math.PI * 1.2;
    globe.rotation.x = -Math.PI * 0.25; // Increased tilt downward from -0.15 to -0.25
    globe.rotation.z = Math.PI * 0.02;

    // Ensure material is applied immediately after setup
    ensureMaterialConsistency();

  }, [data, globeConfig]);

  // Function to ensure material consistency
  const ensureMaterialConsistency = () => {
    if (!globeRef.current || !materialSettingsRef.current) return;
    
    const globe = globeRef.current;
    const globeMaterial = globe.globeMaterial();
    const settings = materialSettingsRef.current;
    
    globeMaterial.color.setHex(settings.color);
    globeMaterial.emissive.setHex(settings.emissive);
    globeMaterial.emissiveIntensity = settings.emissiveIntensity;
    globeMaterial.needsUpdate = true;
  };

  // Interactive mouse controls
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // Skip interactivity on mobile devices
    if (window.innerWidth < 768) return;

    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      isDraggingRef.current = true;
      hasDraggedRef.current = false; // Reset drag flag
      lastMouseXRef.current = event.clientX;
      autoRotateRef.current = false;
      if (gl.domElement) {
        gl.domElement.style.cursor = 'grabbing';
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      event.preventDefault();
      const deltaX = event.clientX - lastMouseXRef.current;

      // If moved more than 5 pixels, consider it a drag
      if (Math.abs(deltaX) > 5) {
        hasDraggedRef.current = true;
      }

      const rotationSpeed = deltaX * 0.005; // Reduced sensitivity
      globe.rotation.y += rotationSpeed;
      lastMouseXRef.current = event.clientX;

      // Ensure material stays consistent during drag
      ensureMaterialConsistency();
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        if (gl.domElement) {
          gl.domElement.style.cursor = 'grab';
        }
        // Resume auto-rotation immediately
        autoRotateRef.current = true;
      }
    };

    const handleClick = (event: MouseEvent) => {
      // Prevent navigation if user was dragging
      if (hasDraggedRef.current) {
        event.preventDefault();
        event.stopPropagation();
        hasDraggedRef.current = false; // Reset for next interaction
      }
    };

    const handleMouseEnter = () => {
      if (gl.domElement && !isDraggingRef.current) {
        gl.domElement.style.cursor = 'grab';
      }
      // DO NOT change material properties on hover - this was causing the color change
      // Just ensure consistency without forcing changes
      ensureMaterialConsistency();
    };

    const handleMouseLeave = () => {
      if (isDraggingRef.current) {
        handleMouseUp();
      } else if (gl.domElement) {
        gl.domElement.style.cursor = 'default';
      }
    };

    // Touch event handlers for mobile
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        isDraggingRef.current = true;
        hasDraggedRef.current = false; // Reset drag flag
        lastMouseXRef.current = event.touches[0].clientX;
        autoRotateRef.current = false;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDraggingRef.current || event.touches.length !== 1) return;
      event.preventDefault(); // Prevent scrolling

      const deltaX = event.touches[0].clientX - lastMouseXRef.current;

      // If moved more than 5 pixels, consider it a drag
      if (Math.abs(deltaX) > 5) {
        hasDraggedRef.current = true;
      }

      const rotationSpeed = deltaX * 0.005; // Reduced sensitivity
      globe.rotation.y += rotationSpeed;
      lastMouseXRef.current = event.touches[0].clientX;

      // Ensure material stays consistent during touch drag
      ensureMaterialConsistency();
    };

    const handleTouchEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        // Resume auto-rotation immediately
        autoRotateRef.current = true;
      }
    };

    // Add event listeners to the canvas
    const canvas = gl.domElement;
    if (canvas) {
      // Mouse events
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('click', handleClick);
      canvas.addEventListener('mouseleave', handleMouseLeave);

      // Touch events
      canvas.addEventListener('touchstart', handleTouchStart);
      canvas.addEventListener('touchmove', handleTouchMove);
      canvas.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (canvas) {
        // Mouse events
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('mouseleave', handleMouseLeave);

        // Touch events
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [gl]);

  // Pulsing effect for Kolkata marker
  useEffect(() => {
    if (!globeRef.current) return;

    let pulseAnimationId: number;
    const pulseAnimate = () => {
      if (globeRef.current) {
        const time = Date.now() * 0.005; // Control pulse speed
        const pulseFactor = 1 + Math.sin(time) * 0.2; // Subtle pulsing between 0.8 and 1.2

        // Update Kolkata marker size for pulsing effect
        const pointsObj = globeRef.current.pointsData();
        if (pointsObj && pointsObj.children) {
          const totalDataLength = (data || []).length;
          const kolkataPoint = pointsObj.children[totalDataLength];
          if (kolkataPoint && kolkataPoint.scale) {
            kolkataPoint.scale.setScalar(pulseFactor);
          }
        }
      }
      pulseAnimationId = requestAnimationFrame(pulseAnimate);
    };
    pulseAnimate();

    return () => {
      if (pulseAnimationId) {
        cancelAnimationFrame(pulseAnimationId);
      }
    };
  }, [data]);

  // Auto rotation with material consistency
  useEffect(() => {
    if (!globeRef.current) return;

    const rotationSpeed = globeConfig?.autoRotateSpeed || 0.0015;
    const shouldAutoRotate = globeConfig?.autoRotate !== false;

    if (!shouldAutoRotate) return;

    let animationId: number;
    const animate = () => {
      if (globeRef.current && autoRotateRef.current) {
        globeRef.current.rotation.y += rotationSpeed;
        // Continuously ensure material consistency during auto-rotation
        ensureMaterialConsistency();
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [globeConfig]);

  return <threeGlobe ref={globeRef} style={{ cursor: window.innerWidth < 768 ? 'default' : 'grab' }} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();
  
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 0);
    gl.toneMapping = 0;
    gl.toneMappingExposure = 1.0;
  }, [gl, size]);
  
  return null;
}

export function World(props: WorldProps & { 
  shadowPosition?: { x?: string; y?: string; scale?: number };
  darkMode?: boolean;
}) {
  const { shadowPosition = {}, darkMode = false } = props;
  const { x = '0%', y = '0%', scale = 1 } = shadowPosition;

  // Separate shadow styles for light and dark modes
  const lightModeShadow = `
    inset 0px 0px 0px 1px transparent,
    inset 0px 0px 20px 8px rgba(0, 0, 0, 0.05),
    inset 0px 0px 35px 12px rgba(0, 0, 0, 0.04),
    inset 0px 0px 50px 18px rgba(0, 0, 0, 0.03),
    inset 0px 0px 70px 24px rgba(0, 0, 0, 0.02),
    0px 0px 5px 1px rgba(255, 255, 255, 0.25),
    0px 0px 3px 1px rgba(255, 255, 255, 0.35),
    0px 0px 2px 1px rgba(255, 255, 255, 0.45)
  `;

  const darkModeShadow = `
    inset 0px 0px 0px 1px transparent,
    inset 0px 0px 40px 20px rgba(0, 0, 0, 0.88),
    inset 0px 0px 60px 28px rgba(0, 0, 0, 0.83),
    inset 0px 0px 80px 35px rgba(0, 0, 0, 0.78),
    inset 0px 0px 100px 42px rgba(0, 0, 0, 0.73),
    inset 0px 0px 120px 48px rgba(0, 0, 0, 0.68),
    inset 0px 0px 140px 55px rgba(0, 0, 0, 0.63),
    inset 0px 0px 160px 60px rgba(255, 255, 255, 0.58),
    inset 0px 0px 180px 68px rgba(0, 0, 0, 0.48),
    inset 0px 0px 200px 75px rgba(0, 0, 0, 0.38),
    0px 0px 20px 4px rgba(255, 255, 255, 0.30),
    0px 0px 12px 2px rgba(255, 255, 255, 0.40),
    0px 0px 6px 1px rgba(255, 255, 255, 0.50)
  `;

  return (
    <div className="relative w-full h-full">
      {/* Responsive Globe Container */}
      <div 
        className="absolute inset-0 globe-container"
        style={{
          // Desktop styles (default)
          width: '150%',
          height: '150%',
          left: '-25%',
          top: '-25%'
        }}
      >
        <Canvas
          camera={{
            fov: 45,
            near: 1,
            far: 1000,
            position: [0, 100, 280]
          }}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            touchAction: "pan-y"
          }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
          }}
        >
          <WebGLRendererConfig />
          <ambientLight intensity={1.0} color={0xffffff} />
          <Globe data={props.data} globeConfig={{...props.globeConfig, darkMode}} />
        </Canvas>
      </div>
      
      {/* Responsive Shadow Overlay */}
      <div 
        className="absolute pointer-events-none globe-shadow"
        style={{
          // Desktop styles (default)
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${x}), calc(-50% + ${y}))`,
          width: `${488 * scale}px`,
          height: `${488 * scale}px`,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            borderRadius: '50%',
            boxShadow: darkMode ? darkModeShadow : lightModeShadow,
            mixBlendMode: 'multiply'
          }}
        />
      </div>

      {/* CSS for responsive positioning */}
      <style jsx>{`
        @media (max-width: 767px) {
          .globe-container {
            width: 200% !important;
            height: 200% !important;
            left: -25% !important;
            top: -25% !important;
          }
          
          .globe-shadow {
            left: 70% !important;
            top: 54% !important;
            transform: translate(-50%, -50%) !important;
            width: ${587 * 0.8}px !important;
            height: ${589 * 0.8}px !important;
          }
        }
        
        /* Desktop styles - reverting to original */
        @media (min-width: 768px) {
          .globe-container {
            width: 150% !important;
            height: 150% !important;
            left: -25% !important;
            top: -25% !important;
          }
          
          .globe-shadow {
            left: 50% !important;
            top: 50% !important;
            transform: translate(calc(-50% + ${x}), calc(-50% + ${y})) !important;
            width: ${488 * scale}px !important;
            height: ${488 * scale}px !important;
          }
        }
      `}</style>
    </div>
  );
}