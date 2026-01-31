import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sword, Trophy, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBattlefield from "@/assets/hero-battlefield.jpg";
import sparkLogo from "@/assets/spark-logo.png";
import { motion } from "framer-motion";

/**
 * Hero section component with countdown timer and call-to-action buttons.
 * Features animated background and event date countdown.
 * @component
 */
const Hero = () => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2026-02-28T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Static Professional Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBattlefield})` }}>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40" />
      </div>

      {/* Grid Overlay - Very Subtle */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Center Content */}
      <div className="relative z-30 container mx-auto px-4 flex flex-col items-center justify-center h-full text-center">

        {/* Logo - Static & Centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src={sparkLogo}
            alt="SPARK 2026"
            className="w-full max-w-[500px] h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-2xl text-zinc-300 font-light tracking-wide max-w-2xl mx-auto mb-10"
        >
          An Inter-College <span className="text-white font-semibold">Techno-Cultural</span> Sports Event.
        </motion.p>

        {/* Buttons - Clean & Professional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button
            className="bg-primary hover:bg-primary/90 text-white min-w-[180px] h-12 text-base font-medium tracking-wide rounded-sm shadow-lg shadow-primary/20 transition-all duration-300"
            onClick={() => { document.getElementById("events")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <Sword className="w-4 h-4 mr-2" /> JOIN THE SPARK
          </Button>

          <Button
            variant="outline"
            className="border-white/20 hover:bg-white/5 text-white min-w-[180px] h-12 text-base font-medium tracking-wide rounded-sm backdrop-blur-sm transition-all duration-300"
            onClick={() => navigate("/events")}
          >
            <Trophy className="w-4 h-4 mr-2" /> VIEW EVENTS
          </Button>
        </motion.div>

        {/* Sleek Countdown Timer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8 text-white">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-light font-orbitron">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1">Days</div>
            </div>
            <div className="text-zinc-600 text-2xl font-light">:</div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-light font-orbitron">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1">Hours</div>
            </div>
            <div className="text-zinc-600 text-2xl font-light">:</div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-light font-orbitron">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1">Mins</div>
            </div>
            <div className="text-zinc-600 text-2xl font-light">:</div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-light font-orbitron">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1">Secs</div>
            </div>
          </div>
          <div className="text-center mt-6">
            <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Event Starts Soon</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-5 h-5 text-zinc-500" />
      </motion.div>
    </section>
  );
};

export default Hero;
