import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import * as THREE from 'three';

const Scroll3DIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mountRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show indicator after scrolling down 100px
    const handleScrollVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.5;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: true,
      powerPreference: "low-power"
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x3b82f6, 4.0);
    dirLight1.position.set(2, 2, 2);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 3.0);
    dirLight2.position.set(-2, -2, -2);
    scene.add(dirLight2);

    // 5. 3D Scroll Geometry (Futuristic wireframe Icosahedron orb)
    const geometry = new THREE.IcosahedronGeometry(1.4, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1e1b4b,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Inner solid core
    const coreGeometry = new THREE.OctahedronGeometry(0.8, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.3,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // 6. Animation Loop linked to Scroll
    let animationFrameId;
    let baseRotation = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Scroll speed contribution
      const scrollDepth = window.scrollY * 0.003;
      baseRotation += 0.01;

      mesh.rotation.y = baseRotation + scrollDepth;
      mesh.rotation.x = baseRotation * 0.5 + scrollDepth * 0.5;
      
      coreMesh.rotation.y = -baseRotation * 1.5;
      coreMesh.rotation.z = baseRotation * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Floating 3D Interactive Scroll Orb at Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-32 right-4 sm:bottom-32 sm:right-8 z-50 pointer-events-auto"
      >
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#090e17]/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] hover:border-blue-500/40 transition-all duration-500 flex items-center justify-center overflow-hidden active:scale-95 cursor-pointer"
        >
          {/* 3D Canvas Mount */}
          <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* SVG Circular Scroll Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              className="text-white/5 stroke-current"
              strokeWidth="2"
              fill="transparent"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="46%"
              className="stroke-[url(#blueGradient)]"
              strokeWidth="2.5"
              strokeDasharray="290"
              strokeDashoffset="290"
              style={{
                strokeDashoffset: useSpring(
                  useScroll().scrollYProgress,
                  { stiffness: 100, damping: 30 }
                )
              }}
              fill="transparent"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hover Arrow Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center bg-blue-600/80 backdrop-blur-sm rounded-full text-white transition-all duration-300 transform ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
            <ArrowUp size={24} className="animate-bounce" />
          </div>
        </button>
      </motion.div>
    </>
  );
};

export default Scroll3DIndicator;
