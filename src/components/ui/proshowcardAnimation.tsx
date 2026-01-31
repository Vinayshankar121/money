import React, { useEffect, useRef, useState } from "react";

interface ScrollAnimateProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  className = "",
  direction = "left",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const hiddenTransform =
    direction === "left" ? "-translate-x-20" : "translate-x-20";

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${hiddenTransform}`}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ScrollAnimate;
