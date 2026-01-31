import { Link } from "react-router-dom";
import { Event, getPrimaryCategory } from "@/components/data/events";
import { Card } from "@/components/event-ui/card";
import { motion } from "framer-motion";
import { getCategoryTheme, getRegistrationBadge } from "@/lib/eventDisplay";

interface EventCardProps {
  event: Event;
}

/**
 * Event card component displaying event preview with category-based theming.
 * Features animated hover effects and registration status badges.
 * @component
 */
export function EventCard({ event }: EventCardProps) {
  const primaryCategory = getPrimaryCategory(event);
  const categoryTheme = getCategoryTheme(primaryCategory);
  const registrationBadge = getRegistrationBadge(event.registrationOpen);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 10 } }
      }}
      className="h-full"
    >
      <Link to={`/event/${event.id}`} className="group block h-full">
        <Card className="relative overflow-hidden border border-white/10 bg-black/40 h-full aspect-square transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_var(--glow-color)]"
          style={{ "--glow-color": categoryTheme.glowColor } as React.CSSProperties}>
          {/* Image Container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-700"
            />
          </div>

          {/* Badge Row */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${categoryTheme.badgeClass}`}
            >
              {primaryCategory}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${registrationBadge.className}`}
            >
              {registrationBadge.label}
            </span>
          </div>

          {/* Minimal Content - Title Only */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-l font-bold text-white font-orbitron text-center drop-shadow-md group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </div>

          {/* Hover Highlight */}
          <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-lg pointer-events-none transition-colors duration-500" />
        </Card>
      </Link>
    </motion.div>
  );
}
