import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FireParticles from "@/components/FireParticles";
import { Check, ChevronsRight, Crown, Calendar, Zap } from "lucide-react";
import FAQSection from "@/components/FAQSection";

/**
 * Registration page displaying ticket passes and pricing.
 * Features SVCE student passes, outsider passes, and FAQ section.
 * @page
 */
export default function RegistrationPage() {
  const passes = [
    {
      id: 1,
      title: "ELITE",
      subtitle: "SVCE STUDENTS",
      price: "₹250",
      type: "ALL TWO DAYS",
      description: "SVCE Students",//Exclusive access for SVCE students to all events on both days.
      includes: [
        "Access to All Events",
        "Day 1 & Day 2 Entry",
        "Convenience Fee Extra",
        "College ID Required",
        ""
      ],
      highlight: true
    },
    {
      id: 2,
      title: "ELITE",
      subtitle: "OUTSIDERS",
      price: "₹500",
      type: "ALL TWO DAYS",
      description: "Outsiders",//Full access for non-SVCE students to all events on both days.
      includes: [
        "Access to All Events",
        "Day 1 & Day 2 Entry",
        "Convenience Fee Extra",
        "Participant Kit"
      ],
      highlight: false
    },
    {
      id: 3,
      title: "1 DAY",
      subtitle: "OUTSIDERS",
      price: "₹250",
      type: "ANY ONE DAY",
      description: "Outsiders",//Access for non-SVCE students to all events on any single day.
      includes: [
        "Access to Day Events",
        "Choose Day 1 or Day 2",
        "Convenience Fee Extra",
        "Participant Kit",

      ],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 overflow-x-hidden font-sans">
      <FireParticles density={30} />
      <Navbar />

      <main className="relative pt-32 pb-20 container mx-auto px-4">

        {/* --- HEADER --- */}
        <div className="relative mb-20 text-center">
          {/* Watermark */}
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-[#1a1a1a] opacity-80 pointer-events-none select-none italic leading-none whitespace-nowrap">
            SPARK
          </h1>

          <h2 className="relative z-10 text-6xl md:text-8xl font-black font-orbitron italic tracking-tighter text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.5)]">
            PASSES
          </h2>
          <div className="relative z-10 flex items-center justify-center gap-2 mt-4 text-zinc-400 font-mono tracking-[0.2em] uppercase text-sm">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            Select Your Loadout
          </div>
        </div>


        {/* --- PASSES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className={`relative group bg-zinc-900/40 border border-white/5 backdrop-blur-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] ${pass.highlight ? 'ring-1 ring-red-500/50' : ''}`}
            >
              {/* Background Texture */}
              {/* Background Texture & Watermark */}
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 overflow-hidden">
                {/* Interactive/Animated Lines */}


                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
              </div>

              {/* Spark Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-300 font-black font-orbitron text-8xl skew-x-[-20deg] text-white select-none pointer-events-none z-0">
                SPARK
              </div>

              {/* Vertical Accent Line */}
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] z-20" />

              {/* Price Badge */}
              <div className="absolute top-0 right-0 bg-red-600 text-white font-black font-orbitron py-2 px-6 shadow-lg z-20 skew-x-[-10deg] origin-top-right translate-x-2">
                <div className="skew-x-[10deg] text-xl tracking-wide">{pass.price}</div>
              </div>

              {/* Content Container */}
              <div className="relative z-10 p-8 flex flex-col h-full pl-10">

                {/* Header Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">SPARK 2026</span>
                    {pass.highlight && <Crown className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <h3 className="text-5xl font-black font-orbitron text-white italic tracking-tighter mb-2">
                    {pass.title}
                  </h3>
                  <div className="inline-flex items-center border border-red-500/30 rounded-full px-3 py-0.5 bg-red-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{pass.type}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#FFB703] skew-x-[-15deg] text-2xl font-medium leading-relaxed mb-8 border-l-2 border-white/10 pl-4">
                  {pass.description}
                </p>

                {/* Benefits Title */}
                <div className="flex items-center gap-4 mb-6">
                  <h4 className="text-xs font-black text-red-600 uppercase tracking-widest">
                    INCLUDES ACCESS TO
                  </h4>
                  <div className="h-px bg-red-900/30 flex-1" />
                </div>

                {/* Benefits List */}
                <ul className="space-y-4 mb-10 flex-1">
                  {pass.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)] group-hover/item:scale-150 transition-transform" />
                      <span className="text-sm font-bold text-zinc-300 group-hover/item:text-white transition-colors uppercase">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black font-orbitron text-lg uppercase py-4 tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] flex items-center justify-center gap-2 group/btn">
                  REGISTER NOW
                  <ChevronsRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- FAQ SECTION --- */}
        <FAQSection />

        {/* --- BOTTOM SECTION --- */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest mb-4">
            Need Custom Packs for your College?
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-white font-bold hover:text-red-500 transition-colors border-b border-dashed border-zinc-700 hover:border-red-500 pb-1">
            <Zap className="w-4 h-4" />
            CONTACT STUDENT COORDINATORS
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
