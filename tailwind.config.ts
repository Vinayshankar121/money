import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'fire-orange': 'hsl(var(--fire-orange))',
        'neon-cyan': 'hsl(var(--neon-cyan))',
        'neon-blue': 'hsl(var(--neon-blue))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--neon-cyan) / 0.5), 0 0 40px hsl(var(--neon-cyan) / 0.3)",
          },
          "50%": { 
            boxShadow: "0 0 30px hsl(var(--neon-cyan) / 0.8), 0 0 60px hsl(var(--neon-cyan) / 0.5)",
          },
        },
        "spark-trail": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-100px) scale(0)", opacity: "0" },
        },
        "glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "spark-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.6" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "translateY(-100vh) scale(0)", opacity: "0" },
        },
        "fire-rise": {
          "0%": {
            transform: "translateY(0) translateX(0) scale(1)",
            opacity: "0.6",
          },
          "25%": {
            transform: "translateY(-25vh) translateX(-10px) scale(1.1)",
            opacity: "0.8",
          },
          "50%": {
            transform: "translateY(-50vh) translateX(15px) scale(0.9)",
            opacity: "0.7",
          },
          "75%": {
            transform: "translateY(-75vh) translateX(-5px) scale(1.05)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateY(-100vh) translateX(10px) scale(0.8)",
            opacity: "0",
          },
        },

        /* ⭐ ADDED FOR SHINY TEXT */
        shine: {
          "0%": { backgroundPosition: "100%" },
          "100%": { backgroundPosition: "-100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "spark-trail": "spark-trail 1.5s ease-out infinite",
        "glitch": "glitch 0.3s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "spark-rise": "spark-rise 6s linear infinite",
        "fire-rise": "fire-rise 8s ease-in infinite",

        /* ⭐ ADDED HERE */
        shine: "shine 5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
