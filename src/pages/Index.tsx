import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import SparkEffect from "@/components/SparkEffect";
import { motion } from "framer-motion";

/**
 * Main landing page component for SPARK 2026.
 * Features hero section, about stats, events showcase, and gallery preview.
 * @page
 */
const Index = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <SparkEffect />
      <Navbar />
      <main>
        <Hero />

        <motion.div {...fadeInUp}>
          <About />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Events />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Gallery />
        </motion.div>
      </main>
      <Footer />
    </div >
  );
};

export default Index;
