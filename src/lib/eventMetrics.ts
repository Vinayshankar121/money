/**
 * Event metrics and analytics utilities.
 * Provides functions for calculating event statistics and aggregations.
 * @module eventMetrics
 */
import type { Event, EventCategory, DateTag, Department } from '@/components/data/events';

export interface RegistrationStats {
  total: number;
  open: number;
  closed: number;
}

/**
 * Calculate registration statistics for events.
 * @param events - Array of events to analyze
 * @returns Registration stats with total, open, and closed counts
 */
export function getRegistrationStats(events: Event[]): RegistrationStats {
  if (!events || events.length === 0) {
    return { total: 0, open: 0, closed: 0 };
  }
  const open = events.filter(event => event.registrationOpen).length;
  const total = events.length;
  return {
    total,
    open,
    closed: Math.max(total - open, 0),
  };
}

export function getCountsByCategory(events: Event[]): Record<Exclude<EventCategory, 'All Events'>, number> {
  const counts = {} as Record<Exclude<EventCategory, 'All Events'>, number>;

  events.forEach(event => {
    event.categories.forEach(category => {
      counts[category] = (counts[category] ?? 0) + 1;
    });
  });

  return counts;
}

export function getCountsByDateTag(events: Event[]): Record<DateTag, number> {
  return events.reduce(
    (acc, event) => {
      acc[event.dateTag] = (acc[event.dateTag] ?? 0) + 1;
      return acc;
    },
    { '6 Mar': 0, '7 Mar': 0 }
  );
}

export function getTopDepartments(events: Event[], limit: number = 3): Array<{ department: Department; count: number }> {
  const counts = new Map<Department, number>();

  events.forEach(event => {
    if (event.department) {
      counts.set(event.department as Department, (counts.get(event.department as Department) ?? 0) + 1);
    }
  });

  return Array.from(counts.entries())
    .map(([department, count]) => ({ department, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getMostCommonCategory(events: Event[]): Exclude<EventCategory, 'All Events'> | null {
  const counts = getCountsByCategory(events);
  let topCategory: Exclude<EventCategory, 'All Events'> | null = null;
  let topCount = 0;

  (Object.keys(counts) as Array<Exclude<EventCategory, 'All Events'>>).forEach(category => {
    const count = counts[category] ?? 0;
    if (count > topCount) {
      topCount = count;
      topCategory = category;
    }
  });

  return topCategory;
}
