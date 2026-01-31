import { useRef } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Code, Music, Lightbulb, ChevronRight, Trophy, Zap, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Events showcase section displaying event categories with animated cards.
 * Features technical, cultural, sports, and gaming event categories.
 * @component
 */
const Events = () => {
  const categories = [
    {
      id: "technical",
      title: "TECHNICAL",
      subtitle: "ZONE",
      description: "Code, Compile, Conquer. The arena for digital gladiators.",
      icon: Code,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
      color: "from-cyan-500 to-blue-600",
      events: ["RoboWars", "CodeSprint", "Circuitrix"],
      link: "/events?category=Technical%20Events"
    },
    {
      id: "cultural",
      title: "CULTURAL",
      subtitle: "STAGE",
      description: "Unleash your creativity. Dance, Music, and Drama.",
      icon: Music,
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2670&auto=format&fit=crop",
      color: "from-purple-500 to-indigo-600",
      events: ["Battle of Bands", "Step Up", "Fashion"],
      link: "/events?category=Cultural%20Events"
    },
    {
      id: "sports",
      title: "SPORTS",
      subtitle: "ARENA",
      description: "Sweat, Grit, and Glory. Dominate the field.",
      icon: Trophy,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2670&auto=format&fit=crop",
      color: "from-red-500 to-rose-700",
      events: ["Cricket", "Football", "Volleyball"],
      link: "/events?category=Sports"
    },
    {
      id: "hackathons",
      title: "HACKATHONS",
      subtitle: "BUILD",
      description: "24 Hours. Infinite Possibilities. Build the future.",
      icon: Cpu, // Using Cpu for hackathon to distinguish from general 'technical'
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
      color: "from-emerald-500 to-green-700",
      events: ["Spark Hack", "Hardware Hack", "Ideathon"],
      link: "/events?category=Hackathons"
    },
    {
      id: "spotlight",
      title: "SPOTLIGHT",
      subtitle: "EVENTS",
      description: "The main attractions. Star nights and special appearances.",
      icon: Lightbulb,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
      color: "from-amber-400 to-orange-600",
      events: ["Proshows", "Guest Talks", "Auto Expo"],
      link: "/events?category=Spotlight%20Events"
    }
  ];

  // Duplicate categories to create infinite loop
  const infiniteCategories = [...categories, ...categories];

  return (
    <section className="py-20 relative bg-[#050505] overflow-hidden">
      {/* Thiran-style Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10 mb-12">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-black font-orbitron text-white mb-2">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">EVENTS</span>
            </h2>
            <p className="text-zinc-400 font-exo tracking-wide">
              Explore the battlegrounds of Spark 2K25
            </p>
          </div>
        </div>
      </div>

      {/* Infinite/Circle Scroll Marquee */}
      <div className="w-full overflow-hidden mask-linear-fade">
        {/* Container that moves */}
        <motion.div
          className="flex gap-6 w-max px-4"
          animate={{ x: "-50%" }}
          initial={{ x: "0%" }}
          transition={{
            ease: "linear",
            duration: 30, // Adjust speed: higher = slower
            repeat: Infinity
          }}
          whileHover={{ animationPlayState: "paused" }} // Note: framer-motion doesn't support playState directly like CSS, but we can stop interacting via variants or stick to CSS for pause. Actually for a simple marquee, hover pause is best done via CSS or a parent wrapper. 
        // Let's implement Hover Pause via styling or state? 
        // Simple Framer Motion marquee can't easily "pause" without complex state.
        // Alternative: Use a fast duration standard loop.
        // Or better: Let's use CSS animation for the infinite scroll part to allows `hover:pause`.
        >
          {/* We will use a CSS animation tailored wrapper below instead of simple Framer Motion prop if interaction pause is critical. 
              But for "Warzone" smooth feel, a constant slow drift is usually fine. 
              Let's stick to Framer Motion but use a technique to allow stopping.
           */}
        </motion.div>

        {/* Retrying with a pure CSS-friendly structure for reliable "Hover Pause" */}
        <div
          className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]"
        >
          {/* We render 3 sets to ensure totally smooth alignment on wide screens */}
          {[...categories, ...categories, ...categories].map((cat, index) => (
            <div
              key={`${cat.id}-${index}`}
              className="min-w-[300px] md:min-w-[350px] group relative h-[450px] rounded-[30px] overflow-hidden bg-zinc-900 border border-white/10 transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Image Background */}
              <div className="absolute inset-0">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-20 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay`} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <cat.icon className="w-10 h-10 text-white mb-4 opacity-80" />

                  <h3 className="text-3xl font-black font-orbitron text-white mb-2">{cat.title}</h3>


                  {/* Event Pills */}

                </div>

                {/* Explore Button */}
                <Link to={cat.link} className="w-full">
                  <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm bg-gradient-to-r ${cat.color} text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500`}>
                    Explore
                  </button>
                </Link>
              </div>

              {/* Glowing Border Pattern */}
              <div className={`absolute inset-0 border-2 border-transparent rounded-[30px] group-hover:border-white/20 transition-colors pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Custom Animation (Inline style for now or add to tailwind config? Inline is safer for this specific file context without config access) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Move by 1/3 since we tripled the conceptual list (original + dup + dup) */
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Events;
