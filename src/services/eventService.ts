/**
 * Event Management Service
 * Handles event operations including filtering, searching, sorting, and registration
 */

export interface Event {
  id: string;
  name: string;
  category: string;
  date: string;
  time?: string;
  venue?: string;
  description: string;
  image?: string;
  registrationOpen: boolean;
  maxParticipants?: number;
  currentParticipants?: number;
}

export interface EventFilters {
  category?: string;
  searchQuery?: string;
  dateRange?: { start: Date; end: Date };
  registrationStatus?: 'open' | 'closed' | 'all';
}

export interface EventSortOptions {
  field: 'name' | 'date' | 'category' | 'participants';
  order: 'asc' | 'desc';
}

/**
 * Filter events based on provided criteria
 */
export function filterEvents(events: Event[], filters: EventFilters): Event[] {
  let filtered = [...events];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(event => 
      event.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  // Filter by search query
  if (filters.searchQuery && filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(event =>
      event.name.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query)
    );
  }

  // Filter by date range
  if (filters.dateRange) {
    filtered = filtered.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= filters.dateRange!.start && 
             eventDate <= filters.dateRange!.end;
    });
  }

  // Filter by registration status
  if (filters.registrationStatus && filters.registrationStatus !== 'all') {
    const isOpen = filters.registrationStatus === 'open';
    filtered = filtered.filter(event => event.registrationOpen === isOpen);
  }

  return filtered;
}

/**
 * Sort events based on specified criteria
 */
export function sortEvents(events: Event[], options: EventSortOptions): Event[] {
  const sorted = [...events];
  
  sorted.sort((a, b) => {
    let comparison = 0;

    switch (options.field) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'participants':
        const aCount = a.currentParticipants || 0;
        const bCount = b.currentParticipants || 0;
        comparison = aCount - bCount;
        break;
    }

    return options.order === 'desc' ? -comparison : comparison;
  });

  return sorted;
}

/**
 * Search events by multiple fields
 */
export function searchEvents(events: Event[], query: string): Event[] {
  if (!query || query.trim().length === 0) {
    return events;
  }

  const lowerQuery = query.toLowerCase();
  
  return events.filter(event =>
    event.name.toLowerCase().includes(lowerQuery) ||
    event.description.toLowerCase().includes(lowerQuery) ||
    event.category.toLowerCase().includes(lowerQuery) ||
    (event.venue && event.venue.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Check if event registration is available
 */
export function canRegisterForEvent(event: Event): boolean {
  if (!event.registrationOpen) {
    return false;
  }

  if (event.maxParticipants && event.currentParticipants) {
    return event.currentParticipants < event.maxParticipants;
  }

  return true;
}

/**
 * Get events by category
 */
export function getEventsByCategory(events: Event[], category: string): Event[] {
  if (!category || category === 'all') {
    return events;
  }

  return events.filter(event => 
    event.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get upcoming events (future dates only)
 */
export function getUpcomingEvents(events: Event[]): Event[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= now;
  });
}

/**
 * Get past events
 */
export function getPastEvents(events: Event[]): Event[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < now;
  });
}

/**
 * Get event statistics
 */
export function getEventStats(events: Event[]): {
  total: number;
  byCategory: Record<string, number>;
  openRegistration: number;
  totalCapacity: number;
  totalRegistered: number;
} {
  const stats = {
    total: events.length,
    byCategory: {} as Record<string, number>,
    openRegistration: 0,
    totalCapacity: 0,
    totalRegistered: 0,
  };

  events.forEach(event => {
    // Count by category
    stats.byCategory[event.category] = (stats.byCategory[event.category] || 0) + 1;

    // Count open registrations
    if (event.registrationOpen) {
      stats.openRegistration++;
    }

    // Sum capacity and registrations
    if (event.maxParticipants) {
      stats.totalCapacity += event.maxParticipants;
    }
    if (event.currentParticipants) {
      stats.totalRegistered += event.currentParticipants;
    }
  });

  return stats;
}

/**
 * Validate event data
 */
export function validateEvent(event: Partial<Event>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!event.name || event.name.trim().length === 0) {
    errors.push('Event name is required');
  }

  if (!event.category || event.category.trim().length === 0) {
    errors.push('Event category is required');
  }

  if (!event.date) {
    errors.push('Event date is required');
  } else {
    const eventDate = new Date(event.date);
    if (isNaN(eventDate.getTime())) {
      errors.push('Invalid event date');
    }
  }

  if (!event.description || event.description.trim().length < 10) {
    errors.push('Event description must be at least 10 characters');
  }

  if (event.maxParticipants !== undefined && event.maxParticipants < 1) {
    errors.push('Maximum participants must be at least 1');
  }

  if (event.currentParticipants !== undefined && event.currentParticipants < 0) {
    errors.push('Current participants cannot be negative');
  }

  if (event.maxParticipants && event.currentParticipants) {
    if (event.currentParticipants > event.maxParticipants) {
      errors.push('Current participants cannot exceed maximum');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
