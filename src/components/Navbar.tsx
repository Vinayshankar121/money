import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import sparkLogo from "@/assets/svce-logo.png";
import { motion, useScroll, useSpring } from "framer-motion";



/**
 * Main navigation bar component with responsive mobile menu.
 * Features scroll progress indicator and route-based active states.
 * @component
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Debug: Log current navigation route
  useEffect(() => {
    console.log('Navbar: User navigated to', location.pathname);
  }, [location.pathname]);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    console.log('Navigating to section:', id);
    if (id === "events-page") {
      navigate("/events");
      setIsOpen(false);
      return;
    }

    if (id === "gallery-page") {
      navigate("/gallery");
      setIsOpen(false);
      return;
    }

    if (id === "sponsors-page") {
      navigate("/sponsors");
      setIsOpen(false);
      return;
    }

    if (id === "highlights-page") {
      navigate("/highlights");
      setIsOpen(false);
      return;
    }

    if (id === "contact-page") {
      navigate("/contact");
      setIsOpen(false);
      return;
    }

    if (id === "about-page") {
      navigate("/about");
      setIsOpen(false);
      return;
    }

    if (id === "spotlight-events") {
      navigate("/events?category=Spotlight Events");
      setIsOpen(false);
      return;
    }

    if (id.startsWith("event-cat-")) {
      const category = id.replace("event-cat-", "");
      navigate(`/events?category=${encodeURIComponent(category)}`);
      setIsOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const eventCategories = [
    { name: "Technical Events", id: "Technical Events" },
    { name: "Cultural Events", id: "Cultural Events" }, // Fixed: Must match category name in events.ts
    { name: "Sports", id: "Sports" },
    { name: "Hackathons", id: "Hackathons" },
  ];

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about-page" },
    // Events is handled separately
    { name: "Spotlight Events", id: "spotlight-events" },
    { name: "Highlights", id: "highlights-page" },
    { name: "Sponsors", id: "sponsors-page" },

  ];

  const handleRegisterClick = () => {
    navigate("/register");
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${scrolled
        ? "bg-[#050505]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        : "bg-black/60 backdrop-blur-sm"
        }`}
    >
      {/* Scanning Laser Border */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-[50%] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 blur-[1px] animate-scan-fast" />
      </div>

      {/* Tactical Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection("home")}
          >
            <img
              src={sparkLogo}
              alt="SPARK 2K26"
              className="h-12 w-auto transition-transform duration-300 drop-shadow-[0_0_8px_rgba(195,13,22,0.8)]"
            />
          </div>

          {/* Desktop Navigation - Tactical Style */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.slice(0, 2).map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => scrollToSection(link.id)}
                className="font-orbitron text-white hover:text-primary hover:bg-white relative group transition-all duration-300 tracking-wider"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1 text-primary">[</span>
                {link.name}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 text-primary">]</span>
              </Button>
            ))}

            {/* Events Dropdown */}
            <div
              onMouseEnter={() => setIsEventsOpen(true)}
              onMouseLeave={() => setIsEventsOpen(false)}
              className="relative"
            >
              <DropdownMenu open={isEventsOpen} onOpenChange={setIsEventsOpen} modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="font-orbitron gap-1 text-white hover:text-primary hover:bg-white group tracking-wider"
                    onClick={() => navigate("/events")}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1 text-primary">[</span>
                    Events <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 text-primary">]</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#0a0a0a] border-primary/20 backdrop-blur-xl mt-2 rounded-none border-l-4" sideOffset={5}>
                  {eventCategories.map((cat) => (
                    <DropdownMenuItem
                      key={cat.id}
                      onClick={() => scrollToSection(`event-cat-${cat.id}`)}
                      className="font-orbitron text-white focus:text-primary focus:bg-white cursor-pointer rounded-none hover:pl-4 transition-all duration-300 uppercase tracking-widest text-xs"
                    >
                      {cat.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {navLinks.slice(2).map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => scrollToSection(link.id)}
                className="font-orbitron text-white hover:text-primary hover:bg-white relative group transition-all duration-300 tracking-wider"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1 text-primary">[</span>
                {link.name}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 text-primary">]</span>
              </Button>
            ))}

            <div className="h-8 w-[1px] bg-white/10 mx-4 skew-x-12" />

            <Button
              variant="default"
              onClick={handleRegisterClick}
              className="font-orbitron bg-primary hover:bg-red-600 text-white font-bold tracking-widest px-8 rounded-none skew-x-[-12deg] hover:skew-x-0 transition-all duration-300 border border-primary hover:shadow-[0_0_20px_rgba(var(--primary),0.5)]"
            >
              <span className="skew-x-[12deg] group-hover:skew-x-0">REGISTER</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-up bg-black/90 backdrop-blur-xl border-b border-white/10 absolute left-0 right-0 px-4 top-20 h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-2">
              {navLinks.slice(0, 2).map((link) => (
                <Button
                  key={link.id}
                  variant="ghost_glow"
                  onClick={() => scrollToSection(link.id)}
                  className="w-full justify-start font-orbitron"
                >
                  {link.name}
                </Button>
              ))}

              {/* Mobile Events Section */}
              <div className="py-2 space-y-2">
                <div className="px-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Events</div>
                {eventCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant="ghost_glow"
                    onClick={() => scrollToSection(`event-cat-${cat.id}`)}
                    className="w-full justify-start font-orbitron pl-8 text-sm"
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>

              {navLinks.slice(2).map((link) => (
                <Button
                  key={link.id}
                  variant="ghost_glow"
                  onClick={() => scrollToSection(link.id)}
                  className="w-full justify-start font-orbitron"
                >
                  {link.name}
                </Button>
              ))}

              <Button
                variant="hero"
                onClick={handleRegisterClick}
                className="w-full justify-start font-orbitron mt-2"
              >
                Register
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      <style>{`
        @keyframes scan-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-scan-fast {
          animation: scan-fast 3s linear infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
