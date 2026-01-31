import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Trophy,
  FileText,
  Share2,
} from "lucide-react";
import { events } from "@/components/data/events";
import { Button } from "@/components/event-ui/button";
import { Badge } from "@/components/event-ui/badge";
import { Card, CardContent } from "@/components/event-ui/card";

import { EventCard } from "@/components/EventCard";
import { toast } from "sonner";

const categoryColors: Record<string, string> = {
  Hackathon: "bg-purple-500/10 text-purple-400 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
  Workshop: "bg-blue-500/10 text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
  Competition: "bg-orange-500/10 text-orange-400 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]",
  Talk: "bg-green-500/10 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]",
  Exhibition: "bg-pink-500/10 text-pink-400 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]",
};

/**
 * Event detail page displaying comprehensive event information.
 * Features related events, sharing functionality, and registration CTAs.
 * @page
 */
export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Event not found
          </h1>
          <Link to="/">
            <Button variant="outline" className="border-border/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedEvents = events
    .filter((e) => e.id !== event.id && e.categories === event.categories)
    .slice(0, 3);

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleRegister = () => {
    toast.success("Registration form will open soon!");
  };

  return (
    <div className="min-h-screen bg-[#050505] relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen opacity-20" />
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Event Poster */}
            <div className="w-full max-w-[610px] mx-auto aspect-square rounded-xl overflow-hidden bg-muted shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-primary/20 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>


            {/* Back Button */}
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-primary pl-0 hover:bg-transparent mb-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>

            {/* Title Section */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {event.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className={`${categoryColors[category] ||
                      "bg-primary/20 text-primary border-primary/50"
                      } border`}
                  >
                    {category}
                  </Badge>
                ))}
                <Badge
                  variant="outline"
                  className="bg-muted/50 text-muted-foreground border-border/50"
                >
                  {event.department}
                </Badge>
                {event.registrationOpen ? (
                  <Badge className="bg-success/20 text-success border border-success/50">
                    Registration Open
                  </Badge>
                ) : (
                  <Badge className="bg-destructive/20 text-destructive border border-destructive/50">
                    Registration Closed
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-orbitron tracking-wide drop-shadow-lg">
                {event.title}
              </h1>
              <p className="text-lg text-zinc-400">
                Organized by {event.department || "Event SAC"}
              </p>
            </div>

            {/* Description */}
            <Card className="border-primary/20 bg-zinc-900/40 backdrop-blur-md sticky top-24">
              <CardContent className="p-8 space-y-8">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2 font-orbitron">
                  <FileText className="h-5 w-5 text-primary" />
                  About This Event
                </h2>
                <p className="text-zinc-300 leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Rules */}
            {event.rules && event.rules.length > 0 && (
              <Card className="border-red-500/20 bg-zinc-900/40 backdrop-blur-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4 font-orbitron">
                    Rules & Guidelines
                  </h2>
                  <ul className="space-y-2">
                    {event.rules.map((rule, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-zinc-400"
                      >
                        <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Prizes */}
            {event.prizes && event.prizes.length > 0 && (
              <Card className="border-yellow-500/20 bg-zinc-900/40 backdrop-blur-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2 font-orbitron">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Entry Fee
                  </h2>
                  <div className="grid gap-3">
                    {event.prizes.map((prize, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
                      >
                        <span className="text-yellow-500 font-bold">
                          #{index + 1}
                        </span>
                        <span className="text-zinc-200">{prize}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info Card */}
            <Card className="border-primary/30 bg-zinc-900/60 backdrop-blur-xl sticky top-24 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-base text-zinc-500">Date</p>
                      <p className="text-xl text-white font-semibold">
                        {formattedDate === "Invalid Date"
                          ? event.dateTag
                          : formattedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <Clock className="h-7 w-7 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-base text-zinc-500">Time</p>
                      <p className="text-xl text-white font-semibold">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                      <MapPin className="h-7 w-7 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-base text-zinc-500">Venue</p>
                      <p className="text-xl text-white font-semibold">{event.venue}</p>
                    </div>
                  </div>

                  {event.teamSize && (
                    <div className="flex items-start gap-5">
                      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <Users className="h-7 w-7 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-base text-zinc-500">Team Size</p>
                        <p className="text-xl text-white font-semibold">
                          {event.teamSize}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-6 border-t border-zinc-800">
                  <Button
                    className="w-full h-12 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/80 hover:to-purple-600/80 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    disabled={!event.registrationOpen}
                    onClick={handleRegister}
                  >
                    {event.registrationOpen ? "Register Now" : "Registration Closed"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 text-lg border-zinc-800 text-zinc-400 hover:text-white hover:bg-white/5"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 font-orbitron">
              Related Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 mt-16 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          <p>© 2024 TechFest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
