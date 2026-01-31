import React from "react";
import PillNav from "../components/ui/pillNav";
import Footer from "@/components/Footer";
import SponsorsGallery from "../components/ui/SponsorsGallery";
import sparkLogo from "@/assets/spark-logo.png";
import { motion } from "motion/react";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import SparkEffect from "@/components/SparkEffect";
import NavBar from "@/components/Navbar";

const SponsorsPage: React.FC = () => {
  return (
    <>
    <NavBar />
    <SmoothScroll>
    
      <div className="relative min-h-screen overflow-x-hidden font-montserrat text-white bg-[#0a0e1a]">
        <SparkEffect />
        

        {/* ENHANCED PROFESSIONAL BACKGROUND */}
        <div className="fixed inset-0 z-0">
          {/* Base gradient - deep professional tones */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0f1420] to-[#1a1f35]" />

          {/* Subtle animated gradient orbs */}
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 50, 0],
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute bottom-0 right-1/4 w-[900px] h-[900px] bg-purple-600/10 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6
            }}
            className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[140px]"
          />

          {/* Professional grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Diagonal accent lines */}
          <div className="absolute inset-0 overflow-hidden opacity-5">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent transform -skew-x-12" />
            <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent transform -skew-x-12" />
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent transform -skew-x-12" />
          </div>

          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />

          {/* Film grain texture */}
          <div
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* HERO SECTION */}
        <section className="relative z-10 w-full">

          {/* ENHANCED HERO TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center text-center min-h-[40vh] px-6 py-16"
          >
            <div className="space-y-6 max-w-4xl">
              {/* Decorative top accent */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto"
              />

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-light tracking-[0.3em] uppercase
                  text-white/95
                  drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                Our Sponsors
              </motion.h2>

              {/* Subtle underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[2px] w-32 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-sm md:text-lg text-white/60 max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
              >
                The Backbone of Victory — Partners Who Fuel the Battle
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* SPONSORS GALLERY */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative z-10 px-4 md:px-10 pb-24"
        >
          {/* Decorative side accents */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <SponsorsGallery />
        </motion.section>
      </div>

      {/* FOOTER - Outside wrapper if needed, but smooth scroll usually wraps all. Highlights page puts footer AFTER smooth scroll? 
          Actually Highlights.tsx SmoothScroll wraps just Beams/Nav, and Footer is OUTSIDE. 
          If Footer is outside, it might feel disconnected if SmoothScroll transforms the body or wrapper.
          Lenis works on window by default. 
          The SmoothScroll component returns <>{children}</> and creates a global Lenis instance. 
          So it doesn't create a DOM wrapper. It just smooths the window scroll.
          So wrapping everything or just part doesn't matter for the scroll physics, 
          but for React structure it's cleaner to wrap everything.
      */}
     
    </SmoothScroll>
     <Footer />
    </>
  );
};

export default SponsorsPage;
