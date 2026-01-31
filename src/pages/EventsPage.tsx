import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";


import { SearchBar } from "@/components/SearchBar";

import { EventCard } from "@/components/EventCard";
import { DateSelect } from "@/components/DateSelect";
import { MobileFilterDrawer } from "@/components/MobileFilterDrawer";
import { EventSummary } from "@/components/EventSummary";
import { events, categories, dateTags, departments } from "@/components/data/events";
import { filterAndSortEvents } from "@/lib/eventFilters";


export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Events");
  /* Update initial state to match sort values */
  const [sortBy, setSortBy] = useState("date-desc");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      // Decode URI component just in case, though searchParams usually handles it
      setActiveFilter(decodeURIComponent(category));
    } else {
      // Optional: Reset to All Events if no param, or leave as is to allow state persistence within session if desired.
      // For this request, reflecting the link click is priority.
      setActiveFilter("All Events");
    }
  }, [searchParams]);

  /* Fixed Logical Error:
     The previous logic relied on `categories.includes(activeFilter)`. If for any reason (whitespace, mismatch)
     the check failed, it would fall through and return ALL events, making it seem like filtering wasn't working.
     We now explicitly check validity.
  */
  const filteredEvents = useMemo(() => {
    return filterAndSortEvents(events, {
      searchQuery,
      activeFilter,
      sortBy,
      categories,
      dateTags,
      departments,
    });
  }, [searchQuery, activeFilter, sortBy]);



  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-foreground relative overflow-clip selection:bg-primary/30">
      {/* Cyber Snowfall Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              filter: `blur(${Math.random()}px) drop-shadow(0 0 5px rgba(255,255,255,0.8))`,
              animation: `snowfall ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 15}s`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
        {/* Neon Ash/Glow Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute rounded-full opacity-60 mix-blend-screen"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${-10 - Math.random() * 20}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: i % 2 === 0 ? "hsl(var(--neon-cyan))" : "hsl(var(--fire-orange))",
              boxShadow: `0 0 10px ${i % 2 === 0 ? "hsl(var(--neon-cyan))" : "hsl(var(--fire-orange))"}`,
              animation: `spark-rise ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
             opacity: 0.7;
          }
          100% {
            transform: translateY(110vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Header */}
      <Navbar />


      {/* Hero Section */}
      <section className="relative pt-5 pb-16 px-4">

      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>


      <div className="min-h-screen bg-transparent relative z-10">
        <main className="container mx-auto px-4 py-8">
          <EventSummary />
          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="flex gap-2">
              <MobileFilterDrawer
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                open={mobileFilterOpen}
                onOpenChange={setMobileFilterOpen}
              />
              <DateSelect value={activeFilter} onChange={handleFilterChange} />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filter Sidebar */}
            

            {/* Events Grid */}
            <div className="flex-1">
              {/* Active filter indicator */}
              {activeFilter !== "All Events" && (
                <div className="mb-4 text-sm text-zinc-400 flex items-center gap-2">
                  Showing: <span className="text-primary font-bold px-3 py-1 bg-primary/10 rounded-full border border-primary/20">{activeFilter}</span>
                </div>
              )}

              {/* Results count */}
              <div className="mb-6 text-sm text-white font-mono">
                // FOUND {filteredEvents.length} EVENT{filteredEvents.length !== 1 ? "S" : ""}
              </div>

              {filteredEvents.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20 border border-dashed border-white rounded-xl bg-white/5">
                  <p className="text-white text-lg font-orbitron">No events found in this sector</p>
                  <p className="text-white text-sm mt-2">
                    Adjust search parameters to locate targets
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>


      {/* Footer */}
      <Footer />
    </div>
  );
};


