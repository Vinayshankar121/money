import { motion } from "motion/react";
import { useState } from "react";
import { BeamsBackground } from "./ui/beams";



const PreviousYear = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const images = [
        "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop",
    ];

    return (
        <div id="previous-year" className="max-w-7xl mx-auto px-4 py-16">
            <motion.h2
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-orbitron font-black text-center mb-16 bg-gradient-to-r from-pink-600 to-cyan-400 bg-clip-text text-transparent hover:text-pink,blue-700 hover:bg-none transition-colors duration-500 cursor-default" >
                PREVIOUS YEARS
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                        className={`group relative h-80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${activeIndex === index ? 'ring-4 ring-cyan-500 scale-[1.02]' : 'hover:scale-[1.02] hover:ring-4 hover:cyan'}`}
                    >
                        <img src={img} alt={`Previous Year ${index}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className={`absolute inset-0 transition-colors duration-300 flex flex-col justify-end p-6 ${activeIndex === index ? 'bg-black-600/60' : 'bg-black/40 group-hover: cyan,black-600/50'}`}>
                            <h3 className="text-xl font-orbitron font-bold text-light pink uppercase tracking-tight">Spark 2025</h3>
                            <p className={`${activeIndex === index ? 'text-white' : 'text-blue-400 group-hover:text-white'} text-xs font-exo font-medium tracking-widest mt-1`}>THE LEGACY</p>
                        </div>
                        <BeamsBackground />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PreviousYear;
