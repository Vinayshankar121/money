import React, { useState, useEffect } from "react";
import day1image from "../../assets/day1image.avif";
import day2image from "../../assets/day2image.avif";
import FadeUpOnScroll from "./FadeupScroll";

/* ---------------- TYPES ---------------- */
type Category = "organizers" | "developers" | "coordinators" | "sacteam";

type TeamMember = {
  image: string;
  name: string;
  role: string;
  description: string;
};

/* ---------------- DATA ---------------- */
const teamImages: Record<Category, TeamMember[]> = {
  organizers: [
    {
      image: day1image,
      name: "Ananya Sharma",
      role: "Lead Organizer",
      description: "Oversees event planning and execution.",
    },
    {
      image: day1image,
      name: "Rahul Verma",
      role: "Operations Head",
      description: "Ensures smooth coordination across teams.",
    },
    {
      image: day1image,
      name: "Priya Singh",
      role: "Logistics Manager",
      description: "Handles venue and resource management.",
    },
  ],
  developers: [
    {
      image: day2image,
      name: "Hema Chandrika",
      role: "Frontend Developer",
      description: "Builds interactive user experiences.",
    },
    {
      image: day2image,
      name: "Arjun Patel",
      role: "Backend Developer",
      description: "Designs scalable APIs and services.",
    },
    {
      image: day2image,
      name: "Sneha Rao",
      role: "UI Engineer",
      description: "Focuses on clean and accessible design.",
    },
  ],
  coordinators: [
    {
      image: day2image,
      name: "Kiran Kumar",
      role: "Event Coordinator",
      description: "Manages schedules and communications.",
    },
    {
      image: day2image,
      name: "Neha Joshi",
      role: "Program Coordinator",
      description: "Aligns performances and sessions.",
    },
    {
      image: day2image,
      name: "Amit Shah",
      role: "Volunteer Lead",
      description: "Coordinates volunteer activities.",
    },
  ],
  sacteam: [
    {
      image: day2image,
      name: "SAC Member",
      role: "Student Activity Council",
      description: "Supports student-driven initiatives.",
    },
    {
      image: day2image,
      name: "SAC Member",
      role: "Event Support",
      description: "Ensures smooth student participation.",
    },
    {
      image: day2image,
      name: "SAC Member",
      role: "Coordination Lead",
      description: "Bridges students and organizers.",
    },
  ],
};

/* ---------------- COMPONENT ---------------- */
const TeamGallery: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full py-24 px-4 bg-transparent relative overflow-hidden">

      <div className="max-w-7xl mx-auto space-y-32 relative z-10">
        {Object.entries(teamImages).map(([category, members]) => (
          <div key={category}>
            {/* MINIMAL HEADING */}
            <FadeUpOnScroll>
              <div className="flex flex-col items-center mb-20">
                <div className="inline-block">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wider text-white/90 text-center uppercase mb-3 letterspacing-widest">
                    {category === "sacteam"
                      ? "SAC Team"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </h2>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
              </div>
            </FadeUpOnScroll>

            {/* PROFESSIONAL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {members.map((member, index) => (
                <FadeUpOnScroll key={index} delay={index * 100}>
                  <div
                    className="w-80 h-80 mx-auto group cursor-pointer"
                    onClick={() =>
                      !isDesktop
                        ? setFlippedCard(flippedCard === index ? null : index)
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
                          ${!isDesktop && flippedCard === index ? "[transform:rotateY(180deg)]" : ""}
                        `}
                      >
                        {/* FRONT - Image */}
                        <div className="absolute inset-0 [backface-visibility:hidden]">
                          <div className="relative w-full h-full">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            
                            {/* Name overlay - always visible on front */}
                            
                          </div>
                        </div>

                        {/* BACK - Info */}
                        <div
                          className="absolute inset-0
                                     bg-[#0f1420]
                                     flex flex-col items-center justify-center
                                     text-center px-8
                                     [transform:rotateY(180deg)]
                                     [backface-visibility:hidden]"
                        >
                          {/* Minimalist accent line */}
                          <div className="w-12 h-px bg-white/30 mb-6"></div>
                          
                          <h3 className="text-xl font-medium text-white mb-2 tracking-wide">
                            {member.name}
                          </h3>
                          
                          <p className="text-sm text-white/50 font-light mb-5 tracking-wider uppercase">
                            {member.role}
                          </p>
                          
                          <p className="text-sm text-white/70 leading-relaxed font-light max-w-[240px]">
                            {member.description}
                          </p>

                          {/* Bottom accent */}
                          <div className="w-12 h-px bg-white/30 mt-6"></div>
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

export default TeamGallery;