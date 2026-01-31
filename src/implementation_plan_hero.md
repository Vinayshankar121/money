# Hero Section Revamp Plan

## Goal
Transform the static Hero section into a high-energy, gamified, and professional experience using Framer Motion and modern sci-fi aesthetics.

## Design Concept
- **Theme**: "Cyber-Warzone" / "Digital Battlefield". dark mode, neon accents (Cyan & Orange).
- **Vibe**: Tech-heavy, glitchy, energetic, but clean.
- **HUD Interface**: Add corner brackets, scanning lines, and technical data readouts.

## Proposed Changes

### 1. Structure & Layout
- **Container**: `relative h-screen flex items-center justify-center overflow-hidden`
- **Background**:
    - Parallax scrolling image (framer motion `useScroll`).
    - Radial gradient overlay to focus attention.
    - Grid overlay (already in `Events.tsx`, reuse here).
- **Foreground**:
    - **HUD Layer**: Fixed positional elements (top-left, bottom-right corners) showing "System Status", "Coordinates", etc.
    - **Glitch Title**: "SPARK" with a glitch animation effect.
    - **Interactive Buttons**: Buttons that scale/glow on hover with sound effect visual triggers.

### 2. Animations (Framer Motion)
- **Entrance**: Staggered fade-up for text elements.
- **Float**: Subtle hovering for the main title.
- **Mouse Parallax**: Background moves slightly opposite to mouse cursor.

### 3. Components to Add/Modify
- `Hero.tsx`: Complete rewrite.

## Detailed Steps
1.  **Refactor `Hero.tsx`**:
    - Import `motion` from `framer-motion`.
    - Implement `GlitchText` component (sub-component or inline).
    - Add `HUD` decorative elements (SVGs).
    - Re-style Title to be massive, maybe transparent with stroke (`text-transparent bg-clip-text bg-gradient...`).

2.  **Styling**:
    - Use `font-orbitron` for headers (Sci-Fi look).
    - Use `font-exo` for body text.
    - Add "scanline" CSS effect.

## New Hero.tsx Structure
```tsx
<div className="relative h-screen w-full overflow-hidden bg-black">
  <BackgroundParallax />
  <GridOverlay />
  <HUDOverlay /> // Corners, tech lines
  <MainContent>
    <GlitchTitle text="SPARK" />
    <SubTitle text="2026" />
    <GamifiedStats /> // "300+ Players | 50+ Events"
    <ActionButtons />
  </MainContent>
</div>
```
