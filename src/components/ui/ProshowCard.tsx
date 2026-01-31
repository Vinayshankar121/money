import day1image from "../../assets/day1image.avif";
import React from "react";
import CardGlare from "./cardGlare";
import ScrollAnimate from "./proshowcardAnimation";
import {
  CCard,
  CCardBody,
  CCardImage,
} from "@coreui/react";

const ProshowCard = () => {
  return (
    <section
      className="
        relative
        h-full max-w-16xl 
        text-white
        shadow-xl rounded-3xl overflow-hidden
        bg-transparent backdrop-blur-md
        transition-transform duration-300 ease-out
        hover:scale-[1.02]
        p-16 md:p-10 lg:p-14
      "
    >
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* IMAGE COLUMN */}
        <div className="md:col-span-5 flex items-center">
          <ScrollAnimate direction="left">
            <CCard
              className="
                h-[420px] md:h-[480px]
                w-full
                overflow-hidden rounded-2xl
                bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-400
                p-[2px]
                transition-all duration-300
                hover:shadow-[0_0_20px_rgba(217,70,239,1)]
              "
            >
              <div className="h-full w-full rounded-2xl overflow-hidden bg-black">
                <CardGlare />
                <CCardImage
                  src={day1image}
                  alt="Day 1 Proshow"
                  className="h-full w-full object-cover"
                />
              </div>
            </CCard>
          </ScrollAnimate>
        </div>

        {/* RIGHT CONTENT COLUMN */}
        <div className="md:col-span-7 flex flex-col gap-6">
          
          {/* TITLE */}
          <ScrollAnimate direction="right">
            <CCard className="bg-transparent">
              <CCardBody
                className="py-0 px-8"
                style={{ animation: "mini-bounce 3s ease-in-out infinite" }}
              >
                <h2 className="
                  text-center
                  text-xl md:text-4xl
                  font-extrabold
                  text-white
                  drop-shadow-[0_0_10px_#ec4899]
                ">
                  DAY 1 - DJ NIGHT
                </h2>
              </CCardBody>
            </CCard>
          </ScrollAnimate>

          {/* FEATURE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
  
  <ScrollAnimate direction="right">
    {/* <div className="transform"> */}
    <CCard
      className="
        bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400
        p-[1.5px]
        rounded-2xl shadow-md
        transform -skew-x-12
        hover:scale-105 transition-all duration-300
      "
    >
      <CCardBody className="py-2 md:py-10 text-center">
        <span className="
          inline-block skew-x-12
          text-sm md:text-lg lg:text-xl
          font-medium text-white
          leading-snug md:leading-normal
        ">
          🎧 Live DJ Sets
          <br />
          Emphasizes the live DJ performance
        </span>
      </CCardBody>
    </CCard>
    {/* </div> */}
  </ScrollAnimate>

  <ScrollAnimate direction="right">
    <CCard
      className="
        bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400
        p-[1.5px]
        rounded-2xl shadow-md
        transform -skew-x-12
        hover:scale-105 transition-all duration-300
      "
    >
      <CCardBody className="py-6 md:py-9 px-3 text-center">
        <span className="
          inline-block skew-x-12
          text-sm md:text-lg lg:text-xl
          font-medium text-white
          leading-snug md:leading-normal
        ">
          🔊 High-Energy Bass
          <br />
          Highlights the music intensity
        </span>
      </CCardBody>
    </CCard>
  </ScrollAnimate>

</div>


          {/* DESCRIPTION */}
          <ScrollAnimate direction="right">
  <CCard className="w-full bg-transparent border border-white/20 rounded-2xl shadow-md">
    <CCardBody className="py-8 px-10 min-h-[50px] md:min-h-[50px]">
      <span className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed">
        An unforgettable night of music, lights, and electrifying energy
        that keeps you dancing till dawn.
      </span>
    </CCardBody>
  </CCard>
</ScrollAnimate>

        </div>
      </div>
    </section>
  );
};

export default ProshowCard;
