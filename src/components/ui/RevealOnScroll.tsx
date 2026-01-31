import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface RevealOnScrollProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
}

export const RevealOnScroll = ({ children, width = "fit-content" }: RevealOnScrollProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-75px" }); // Trigger when 75px into view
    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
            slideControls.start("visible");
        }
    }, [isInView, mainControls, slideControls]);

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1, delay: 0.5 }}
            >
                {children}
            </motion.div>
            {/* Sci-Fi Slide Effect - Gamified Reveal */}
            <motion.div
                variants={{
                    hidden: { left: 0 },
                    visible: { left: "100%" },
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: 0.5, ease: "easeIn" }}
                style={{
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    background: "hsl(var(--primary))", // Orange slide reveal
                    zIndex: 20,
                }}
            />
        </div>
    );
};
