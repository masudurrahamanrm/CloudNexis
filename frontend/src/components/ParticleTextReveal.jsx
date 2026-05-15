import React, { useEffect, useRef, useState } from 'react';

const ParticleTextReveal = ({ onComplete, text1 = "We Build", text2 = "Modern Apps" }) => {
  const canvasRef = useRef(null);
  const [isFormed, setIsFormed] = useState(false);

  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    let particlesArray = [];
    let animationFrameId;
    let timeoutId;
    let textCoordinates;
    
    let w = canvas.width = window.innerWidth;
    // Limit height to typical hero section bounds
    let h = canvas.height = Math.min(window.innerHeight, 900); 

    const mouse = { x: null, y: null, radius: 120 };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    window.addEventListener('mousemove', handleMouseMove);

    // --- Initialization & Animation Delayed to Prevent Blocking Render ---
    timeoutId = setTimeout(() => {
      // --- Render Hidden Text to Sample Pixels ---
      ctx.fillStyle = 'white';
      
      // Calculate responsive font sizes
      let fontSize = Math.min(w * 0.08, 90); 
      if (w < 640) fontSize = w * 0.12;
      
      ctx.font = `900 ${fontSize}px "Inter", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const yOffset = w < 640 ? fontSize * 0.7 : fontSize * 0.6;
      const mobileExtraY = w < 640 ? 220 : 0;
      
      ctx.fillText(text1, w/2, h/2 - yOffset + mobileExtraY);
      ctx.fillText(text2, w/2, h/2 + yOffset + mobileExtraY);
      
      textCoordinates = ctx.getImageData(0, 0, w, h);
      ctx.clearRect(0, 0, w, h);

      // --- Particle Class ---
      class Particle {
        constructor(x, y) {
          this.targetX = x;
          this.targetY = y;
          // Start randomly anywhere on screen
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.baseX = this.x;
          this.baseY = this.y;
          
          this.size = Math.random() * 2 + 0.5;
          this.density = (Math.random() * 40) + 5;
          
          // Random drift velocities for initial state
          this.vx = (Math.random() - 0.5) * 2;
          this.vy = (Math.random() - 0.5) * 2;
          
          // Color: Soft blue / purple mix
          const isPurple = Math.random() > 0.5;
          this.color = isPurple ? `rgba(139, 92, 246, ${Math.random() * 0.6 + 0.4})` : `rgba(59, 130, 246, ${Math.random() * 0.6 + 0.4})`;
        }
        
        update(progress) {
          // --- Magnetic Mouse Repulsion ---
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (progress < 0.05) {
            // Pure drifting phase
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off walls
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
            
            // Update base to current so transition is smooth
            this.baseX = this.x;
            this.baseY = this.y;
          } else {
            // Formation phase: cubic bezier style easing
            const easeProgress = (progress - 0.05) / 0.95;
            // Cubic ease in-out
            const ease = easeProgress < 0.5 
              ? 4 * easeProgress * easeProgress * easeProgress 
              : 1 - Math.pow(-2 * easeProgress + 2, 3) / 2;
            
            const currentTargetX = this.baseX + (this.targetX - this.baseX) * ease;
            const currentTargetY = this.baseY + (this.targetY - this.baseY) * ease;
            
            // Spring toward the moving target
            this.x += (currentTargetX - this.x) * 0.15;
            this.y += (currentTargetY - this.y) * 0.15;
          }

          // Apply mouse force if hovering
          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          }
        }

        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
      }

      // --- Initialization ---
      function init() {
        particlesArray = [];
        let step = w > 768 ? 9 : 7; 
        
        for (let y = 0; y < textCoordinates.height; y += step) {
          for (let x = 0; x < textCoordinates.width; x += step) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
              particlesArray.push(new Particle(x, y));
            }
          }
        }
        
        if (particlesArray.length > 400) {
          const ratio = particlesArray.length / 400;
          particlesArray = particlesArray.filter((_, i) => i % Math.ceil(ratio) === 0);
        }
      }
      
      init();

      // --- Animation Loop ---
      let startTime = Date.now();
      const duration = 1800;
      
      function animate() {
        ctx.clearRect(0, 0, w, h);
        
        let elapsed = Date.now() - startTime;
        let rawProgress = Math.min(elapsed / duration, 1);
        
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update(rawProgress);
          particlesArray[i].draw();
        }
        
        connect();
        
        if (rawProgress >= 1 && !isFormed) {
          setIsFormed(true);
          if (onCompleteRef.current) onCompleteRef.current();
        }

        animationFrameId = requestAnimationFrame(animate);
      }

      // --- Connect nearby nodes ---
      function connect() {
        let opacityValue = 1;
        const connectionDistance = 35;
        const connDistSq = connectionDistance * connectionDistance;
        
        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a + 1; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distSq = dx * dx + dy * dy;
            
            if (distSq < connDistSq) {
              let distance = Math.sqrt(distSq);
              opacityValue = 1 - (distance / connectionDistance);
              ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue * 0.4})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
              ctx.stroke();
            }
          }
        }
      }
      
      animate();
    }, 50); // Small delay to let React render and mount DOM first

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }
  }, [text1, text2]);

  return (
    <div className={`absolute inset-0 z-20 transition-all duration-1000 flex items-center justify-center pointer-events-none ${isFormed ? 'opacity-20 blur-[2px]' : 'opacity-100 blur-none'}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default ParticleTextReveal;
