import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';
import * as THREE from 'three';

const Hero = () => {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();

  // Parallax transform for the 3D blob (moves slower than content on scroll)
  const blobParallaxY = useTransform(scrollY, [0, 1000], [0, 150]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6.0;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: "high-performance",
      precision: window.innerWidth < 768 ? "mediump" : "highp"
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 600 : 2000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 120;
      starPositions[i + 1] = (Math.random() - 0.3) * 120;
      starPositions[i + 2] = (Math.random() - 0.5) * 80;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const starParticles = new THREE.Points(starGeometry, starMaterial);
    scene.add(starParticles);

    // 5. 3D Orbital Rings Globe (The Top Emerging "Blob")
    const globeGroup = new THREE.Group();
    const isMobileDevice = window.innerWidth < 768;

    // Inner Dark Core Sphere
    const coreGeometry = new THREE.SphereGeometry(1.5, isMobileDevice ? 16 : 32, isMobileDevice ? 16 : 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x030712,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);
    const ringCount = isMobileDevice ? 14 : 24;
    const radius = 1.6;
    const curveSegments = isMobileDevice ? 32 : 64;
    const ringColors = [0x3b82f6, 0x2563eb, 0xffffff, 0x38bdf8, 0x60a5fa, 0xffffff];
    const ringLines = [];

    if (isMobileDevice) {
      // 5b. Mobile Optimization: Lightweight Wireframe Net instead of multiple rings
      const netGeometry = new THREE.IcosahedronGeometry(1.65, 2);
      const netMaterial = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const netMesh = new THREE.Mesh(netGeometry, netMaterial);
      globeGroup.add(netMesh);

      // Add points at vertices for a 'plexus' look
      const pointsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.04,
        transparent: true,
        opacity: 0.7,
      });
      const netPoints = new THREE.Points(netGeometry, pointsMaterial);
      globeGroup.add(netPoints);
      
      // Track for animation
      ringLines.push({ mesh: netMesh, isNet: true, baseOpacity: 0.4 });
      ringLines.push({ mesh: netPoints, isNet: true, baseOpacity: 0.7 });
    } else {
      // 5c. Desktop Version: High-quality Orbital Rings
      for (let i = 0; i < ringCount; i++) {
        const curve = new THREE.EllipseCurve(
          0, 0,
          radius, radius,
          0, 2 * Math.PI,
          false,
          0
        );

        const points = curve.getPoints(curveSegments);
        const ringGeometry = new THREE.BufferGeometry().setFromPoints(points);

        const ringMaterial = new THREE.LineBasicMaterial({
          color: ringColors[i % ringColors.length],
          transparent: true,
          opacity: 0.75 + (Math.random() * 0.25),
        });

        const ringLine = new THREE.LineLoop(ringGeometry, ringMaterial);

        ringLine.rotation.y = (i / ringCount) * Math.PI;
        ringLine.rotation.x = Math.sin((i / ringCount) * Math.PI) * 0.6;
        ringLine.rotation.z = Math.cos((i / ringCount) * Math.PI) * 0.2;

        ringLines.push({ mesh: ringLine, baseOpacity: ringMaterial.opacity });
        globeGroup.add(ringLine);
      }
    }

    // Set Initial High Position for Drop-Down Emerging Animation
    let currentGlobeY = 10.0;
    const targetGlobeY = 0.0;
    globeGroup.position.y = currentGlobeY;
    scene.add(globeGroup);

    // 6. Interactive Mouse Mechanics & Animation Loop
    let targetRotationX = 0;
    let targetRotationY = 0;
    let hoveredState = false;

    const handleMouseMove = (e) => {
      if (!currentMount) return;
      const rect = currentMount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotationY = x * 0.5;
      targetRotationX = y * 0.3;
    };

    const handleMouseEnter = () => { hoveredState = true; setIsHovered(true); };
    const handleMouseLeave = () => { hoveredState = false; setIsHovered(false); targetRotationX = 0; targetRotationY = 0; };

    currentMount.addEventListener('mousemove', handleMouseMove);
    currentMount.addEventListener('mouseenter', handleMouseEnter);
    currentMount.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId;
    const clock = new THREE.Clock();
    let currentScale = 1.0;
    let baseTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth Drop-Down Animation on Load / Refresh + Gentle Float
      const floatAmount = Math.sin(Date.now() * 0.001) * 0.05;
      currentGlobeY += (targetGlobeY - currentGlobeY) * 0.05;
      globeGroup.position.y = currentGlobeY + floatAmount;

      const targetScale = hoveredState ? 1.06 : 1.0;
      currentScale += (targetScale - currentScale) * 0.03;
      globeGroup.scale.set(currentScale, currentScale, currentScale);

      const speedMult = hoveredState ? 1.5 : 1.0;
      baseTime += delta * speedMult;

      // Significantly smoother rotation damping (0.02)
      globeGroup.rotation.y += (targetRotationY + baseTime * 0.08 - globeGroup.rotation.y) * 0.02;
      globeGroup.rotation.x += (targetRotationX + Math.cos(baseTime * 0.05) * 0.04 - globeGroup.rotation.x) * 0.02;
      globeGroup.rotation.z = Math.sin(baseTime * 0.06) * 0.03;

      ringLines.forEach(item => {
        const targetOpacity = hoveredState ? 1.0 : item.baseOpacity;
        item.mesh.material.opacity += (targetOpacity - item.mesh.material.opacity) * 0.05;
      });

      starParticles.rotation.y = baseTime * 0.02;
      starParticles.rotation.x = targetRotationX * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Window Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeEventListener('mousemove', handleMouseMove);
        currentMount.removeEventListener('mouseenter', handleMouseEnter);
        currentMount.removeEventListener('mouseleave', handleMouseLeave);
        if (renderer.domElement.parentNode === currentMount) {
          currentMount.removeChild(renderer.domElement);
        }
      }
      cancelAnimationFrame(animationFrameId);
      coreGeometry.dispose();
      coreMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const subtitleWords = "Scale your business with high-performance websites and mobile solutions tailored for the next generation of startups.".split(" ");

  const sentenceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.4,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const textSpanVariants = {
    hidden: { opacity: 0, y: 0, filter: "blur(15px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        type: "spring", 
        stiffness: 50, 
        damping: 15 
      }
    }
  };

  const modernAppsVariants = {
    hidden: { opacity: 0, y: 0, filter: "blur(15px) drop-shadow(0px 0px 0px rgba(139,92,246,0))" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px) drop-shadow(0px 0px 5px rgba(139,92,246,0.1))",
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { 
        opacity: { duration: 1.2, delay: 0.1 },
        y: { type: "spring", stiffness: 50, damping: 15, delay: 0.1 },
        filter: { duration: 1.2, delay: 0.1 },
        backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" }
      }
    }
  };

  const reactiveLetterVariants = {
    hidden: { opacity: 0, y: 0, filter: "blur(8px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        delay: i * 0.05,
      }
    }),
    energyTouch: (i) => ({
      rotateX: [0, 20, -20, 0],
      rotateY: [0, 15, -15, 0],
      scale: [1, 1.08, 0.95, 1],
      z: [0, 15, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatDelay: 0.5,
        delay: i * 0.1, 
        ease: "easeInOut"
      }
    })
  };

  const weBuildLetters = "We Build".split("");
  const modernAppsLetters = "Modern Apps".split("");

  return (
    <section id="home" style={{ willChange: 'transform, opacity' }} className="relative min-h-[60vh] sm:min-h-[85vh] pt-[70px] sm:pt-[100px] pb-[10px] sm:pb-[40px] bg-transparent flex flex-col justify-start sm:justify-center items-center z-10 w-full overflow-visible">

      {/* 3D Glowing Animated Blob Container */}
      <motion.div
        style={{ y: blobParallaxY }}
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
        className="absolute inset-x-0 top-[80px] sm:top-0 w-full max-w-5xl mx-auto h-[350px] sm:h-[600px] md:h-[700px] lg:h-[800px] pointer-events-auto z-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Three.js Canvas Mount */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
      </motion.div>

      {/* Hero Content Wrapper - Layered on top with z-30 */}
      <div className="relative z-30 max-w-5xl mx-auto px-5 sm:px-6 text-center flex flex-col items-center justify-center pointer-events-none w-full my-auto mt-[400px] sm:mt-[10vh]">

        {/* Responsive Heading with clamp() & Clean Wrapping */}
        <h1
          className="text-[clamp(1.8rem,12vw,5.5rem)] font-black text-white leading-[1.1] tracking-tight mb-4 sm:mb-5 max-w-[95%] sm:max-w-[900px] mx-auto pointer-events-auto"
        >
          <motion.span
            variants={textSpanVariants}
            initial="hidden"
            animate="visible"
            className="inline-block smoky-container"
            style={{ perspective: "1000px" }}
          >
            <span className="relative inline-flex items-center" style={{ transformStyle: 'preserve-3d' }}>
              {weBuildLetters.map((char, i) => {
                const center = weBuildLetters.length / 2;
                const rotationY = (center - i) * (window.innerWidth < 640 ? 3 : 5); // Reduced curve for mobile
                return (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={reactiveLetterVariants}
                    animate={["visible", "energyTouch"]}
                    className="inline-block text-white"
                    style={{ 
                      display: 'inline-block', 
                      minWidth: char === " " ? "0.3em" : "auto",
                      textShadow: "0 1px 0 #ccc, 0 2px 0 #b0b0b0, 0 5px 10px rgba(0,0,0,0.3)",
                      willChange: 'transform',
                      transform: `rotateX(15deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - i) * (window.innerWidth < 640 ? -1 : -2)}px)`
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </span>
            {/* White Smoke Layers */}
            <div className="smoke-layer smoke-layer-white smoke-1"></div>
            <div className="smoke-layer smoke-layer-white smoke-2"></div>
            <div className="smoke-layer smoke-layer-white smoke-3"></div>
            <div className="smoke-layer smoke-layer-white smoke-4"></div>
            <div className="smoke-layer smoke-layer-white smoke-5"></div>
          </motion.span> <br className="hidden sm:block" />
          <motion.span
            variants={modernAppsVariants}
            initial="hidden"
            animate="visible"
            className="inline-block smoky-container"
            style={{ perspective: "1200px" }}
          >
            <span className="relative inline-flex items-center" style={{ transformStyle: 'preserve-3d' }}>
              {modernAppsLetters.map((char, i) => {
                const center = modernAppsLetters.length / 2;
                const rotationY = (center - i) * (window.innerWidth < 640 ? 4 : 6); 
                return (
                  <motion.span
                    key={i}
                    custom={i + weBuildLetters.length}
                    variants={reactiveLetterVariants}
                    animate={["visible", "energyTouch"]}
                    className="inline-block bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-800 bg-clip-text text-transparent"
                    style={{ 
                      display: 'inline-block', 
                      minWidth: char === " " ? "0.3em" : "auto",
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: "0 1px 0 #1e3a8a, 0 2px 0 #1d4ed8, 0 4px 10px rgba(0,0,0,0.2)",
                      willChange: 'transform',
                      transform: `rotateX(15deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - i) * (window.innerWidth < 640 ? -1.5 : -3)}px)`
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </span>
            {/* Smoke Layers */}
            <div className="smoke-layer smoke-1"></div>
            <div className="smoke-layer smoke-2"></div>
            <div className="smoke-layer smoke-3"></div>
            <div className="smoke-layer smoke-4"></div>
            <div className="smoke-layer smoke-5"></div>
          </motion.span>
        </h1>

        {/* 3D Formatted Subheading with High-Fidelity Character Animation */}
        <motion.div
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
          className="text-[clamp(0.85rem,4.5vw,1.1rem)] text-gray-400 max-w-[90%] sm:max-w-[600px] mx-auto font-medium leading-[1.6] mb-8 sm:mb-8 pointer-events-auto flex flex-wrap justify-center"
        >
          {subtitleWords.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-flex mx-[0.15em] sm:mx-[0.2em]">
              {word.split("").map((char, charIdx) => {
                const absoluteIdx = subtitleWords.slice(0, wordIdx).join("").length + charIdx;
                const totalChars = subtitleWords.join("").length;
                const center = totalChars / 2;
                const rotationY = (center - absoluteIdx) * (window.innerWidth < 640 ? 0.4 : 0.8); 
                
                return (
                  <motion.span
                    key={charIdx}
                    custom={absoluteIdx}
                    variants={reactiveLetterVariants}
                    animate={["visible", "energyTouch"]}
                    className="inline-block text-gray-300"
                    style={{
                      display: 'inline-block',
                      textShadow: "0 1px 0 #555, 0 2px 0 #333, 0 4px 8px rgba(0,0,0,0.3)",
                      willChange: 'transform',
                      transformStyle: 'preserve-3d',
                      transform: `rotateX(10deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - absoluteIdx) * (window.innerWidth < 640 ? -0.2 : -0.5)}px)`
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 15, 
            delay: 0.4 
          }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pointer-events-auto z-40 relative w-full sm:w-auto px-2 sm:px-0"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full bg-white/[0.05] border border-blue-500/30 text-white font-extrabold text-sm sm:text-base hover:bg-blue-600/10 hover:border-blue-500/50 transition-all duration-300 shadow-lg backdrop-blur-md transform hover:-translate-y-1 active:scale-95 cursor-pointer w-full sm:w-auto"
          >
            <span>Get a Free Quote</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full bg-white/[0.05] border border-white/10 text-white font-extrabold text-sm sm:text-base hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:scale-95 cursor-pointer backdrop-blur-md w-full sm:w-auto"
          >
            <Play size={18} className="fill-white text-white" />
            <span>Our Portfolio</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
