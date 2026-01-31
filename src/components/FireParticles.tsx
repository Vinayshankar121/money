import { useEffect, useState } from "react";

interface FireParticle {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
  color: string;
}

interface FireParticlesProps {
  density?: number;
}

const FireParticles = ({ density = 50 }: FireParticlesProps) => {
  const [particles, setParticles] = useState<FireParticle[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(16, 100%, 60%)',  // orange
      'hsl(0, 100%, 50%)',   // red
      'hsl(35, 100%, 60%)',  // gold
      'hsl(16, 100%, 50%)',  // fire-orange
    ];

    const initialParticles = Array.from({ length: density }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(initialParticles);
  }, [density]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bottom-0 rounded-full opacity-60 blur-[1px]"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            animation: `fire-rise ${particle.animationDuration}s ease-in infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FireParticles;
