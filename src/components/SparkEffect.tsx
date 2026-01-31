import { useEffect, useState } from "react";

interface Spark {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
}

const SparkEffect = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    // Generate initial sparks
    const initialSparks = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 3,
    }));
    setSparks(initialSparks);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute bottom-0 rounded-full opacity-60"
          style={{
            left: `${spark.left}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            background: Math.random() > 0.5 
              ? 'hsl(var(--fire-orange))' 
              : 'hsl(var(--neon-cyan))',
            boxShadow: Math.random() > 0.5
              ? '0 0 10px hsl(var(--fire-orange) / 0.8)'
              : '0 0 10px hsl(var(--neon-cyan) / 0.8)',
            animation: `spark-rise ${spark.animationDuration}s linear infinite`,
            animationDelay: `${spark.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SparkEffect;
