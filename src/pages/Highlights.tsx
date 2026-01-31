import React from "react";
import PillNav from "../components/ui/pillNav";
import Logo from "@/assets/spark-logo.png";
import PreviousYear from "@/components/PreviousYear";
import CircularGallery from "@/components/ui/circulargallary";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { BeamsBackground } from "@/components/ui/beams";
import CircularTestimonials from "@/components/ui/bts";
import { motion } from "motion/react";
import Footer from "@/components/Footer";


import { useLocation } from "react-router-dom";

const products = [
  { title: "Main Stage", link: "#", thumbnail: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800" },
  { title: "Crowd Energy", link: "#", thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800" },
  { title: "Light Show", link: "#", thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" },
  { title: "Performance", link: "#", thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" },
  { title: "Grand Hall", link: "#", thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800" },
  { title: "Neon Vibes", link: "#", thumbnail: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800" },
  { title: "Concert Night", link: "#", thumbnail: "https://images.unsplash.com/photo-1459749411177-0473ef71607b?auto=format&fit=crop&q=80&w=800" },
  { title: "Artist perform", link: "#", thumbnail: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=800" },
  { title: "Laser Show", link: "#", thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800" },
  { title: "Music Souls", link: "#", thumbnail: "https://images.unsplash.com/photo-1514525253440-b393452e23f9?auto=format&fit=crop&q=80&w=800" },
  { title: "Crowd Cheer", link: "#", thumbnail: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800" },
  { title: "Stage Light", link: "#", thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800" },
  { title: "Night Life", link: "#", thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800" },
  { title: "Rock Band", link: "#", thumbnail: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=800" },
  { title: "DJ Set", link: "#", thumbnail: "https://images.unsplash.com/photo-1571266028243-37169d722e96?auto=format&fit=crop&q=80&w=800" },
];

const galleryItems = [
  { image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800", text: "Main Stage" },
  { image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800", text: "Crowd Energy" },
  { image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800", text: "Light Show" },
  { image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", text: "Performance" },
  { image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800", text: "Grand Hall" },
];

const btsTestimonials = [
  {
    quote: "Ensuring every light hits the perfect spot for the grand opening.",
    name: "Stage Crew",
    designation: "Technical Team",
    src: "https://images.unsplash.com/photo-1511268559489-34b624fbfcf5?auto=format&fit=crop&q=80&w=800",
  },
  {
    quote: "Coordinating 50+ volunteers to make the magic happen seamlessly.",
    name: "Event Coordinator",
    designation: "Management",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
  },
  {
    quote: "Capturing the raw emotions and unseen moments of the artists.",
    name: "Lead Photographer",
    designation: "Media Team",
    src: "https://images.unsplash.com/photo-1511268559489-34b624fbfcf5?auto=format&fit=crop&q=80&w=800",
  },
  {
    quote: "Sound checks and mic tests, the rhythm starts here.",
    name: "Sound Engineer",
    designation: "Audio Team",
    src: "https://images.unsplash.com/photo-1514525253440-b393452e23f9?auto=format&fit=crop&q=80&w=800",
  },
];


import { SmoothScroll } from "@/components/ui/smooth-scroll";

const HighlightsPage: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <SmoothScroll>
        <>
          <div className="fixed top-0 left-0 right-0 z-[1000]">
            <PillNav
              logo={Logo}
              logoAlt="spark Logo"
              items={[

                { label: "Gallery", href: "/highlights" },
                { label: "Proshow", href: "/proshow" },
                { label: "Team", href: "/team" },
                { label: "Register", href: "/register" },
              ]}
              activeHref="/highlights"
              className="custom-nav"
          ease="power2.easeOut"
          baseColor='#01102bff'
          pillColor="linear-gradient(130deg, #b510ebff, #f81184ff)"
          hoveredPillTextColor="#fbfbfbff"
          pillTextColor="#faf3f3ff" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen text-white relative overflow-x-hidden bg-black selection:bg-pink-500/30"
          >
            {/* Background elements with smooth entry */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="fixed inset-0 z-0"
            >
              <BeamsBackground />
            </motion.div>

            <div className="w-full">
              {/* 🔹 Video Section */}

              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 flex h-full items-center justify-center">
                {/* Nav was here */}
              </div>
            </div>



            <div className="relative z-10">
              <section>
                <HeroParallax products={products} />
              </section>

              {/* Featured Highlights Section */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="min-h-[80vh] flex flex-col justify-center py-20 relative"
              >
                {/* Decorative side line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50" />

                <h2 className="text-4xl md:text-6xl font-orbitron font-black text-center mb-4 tracking-widest bg-gradient-to-r from-pink-600 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  HIGHLIGHTS
                </h2>

                <div className="h-[60vh] w-full">
                  <CircularGallery items={galleryItems} />
                </div>
              </motion.section>

              {/* Previous Year Section */}
              <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="py-20 bg-gradient-to-b from-transparent via-black/40 to-transparent backdrop-blur-sm"
              >
                <PreviousYear />
              </motion.section>

              {/* BTS Section */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="py-20 min-h-[80vh] flex flex-col justify-center relative"
              >
                {/* Decorative side line */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-pink-500 to-transparent opacity-50" />

                <h2 className="text-4xl md:text-6xl font-orbitron font-black text-center mb-4 tracking-widest bg-gradient-to-r from-[#FF1493] to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,20,147,0.5)]">
                  BEHIND THE SCENES
                </h2>

                <CircularTestimonials
                  testimonials={btsTestimonials}
                  colors={{
                    name: "#FFF",
                    designation: "#22d3ee", // cyan-400
                    testimony: "#e5e7eb", // gray-200
                    arrowBackground: "rgba(255,255,255,0.05)",
                    arrowForeground: "#FFF",
                    arrowHoverBackground: "#db2777", // pink-600
                  }}
                />
              </motion.section>
            </div>
          </motion.div>


        </>

      </SmoothScroll>
      <Footer />

    </>



  );
};

export default HighlightsPage;
