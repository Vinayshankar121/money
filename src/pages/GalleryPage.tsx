import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Play, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FireParticles from "@/components/FireParticles";
import { Button } from "@/components/ui/button";
import DemoOne from "@/components/sphere-demo";
import sparkLogo from "@/assets/spark-logo.png";
import { StickyScroll } from "@/components/ui/StickyScroll";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

/**
 * Gallery page showcasing event photos and videos.
 * Features category filtering and lightbox view.
 * @page
 */
const GalleryPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ["All", "Gaming", "Cultural", "Guests", "Winners", "Backstage"];

  // Mock gallery data
  const galleryItems: GalleryItem[] = [
    { id: 1, title: "BGMI Finals", category: "Gaming", image: "", description: "Epic battle royale showdown" },
    { id: 2, title: "Dance Performance", category: "Cultural", image: "", description: "Mesmerizing moves" },
    { id: 3, title: "Chief Guest", category: "Guests", image: "", description: "Industry leader keynote" },
    { id: 4, title: "Winner Moment", category: "Winners", image: "", description: "Victory celebration" },
    { id: 5, title: "Setup Time", category: "Backstage", image: "", description: "Behind the scenes prep" },
    { id: 6, title: "Coding Marathon", category: "Gaming", image: "", description: "Hackathon intensity" },
    { id: 7, title: "Stage Performance", category: "Cultural", image: "", description: "Live concert energy" },
    { id: 8, title: "Tech Talk", category: "Guests", image: "", description: "Innovation insights" },
    { id: 9, title: "Trophy Ceremony", category: "Winners", image: "", description: "Champions crowned" },
  ];

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const stickyScrollContent = [
    {
      title: "Gaming Arena",
      description: "Experience the thrill of competitive gaming with top-tier setups and intense rivalries.",
      content: (
        <div className="h-full w-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white">
          <span className="text-2xl font-bold">Gaming Zone</span>
        </div>
      ),
    },
    {
      title: "Cultural Vibes",
      description: "Immerse yourself in a fusion of tradition and modernity through electrifying performances.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white bg-gradient-to-br from-pink-500 to-indigo-500">
          <span className="text-2xl font-bold">Cultural Fest</span>
        </div>
      ),
    },
    {
      title: "Tech Innovation",
      description: "Witness the future with cutting-edge tech showcases and hackathon breakthroughs.",
      content: (
        <div className="h-full w-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white">
          <span className="text-2xl font-bold">Tech World</span>
        </div>
      ),
    },
    {
      title: "Tech Innovation",
      description: "Witness the future with cutting-edge tech showcases and hackathon breakthroughs.",
      content: (
        <div className="h-full w-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white">
          <span className="text-2xl font-bold">Tech World</span>
        </div>
      ),
    },
    {
      title: "Cultural Vibes",
      description: "Immerse yourself in a fusion of tradition and modernity through electrifying performances.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white bg-gradient-to-br from-pink-500 to-indigo-500">
          <span className="text-2xl font-bold">Cultural Fest</span>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <FireParticles density={60} />
      <Navbar />

      {/* Hero Section - Cinematic Intro */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        {/* Layered Background with Parallax Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzMzMyIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />

        {/* Glowing Accent Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 text-center animate-scale-in">
          <div className="mb-6 flex justify-center">
            <img src={sparkLogo} alt="SPARK 2026" className="h-24 md:h-40 object-contain drop-shadow-[0_0_20px_rgba(195,13,22,0.6)] animate-glow-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 text-secondary text-glow-cyan">
            GALLERY
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-16 font-exo max-w-3xl mx-auto">
            Relive the thrill, chaos, and memories
          </p>

          <div className="flex items-center justify-center gap-2 text-primary animate-bounce">
            <span className="text-sm uppercase tracking-wider font-orbitron">View Moments</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Category Filter Bar - Floating with Neon Glow */}
      <section className="sticky top-20 z-40 bg-background/90 backdrop-blur-xl border-b border-primary/20 py-6 shadow-lg shadow-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "hero" : "ghost_glow"}
                onClick={() => setSelectedCategory(category)}
                className="font-orbitron font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Image Focus Only */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300 cursor-pointer animate-fade-in hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                style={{ animationDelay: `${index * 0.03}s` }}
                onClick={() => setSelectedImage(item)}
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-6xl">📸</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-sm font-orbitron font-bold text-white">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Reels Section - Horizontal Carousel */}
      <section className="py-20 bg-card/30 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-center mb-16 text-glow-cyan animate-slide-up">
            Highlight <span className="text-primary text-glow-orange">Reels</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <div
                key={item}
                className="relative aspect-video rounded-2xl overflow-hidden border-2 border-border hover:border-secondary transition-all duration-500 group cursor-pointer animate-slide-up hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--secondary)/0.5)]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Light Reflection Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-card/70 flex items-center justify-center transition-all duration-500 group-hover:from-secondary/40 group-hover:to-card/80">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-secondary/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-125 transition-all duration-500 group-hover:shadow-[0_0_30px_hsl(var(--secondary)/0.8)]">
                      <Play className="w-10 h-10 text-secondary ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Soft Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-lg font-orbitron font-bold text-foreground">Highlight Reel {item}</p>
                  <p className="text-sm text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">10-20 sec epic moments</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes - Horizontal Scroll with Tilt Effect */}
      {/* Event Highlights Sphere - FORCED HEIGHT FIX */}
      {/* Event Highlights Sphere */}
      <section className="py-10 relative text-center flex flex-col items-center justify-center">

        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-glow-cyan z-20 mb-4">
          Event Highlights Sphere
        </h2>

        {/* Change h-[400px] to h-[500px] to see the full sphere */}
        <div className="h-[700px] w-full flex items-center justify-center overflow-hidden relative z-10 -my-10">
          <DemoOne />
        </div>

      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-center mb-16 animate-slide-up">
            Behind the <span className="text-secondary text-glow-cyan">Scenes</span>
          </h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 pb-6 px-4">
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <div
                  key={item}
                  className="flex-shrink-0 w-80 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-border hover:border-primary transition-all duration-500 hover:scale-110 hover:rotate-2 cursor-pointer group animate-slide-up hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-card/70 flex items-center justify-center transition-all duration-500 group-hover:from-primary/40 group-hover:to-card/80">
                    <div className="text-center p-6 transform transition-transform duration-500 group-hover:scale-110">
                      <div className="text-6xl mb-4 animate-bounce">🎬</div>
                      <p className="text-lg font-orbitron font-bold text-foreground mb-2">BTS Moment {item}</p>
                      <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">Candid captures</p>
                    </div>
                  </div>

                  {/* Motion Blur Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>


        <StickyScroll content={stickyScrollContent} />



      </section>







      {/* Outro Section - Cinematic Banner */}
      <section className="py-32 relative overflow-hidden">
        {/* Dramatic Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/10 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-scale-in">
            <p className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-8 text-glow-orange animate-glow-pulse leading-tight max-w-4xl mx-auto">
              "A Celebration of Passion, Power & Play"
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 font-exo tracking-wide">
              SPARK 2K26 Media Crew 🎥
            </p>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/")}
              className="animate-pulse hover:scale-110 transition-transform duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)]"
            >
              Return to Home Page
            </Button>
          </div>
        </div>
      </section>

      {/* Spotlight Mode - Simplified Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-card/95 backdrop-blur-md border-2 border-primary rounded-2xl overflow-hidden animate-scale-in shadow-[0_0_60px_hsl(var(--primary)/0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="battle"
              size="icon"
              className="absolute top-4 right-4 z-10 hover:scale-110 transition-transform duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            <div className="p-8">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mb-6">
                <span className="text-9xl">📸</span>
              </div>

              <div className="text-center space-y-3">
                <h3 className="text-3xl font-orbitron font-bold text-primary">
                  {selectedImage.title}
                </h3>
                <p className="text-lg text-secondary font-semibold">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;
