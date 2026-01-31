import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Performance note: Consider implementing lazy loading for images and memoization
  // of galleryItems to avoid unnecessary re-renders when parent component updates

  // Placeholder gallery items - in production, these would be actual event photos
  const galleryItems = [
    {
      title: "Gaming Championship 2024",
      description: "Intense BGMI finals with 500+ participants",
      color: "from-primary/20 to-background",
    },
    {
      title: "Tech Hackathon",
      description: "48-hour coding marathon with innovative solutions",
      color: "from-secondary/20 to-background",
    },
    {
      title: "Cultural Night",
      description: "Dance performances that lit up the stage",
      color: "from-primary/20 to-background",
    },
    {
      title: "Opening Ceremony",
      description: "Grand launch of SPARK 2024",
      color: "from-secondary/20 to-background",
    },
    {
      title: "Prize Distribution",
      description: "Celebrating winners across all categories",
      color: "from-primary/20 to-background",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-card/30">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-4">
            <ImageIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-orbitron font-semibold text-primary uppercase tracking-wider">
              Previous Years
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">
            Moments of <span className="text-secondary text-glow-cyan">Glory</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-exo">
            Relive the epic moments from previous SPARK editions
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Display */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${galleryItems[currentIndex].color} flex items-center justify-center`}
            >
              {/* Placeholder Content */}
              <div className="text-center p-12">
                <ImageIcon className="w-24 h-24 mx-auto mb-6 text-foreground/20" />
                <h3 className="text-3xl font-orbitron font-bold mb-4 text-foreground">
                  {galleryItems[currentIndex].title}
                </h3>
                <p className="text-lg text-muted-foreground font-exo">
                  {galleryItems[currentIndex].description}
                </p>
              </div>
            </div>

            {/* Glitch Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="battle"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="battle"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-border/60"
                  }`}
              />
            ))}
          </div>

          {/* Thumbnail Preview */}
          <div className="mt-12 grid grid-cols-3 md:grid-cols-5 gap-4">
            {galleryItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`aspect-video rounded-lg overflow-hidden transition-all duration-300 border-2 ${index === currentIndex
                    ? "border-primary scale-105 shadow-[0_0_20px_hsl(var(--fire-orange)/0.5)]"
                    : "border-border hover:border-primary/50 opacity-60 hover:opacity-100"
                  }`}
              >
                <div
                  className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center`}
                >
                  <ImageIcon className="w-8 h-8 text-foreground/30" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
