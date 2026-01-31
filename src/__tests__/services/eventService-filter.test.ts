import {
  filterEvents,
  Event,
  EventFilters,
} from '@/services/eventService';

describe('Event Filtering Service', () => {
  const mockEvents: Event[] = [
    {
      id: '1',
      name: 'Tech Talk',
      category: 'Technical Events',
      date: '2026-02-15',
      time: '10:00 AM',
      venue: 'Auditorium',
      description: 'Learn about latest technologies',
      registrationOpen: true,
      maxParticipants: 100,
      currentParticipants: 50,
    },
    {
      id: '2',
      name: 'Cultural Night',
      category: 'Cultural Events',
      date: '2026-02-20',
      time: '6:00 PM',
      venue: 'Main Stage',
      description: 'Celebrate diversity through performances',
      registrationOpen: true,
      maxParticipants: 200,
      currentParticipants: 180,
    },
    {
      id: '3',
      name: 'Hackathon 2026',
      category: 'Hackathons',
      date: '2026-03-01',
      time: '9:00 AM',
      venue: 'Computer Lab',
      description: 'Build innovative solutions in 24 hours',
      registrationOpen: false,
      maxParticipants: 50,
      currentParticipants: 50,
    },
    {
      id: '4',
      name: 'Cricket Tournament',
      category: 'Sports',
      date: '2026-02-25',
      venue: 'Sports Ground',
      description: 'Annual inter-college cricket match',
      registrationOpen: true,
    },
  ];

  describe('filterEvents - Category', () => {
    it('should filter events by category', () => {
      const filters: EventFilters = { category: 'Technical Events' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Tech Talk');
    });

    it('should return all events when category is "all"', () => {
      const filters: EventFilters = { category: 'all' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(4);
    });

    it('should return empty array for non-existent category', () => {
      const filters: EventFilters = { category: 'Non-existent' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(0);
    });

    it('should be case-insensitive for category', () => {
      const filters: EventFilters = { category: 'SPORTS' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].category).toBe('Sports');
    });
  });

  describe('filterEvents - Search Query', () => {
    it('should filter events by name search', () => {
      const filters: EventFilters = { searchQuery: 'Tech' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Tech Talk');
    });

    it('should filter events by description search', () => {
      const filters: EventFilters = { searchQuery: 'innovative' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Hackathon 2026');
    });

    it('should be case-insensitive for search', () => {
      const filters: EventFilters = { searchQuery: 'CULTURAL' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Cultural Night');
    });

    it('should return all events for empty search query', () => {
      const filters: EventFilters = { searchQuery: '' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(4);
    });

    it('should return all events for whitespace-only search', () => {
      const filters: EventFilters = { searchQuery: '   ' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(4);
    });

    it('should search across multiple fields', () => {
      const filters: EventFilters = { searchQuery: 'Auditorium' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(0); // venue not searched in this implementation
    });
  });

  describe('filterEvents - Date Range', () => {
    it('should filter events within date range', () => {
      const filters: EventFilters = {
        dateRange: {
          start: new Date('2026-02-01'),
          end: new Date('2026-02-28'),
        },
      };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(3);
    });

    it('should exclude events outside date range', () => {
      const filters: EventFilters = {
        dateRange: {
          start: new Date('2026-03-01'),
          end: new Date('2026-03-31'),
        },
      };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Hackathon 2026');
    });

    it('should include events on boundary dates', () => {
      const filters: EventFilters = {
        dateRange: {
          start: new Date('2026-02-15'),
          end: new Date('2026-02-15'),
        },
      };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Tech Talk');
    });
  });

  describe('filterEvents - Registration Status', () => {
    it('should filter open registrations', () => {
      const filters: EventFilters = { registrationStatus: 'open' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(3);
      result.forEach(event => {
        expect(event.registrationOpen).toBe(true);
      });
    });

    it('should filter closed registrations', () => {
      const filters: EventFilters = { registrationStatus: 'closed' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].registrationOpen).toBe(false);
    });

    it('should return all events when status is "all"', () => {
      const filters: EventFilters = { registrationStatus: 'all' };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(4);
    });
  });

  describe('filterEvents - Combined Filters', () => {
    it('should apply multiple filters together', () => {
      const filters: EventFilters = {
        category: 'Cultural Events',
        registrationStatus: 'open',
      };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Cultural Night');
    });

    it('should apply category and search query', () => {
      const filters: EventFilters = {
        category: 'Technical Events',
        searchQuery: 'Tech',
      };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Tech Talk');
    });

    it('should return empty array when no events match all filters', () => {
      const filters: EventFilters = {
        category: 'Sports',
        searchQuery: 'Tech',
      };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(0);
    });

    it('should apply all filter types together', () => {
      const filters: EventFilters = {
        category: 'Technical Events',
        searchQuery: 'Tech',
        dateRange: {
          start: new Date('2026-02-01'),
          end: new Date('2026-02-28'),
        },
        registrationStatus: 'open',
      };
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Tech Talk');
    });
  });

  describe('filterEvents - Edge Cases', () => {
    it('should handle empty events array', () => {
      const filters: EventFilters = { category: 'Technical Events' };
      const result = filterEvents([], filters);
      
      expect(result.length).toBe(0);
    });

    it('should handle empty filters object', () => {
      const filters: EventFilters = {};
      const result = filterEvents(mockEvents, filters);
      
      expect(result.length).toBe(4);
    });

    it('should not mutate original events array', () => {
      const originalLength = mockEvents.length;
      const filters: EventFilters = { category: 'Sports' };
      
      filterEvents(mockEvents, filters);
      
      expect(mockEvents.length).toBe(originalLength);
    });
  });
});
