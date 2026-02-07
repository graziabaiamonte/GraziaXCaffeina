
import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import Matter from 'matter-js';
import { AppPhase } from '../types';

const COLORS = ['#BC96FF', '#D7FF81', '#FF4365'];
const SHAPE_TYPES = ['circle', 'heart', 'rect', 'triangle', 'star4', 'pentagon'];
const BORDER_COLOR = '#e6dffcff'; // Viola molto scuro

interface ShapeData {
  id: number;
  x: number;
  y: number;
  angle: number;
  type: string;
  color: string;
  radius: number;
}

interface PhysicsBackgroundProps {
  phase: AppPhase;
}

const PhysicsBackground: React.FC<PhysicsBackgroundProps> = ({ phase }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const bodiesRef = useRef<{ [key: number]: Matter.Body }>({});

  const isLanding = phase === AppPhase.LANDING;

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = Matter.Engine.create();
    engine.gravity.y = 0; // Floating effect
    engineRef.current = engine;

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    

    const wallThickness = 100;
    const wallOptions = { isStatic: true, friction: 0.1, restitution: 0.8 };
    const walls = [
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, wallOptions),
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, wallOptions),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, wallOptions),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, wallOptions),
    ];
    Matter.Composite.add(engine.world, walls);

    const count = 10; 
    
    // Logica per garantire la distribuzione dei colori (4-3-3)
    const colorIndices = [0, 0, 0, 0, 1, 1, 1, 2, 2, 2];
    for (let i = colorIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colorIndices[i], colorIndices[j]] = [colorIndices[j], colorIndices[i]];
    }

    const initialShapes: ShapeData[] = [];
    
    for (let i = 0; i < count; i++) {
      const type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
      const color = COLORS[colorIndices[i]]; 

      

      const width = window.innerWidth;
const height = window.innerHeight;

// Definiamo il raggio come percentuale della larghezza
// Es: su Desktop (1920px), il 4% è circa 76px. Su Tablet (1024px) è circa 40px.
const responsiveRadius = isMobile 
  ? width * 0.1  // 8% della larghezza su mobile
  : width * 0.08; // 4% della larghezza su desktop

const variation = responsiveRadius * 0.2; // 20% di variazione per non farle tutte uguali
const radius = (Math.random() * variation + responsiveRadius);


      const side = Math.floor(Math.random() * 4);
      let x = 0;
      let y = 0;
      const spawnPadding = radius * 1.5;

      switch(side) {
        case 0: // Top
          x = Math.random() * (width - spawnPadding * 2) + spawnPadding;
          y = spawnPadding;
          break;
        case 1: // Right
          x = width - spawnPadding;
          y = Math.random() * (height - spawnPadding * 2) + spawnPadding;
          break;
        case 2: // Bottom
          x = Math.random() * (width - spawnPadding * 2) + spawnPadding;
          y = height - spawnPadding;
          break;
        case 3: // Left
          x = spawnPadding;
          y = Math.random() * (height - spawnPadding * 2) + spawnPadding;
          break;
      }

      let body: Matter.Body;
      const bodyOptions = {
        restitution: 0.6,
        friction: 0.05,
        frictionAir: 0.02, 
        density: 0.002,
      };

      if (type === 'rect') {
        body = Matter.Bodies.rectangle(x, y, radius * 3.5, radius * 0.6, bodyOptions);
      } else if (type === 'triangle') {
        body = Matter.Bodies.polygon(x, y, 3, radius * 1.2, bodyOptions);
      } else if (type === 'pentagon') {
        body = Matter.Bodies.polygon(x, y, 5, radius * 1.1, bodyOptions);
      } else {
        body = Matter.Bodies.circle(x, y, radius, bodyOptions);
      }

      const forceMagnitude = 0.01 * body.mass;
      const targetX = width / 2 + (Math.random() - 0.5) * 200;
      const targetY = height / 2 + (Math.random() - 0.5) * 200;
      const angle = Math.atan2(targetY - y, targetX - x);
      
      Matter.Body.applyForce(body, body.position, {
        x: Math.cos(angle) * forceMagnitude,
        y: Math.sin(angle) * forceMagnitude
      });

      Matter.Body.setAngle(body, Math.random() * Math.PI * 2);

      bodiesRef.current[i] = body;
      Matter.Composite.add(engine.world, body);
      initialShapes.push({ id: i, x, y, angle: body.angle, type, color, radius });
    }

    setShapes(initialShapes);

    const mouse = Matter.Mouse.create(containerRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, damping: 0.1, render: { visible: false } }
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    Matter.Events.on(engine, 'afterUpdate', () => {
      setShapes(prev => prev.map(s => {
        const b = bodiesRef.current[s.id];
        if (!b) return s;
        return { ...s, x: b.position.x, y: b.position.y, angle: b.angle };
      }));
    });

    Matter.Runner.run(runner, engine);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      Matter.Body.setPosition(walls[0], { x: w / 2, y: -wallThickness / 2 });
      Matter.Body.setPosition(walls[1], { x: w / 2, y: h + wallThickness / 2 });
      Matter.Body.setPosition(walls[2], { x: -wallThickness / 2, y: h / 2 });
      Matter.Body.setPosition(walls[3], { x: w + wallThickness / 2, y: h / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 overflow-hidden z-0 bg-[var(--bg-base)] transition-all duration-500 ${isLanding ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {shapes.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: s.radius * 3,
            height: s.radius * 3,
            zIndex: 1,
            transform: `translate(${s.x - s.radius * 1.5}px, ${s.y - s.radius * 1.5}px) rotate(${s.angle}rad)`,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform'
          }}
        >
          <div 
            className="w-full h-full flex items-center justify-center transition-opacity duration-700"
            style={{ 
              backgroundColor: (s.type === 'circle' || s.type === 'rect') ? s.color : 'transparent',
              borderRadius: s.type === 'circle' ? '9999px' : s.type === 'rect' ? '24px' : '0',
              width: s.type === 'rect' ? '60%' : '80%',
              height: s.type === 'rect' ? '40%' : '80%',
              border: (s.type === 'circle' || s.type === 'rect') ? `2px solid ${BORDER_COLOR}` : 'none',
              boxShadow: (s.type === 'circle' || s.type === 'rect') ? '0 10px 30px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            {s.type === 'heart' && <Heart size={s.radius * 2.8} fill={s.color} stroke={BORDER_COLOR} strokeWidth={0.3} />}
            {s.type === 'triangle' && (
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
                <path d="M50 10 L92 85 L8 85 Z" fill={s.color} stroke={BORDER_COLOR} strokeWidth="1" />
              </svg>
            )}
            {s.type === 'pentagon' && (
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
                <path d="M 50 5 L 93 36 L 76 86 L 24 86 L 7 36 Z" fill={s.color} stroke={BORDER_COLOR} strokeWidth="1.5" />
              </svg>
            )}
            {s.type === 'star4' && (
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
                <path d="M 50 0 Q 60 40 100 50 Q 60 60 50 100 Q 40 60 0 50 Q 40 40 50 0 Z" fill={s.color} stroke={BORDER_COLOR} strokeWidth="1.5" />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhysicsBackground;
