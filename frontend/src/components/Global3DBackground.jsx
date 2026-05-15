import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const Global3DBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: "high-performance",
      precision: "highp"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 4. Multi-Directional Ambient & Accent Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 5. Massive Dense Starfield System
    const isMobile = window.innerWidth < 768;
    const starGeometry = new THREE.BufferGeometry();
    const starCount = isMobile ? 1000 : 3000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x818cf8),
      new THREE.Color(0xc084fc),
      new THREE.Color(0x22d3ee)
    ];

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 160;
      starPositions[i + 1] = (Math.random() - 0.5) * 450;
      starPositions[i + 2] = (Math.random() - 0.5) * 100;

      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i] = randomColor.r;
      starColors[i + 1] = randomColor.g;
      starColors[i + 2] = randomColor.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const starParticles = new THREE.Points(starGeometry, starMaterial);
    scene.add(starParticles);

    // 6. Dynamic Interconnected Plexus Network System
    const plexusGroup = new THREE.Group();
    const nodeCount = isMobile ? 40 : 120;
    const maxDistance = isMobile ? 15.0 : 25.0;

    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities = [];

    for (let i = 0; i < nodeCount * 3; i += 3) {
      nodePositions[i] = (Math.random() - 0.5) * 80;
      nodePositions[i + 1] = (Math.random() - 0.5) * 400; // Even taller corridor
      nodePositions[i + 2] = (Math.random() - 0.5) * 40;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03
      });
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.4,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const plexusNodes = new THREE.Points(nodeGeometry, nodeMaterial);
    plexusGroup.add(plexusNodes);

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodeCount * nodeCount * 3);
    const lineColors = new Float32Array(nodeCount * nodeCount * 3);
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const plexusLines = new THREE.LineSegments(linesGeometry, linesMaterial);
    plexusGroup.add(plexusLines);
    scene.add(plexusGroup);

    let animationFrameId;
    let targetCameraY = 0;
    let currentCameraY = 0;

    const handleScroll = () => {
      targetCameraY = -window.scrollY * 0.015;
    };

    window.addEventListener('scroll', handleScroll);
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentCameraY += (targetCameraY - currentCameraY) * 0.08;
      camera.position.y = currentCameraY;

      starParticles.rotation.y = elapsedTime * 0.01;

      const positions = nodeGeometry.attributes.position.array;
      let vertexpos = 0;
      let colorpos = 0;

      for (let i = 0; i < nodeCount; i++) {
        positions[i * 3] += nodeVelocities[i].x;
        positions[i * 3 + 1] += nodeVelocities[i].y;
        positions[i * 3 + 2] += nodeVelocities[i].z;

        if (Math.abs(positions[i * 3]) > 40) nodeVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 200) nodeVelocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 20) nodeVelocities[i].z *= -1;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      const p1 = new THREE.Vector3();
      const p2 = new THREE.Vector3();

      for (let i = 0; i < nodeCount; i++) {
        p1.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        for (let j = i + 1; j < nodeCount; j++) {
          p2.set(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
          const dist = p1.distanceTo(p2);
          if (dist < maxDistance) {
            linePositions[vertexpos++] = p1.x;
            linePositions[vertexpos++] = p1.y;
            linePositions[vertexpos++] = p1.z;
            lineColors[colorpos++] = 0.22;
            lineColors[colorpos++] = 0.74;
            lineColors[colorpos++] = 0.98;

            linePositions[vertexpos++] = p2.x;
            linePositions[vertexpos++] = p2.y;
            linePositions[vertexpos++] = p2.z;
            lineColors[colorpos++] = 0.55;
            lineColors[colorpos++] = 0.36;
            lineColors[colorpos++] = 0.96;
          }
        }
      }

      linesGeometry.setDrawRange(0, vertexpos / 3);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      starGeometry.dispose();
      starMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const [showFireflies, setShowFireflies] = React.useState(false);

  useEffect(() => {
    // Delay heavy Framer Motion rendering to prevent initial mount freeze
    const timer = setTimeout(() => {
      setShowFireflies(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Hero-style Ambient Glows (Global) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[5%] w-[80%] h-[70%] bg-blue-600/10 rounded-full blur-[150px] sm:blur-[200px] animate-pulse pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[70%] h-[60%] bg-blue-500/5 rounded-full blur-[150px] sm:blur-[200px] animate-pulse delay-1000 pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[60%] h-[50%] bg-white/2 rounded-full blur-[120px] sm:blur-[180px] animate-pulse delay-500 pointer-events-none" />
      </div>

      {/* Global Twinkling & Floating 'Jonaki' (Firefly) Stars */}
      {showFireflies && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(150)].map((_, i) => {
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = Math.random() * 1.8 + 0.4;
            const duration = Math.random() * 5 + 3;
            const delay = Math.random() * 10;
            const driftX = (Math.random() - 0.5) * 40;
            const driftY = (Math.random() - 0.5) * 40;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-100 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                style={{ top, left, width: size, height: size }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0.6, 1.2, 0.6],
                  x: [0, driftX, 0],
                  y: [0, driftY, 0]
                }}
                transition={{ 
                  duration, 
                  repeat: Infinity, 
                  delay, 
                  ease: "easeInOut",
                  repeatDelay: Math.random() * 2
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Global3DBackground;
