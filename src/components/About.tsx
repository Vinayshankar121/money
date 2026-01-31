/**
 * About section component displaying event statistics and highlights.
 * Features animated stat cards with gradient effects.
 * @component
 */
const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/40 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="relative">
            {/* Glow line behind text - Cyan for contrast */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-1 bg-gradient-to-r from-transparent via-secondary to-transparent blur-sm opacity-50" />
            <span className="relative z-10 text-secondary font-bold tracking-[0.5em] uppercase text-sm md:text-base">
              Statistics
            </span>
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold text-white font-orbitron">
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Highlights</span>
          </h2>
        </div>

        {/* Stats Section - Leaf Shaped Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { value: "10000+", label: "Participants", color: "from-primary to-rose-600" },
            { value: "120+", label: "Events", color: "from-secondary to-cyan-400" },
            { value: "₹10L+", label: "Prize Pool", color: "from-amber-500 to-orange-500" },
            { value: "2", label: "Days of Action", color: "from-purple-500 to-indigo-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group p-[1px]"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              {/* Card Background - Dark Glass instead of full Red */}
              <div className="
                 relative
                 bg-card/40 backdrop-blur-md
                 rounded-tl-[40px] rounded-br-[40px] rounded-tr-xl rounded-bl-xl
                 h-40 md:h-48
                 flex flex-col items-center justify-center
                 shadow-lg shadow-black/40
                 transform transition-transform duration-300 hover:-translate-y-2
                 border border-white/5 hover:border-white/10
                 overflow-hidden
              ">
                {/* Top Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-70`} />

                {/* Inner Content */}
                <div className="text-center p-4 relative z-10">
                  <div className={`text-3xl md:text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2 drop-shadow-sm font-orbitron`}>
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 font-semibold uppercase tracking-wider font-exo group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </div>

                {/* Internal Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-tl-[40px] rounded-br-[40px]`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
