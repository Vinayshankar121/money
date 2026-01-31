/**
 * Event filtering and sorting utilities.
 * Provides type-safe filtering by search, category, date, and department.
 * @module eventFilters
 */
import type { DateTag, Department, Event, EventCategory } from '@/components/data/events';
import { normalizeText } from '@/lib/utils';

export type EventSortOption = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';

export interface EventFilterOptions {
  searchQuery?: string;
  activeFilter?: string;
  sortBy?: EventSortOption;
  categories: EventCategory[];
  dateTags: DateTag[];
  departments: Department[];
}

function getDateValue(value: string): number {
  const time = Date.parse(value);
  return Number.isNaN(time) ? 0 : time;
}

export function filterAndSortEvents(
  events: Event[],
  {
    searchQuery = '',
    activeFilter = 'All Events',
    sortBy = 'date-desc',
    categories,
    dateTags,
    departments,
  }: EventFilterOptions
): Event[] {
  let filtered = [...events];
  const validCategories = categories.filter(
    (category): category is Exclude<EventCategory, 'All Events'> => category !== 'All Events'
  );

  if (searchQuery.trim().length > 0) {
    const query = normalizeText(searchQuery);
    filtered = filtered.filter(event => {
      return (
        normalizeText(event.title).includes(query) ||
        normalizeText(event.description).includes(query) ||
        normalizeText(event.venue).includes(query)
      );
    });
  }

  if (activeFilter && activeFilter !== 'All Events') {
    const isCategory = validCategories.includes(activeFilter as Exclude<EventCategory, 'All Events'>);
    const isDate = dateTags.includes(activeFilter as DateTag);
    const isDepartment = departments.includes(activeFilter as Department);

    if (isCategory) {
      filtered = filtered.filter(event =>
        event.categories.includes(activeFilter as Exclude<EventCategory, 'All Events'>)
      );
    } else if (isDate) {
      filtered = filtered.filter(event => event.dateTag === activeFilter);
    } else if (isDepartment) {
      filtered = filtered.filter(event => event.department === activeFilter);
    } else {
      return [];
    }
  }

  switch (sortBy) {
    case 'date-desc':
      filtered.sort((a, b) => getDateValue(b.date) - getDateValue(a.date));
      break;
    case 'date-asc':
      filtered.sort((a, b) => getDateValue(a.date) - getDateValue(b.date));
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return filtered;
}
