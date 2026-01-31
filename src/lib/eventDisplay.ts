/**
 * Event display theme utilities.
 * Provides category-based theming and registration badge helpers.
 * @module eventDisplay
 */
import type { EventCategory } from '@/components/data/events';

export interface CategoryTheme {
  badgeClass: string;
  glowColor: string;
}

const defaultTheme: CategoryTheme = {
  badgeClass: 'text-primary border-primary/50 bg-primary/10',
  glowColor: 'rgba(34,211,238,0.4)',
};

const categoryThemes: Partial<Record<EventCategory, CategoryTheme>> = {
  'Technical Events': {
    badgeClass: 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10',
    glowColor: 'rgba(34,211,238,0.45)',
  },
  'Cultural Events': {
    badgeClass: 'text-fuchsia-300 border-fuchsia-500/40 bg-fuchsia-500/10',
    glowColor: 'rgba(217,70,239,0.45)',
  },
  Sports: {
    badgeClass: 'text-red-300 border-red-500/40 bg-red-500/10',
    glowColor: 'rgba(248,113,113,0.45)',
  },
  Arts: {
    badgeClass: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
    glowColor: 'rgba(251,191,36,0.45)',
  },
  Dance: {
    badgeClass: 'text-violet-300 border-violet-500/40 bg-violet-500/10',
    glowColor: 'rgba(139,92,246,0.45)',
  },
  Music: {
    badgeClass: 'text-indigo-300 border-indigo-500/40 bg-indigo-500/10',
    glowColor: 'rgba(129,140,248,0.45)',
  },
  'Stand up Comedy': {
    badgeClass: 'text-rose-300 border-rose-500/40 bg-rose-500/10',
    glowColor: 'rgba(244,63,94,0.45)',
  },
  'Paper Presentation': {
    badgeClass: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10',
    glowColor: 'rgba(16,185,129,0.45)',
  },
  'Project Expo': {
    badgeClass: 'text-lime-300 border-lime-500/40 bg-lime-500/10',
    glowColor: 'rgba(132,204,22,0.45)',
  },
  'Spotlight Events': {
    badgeClass: 'text-orange-300 border-orange-500/40 bg-orange-500/10',
    glowColor: 'rgba(251,146,60,0.45)',
  },
  'Pitch and Talk': {
    badgeClass: 'text-sky-300 border-sky-500/40 bg-sky-500/10',
    glowColor: 'rgba(56,189,248,0.45)',
  },
  Hackathons: {
    badgeClass: 'text-purple-300 border-purple-500/40 bg-purple-500/10',
    glowColor: 'rgba(168,85,247,0.45)',
  },
};

export function getCategoryTheme(category: EventCategory): CategoryTheme {
  return categoryThemes[category] ?? defaultTheme;
}

export function getRegistrationBadge(registrationOpen: boolean): { label: string; className: string } {
  if (registrationOpen) {
    return {
      label: 'Open',
      className: 'text-emerald-200 border-emerald-500/40 bg-emerald-500/10',
    };
  }

  return {
    label: 'Closed',
    className: 'text-rose-200 border-rose-500/40 bg-rose-500/10',
  };
}
