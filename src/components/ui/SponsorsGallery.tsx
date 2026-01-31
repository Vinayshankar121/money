import React, { useState, useEffect } from "react";
import FadeUpOnScroll from "./FadeupScroll";

/* ---------------- TYPES ---------------- */
interface Sponsor {
    id: number;
    name: string;
    logo: string;
    tier: string;
}

interface SponsorCategory {
    category: string;
    sponsors: Sponsor[];
}

const sponsorCategories: SponsorCategory[] = [
    {
        category: "Core Sponsors",
        sponsors: [
            { id: 1, name: "Razor Edge Gaming", logo: "🎮", tier: "Platinum" },
            { id: 2, name: "ProGamer Hub", logo: "🕹️", tier: "Gold" },
            { id: 3, name: "GameVault Esports", logo: "🎯", tier: "Silver" },
            { id: 4, name: "Elite Controllers", logo: "🎪", tier: "Silver" },
        ]
    },
    {
        category: "Food & Beverage",
        sponsors: [
            { id: 5, name: "BattleBite Café", logo: "🍔", tier: "Platinum" },
            { id: 6, name: "Energy Eats", logo: "🍕", tier: "Gold" },
            { id: 7, name: "Snack Attack", logo: "🌮", tier: "Gold" },
            { id: 8, name: "Refresh Zone", logo: "🥤", tier: "Silver" },
        ]
    },
    {
        category: "Fashion & Design",
        sponsors: [
            { id: 9, name: "StyleWarrior", logo: "👗", tier: "Platinum" },
            { id: 10, name: "Urban Threads", logo: "👔", tier: "Gold" },
            { id: 11, name: "Glamour Studio", logo: "💄", tier: "Silver" },
        ]
    },
    {
        category: "Technology Partners",
        sponsors: [
            { id: 12, name: "CyberForge Tech", logo: "⚙️", tier: "Platinum" },
            { id: 13, name: "TechNova Systems", logo: "💡", tier: "Gold" },
            { id: 14, name: "CodeCraft Labs", logo: "💻", tier: "Silver" },
            { id: 15, name: "Digital Wave", logo: "📱", tier: "Silver" },
        ]
    },
    {
        category: "Media & Broadcasting",
        sponsors: [
            { id: 16, name: "StreamWave Network", logo: "📺", tier: "Platinum" },
            { id: 17, name: "PixelCast Media", logo: "📡", tier: "Gold" },
            { id: 18, name: "Echo Studios", logo: "🎙️", tier: "Silver" },
        ]
    },
    {
        category: "Event Management",
        sponsors: [
            { id: 19, name: "PowerPlay Events", logo: "🏆", tier: "Platinum" },
            { id: 20, name: "Epic Gatherings", logo: "🎪", tier: "Gold" },
            { id: 21, name: "Stage Masters", logo: "🎭", tier: "Silver" },
        ]
    },
];

/* ---------------- COMPONENT ---------------- */
const SponsorsGallery: React.FC = () => {
    const [flippedCard, setFlippedCard] = useState<number | null>(null);
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getTierColor = (tier: string) => {
        switch (tier) {
            case "Platinum":
                return "text-slate-300";
            case "Gold":
                return "text-yellow-400";
            case "Silver":
                return "text-gray-300";
            default:
                return "text-white/70";
        }
    };

    return (
        <section className="w-full py-16 px-4 bg-transparent relative overflow-hidden">

            <div className="max-w-6xl mx-auto space-y-24 relative z-10">
                {sponsorCategories.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {/* MINIMAL HEADING */}
                        <FadeUpOnScroll>
                            <div className="flex flex-col items-center mb-12">
                                <div className="inline-block">
                                    <h2 className="text-2xl md:text-3xl font-light tracking-wider text-white/90 text-center uppercase mb-3 letterspacing-widest">
                                        {group.category}
                                    </h2>
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                                </div>
                            </div>
                        </FadeUpOnScroll>

                        {/* PROFESSIONAL GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {group.sponsors.map((sponsor, index) => (
                                <FadeUpOnScroll key={`${groupIndex}-${index}`} delay={index * 100}>
                                    <div
                                        className="w-64 h-64 mx-auto group cursor-pointer"
                                        onClick={() =>
                                            !isDesktop
                                                ? setFlippedCard(flippedCard === sponsor.id ? null : sponsor.id)
                                                : undefined
                                        }
                                    >
                                        {/* CLEAN CARD CONTAINER */}
                                        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0f1420] border border-white/5 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-white/5">

                                            {/* FLIP MECHANISM */}
                                            <div
                                                className={`
                          relative w-full h-full
                          transition-transform duration-700 [transform-style:preserve-3d]
                          ${isDesktop ? "md:group-hover:[transform:rotateY(180deg)]" : ""}
                          ${!isDesktop && flippedCard === sponsor.id ? "[transform:rotateY(180deg)]" : ""}
                        `}
                                            >
                                                {/* FRONT - Logo */}
                                                <div className="absolute inset-0 [backface-visibility:hidden] flex items-center justify-center bg-[#0a0e1a]">
                                                    <div className="text-6xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-700 group-hover:scale-110">
                                                        {sponsor.logo}
                                                    </div>
                                                    {/* Subtle gradient overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                                    {/* Tier Badge on Front (Optional) */}
                                                    <div className={`absolute bottom-6 left-0 right-0 text-center text-xs font-light tracking-[0.2em] uppercase ${getTierColor(sponsor.tier)}`}>
                                                        {sponsor.tier} Partner
                                                    </div>
                                                </div>

                                                {/* BACK - Info */}
                                                <div
                                                    className="absolute inset-0
                                     bg-[#0f1420]
                                     flex flex-col items-center justify-center
                                     text-center px-6
                                     [transform:rotateY(180deg)]
                                     [backface-visibility:hidden]"
                                                >
                                                    {/* Minimalist accent line */}
                                                    <div className="w-8 h-px bg-white/30 mb-4"></div>

                                                    <h3 className="text-lg font-medium text-white mb-1 tracking-wide font-orbitron">
                                                        {sponsor.name}
                                                    </h3>

                                                    <p className={`text-xs font-light mb-4 tracking-wider uppercase ${getTierColor(sponsor.tier)}`}>
                                                        {sponsor.tier} Sponsor
                                                    </p>

                                                    <p className="text-xs text-white/70 leading-relaxed font-light max-w-[200px]">
                                                        Proud partner of Spark 2K25 Warzone.
                                                    </p>

                                                    {/* Bottom accent */}
                                                    <div className="w-8 h-px bg-white/30 mt-4"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeUpOnScroll>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SponsorsGallery;
