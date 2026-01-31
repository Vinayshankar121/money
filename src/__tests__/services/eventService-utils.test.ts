import {
  searchEvents,
  canRegisterForEvent,
  getEventsByCategory,
  getUpcomingEvents,
  getPastEvents,
  getEventStats,
  validateEvent,
  Event,
} from '@/services/eventService';

describe('Event Utility Functions', () => {
  const mockEvents: Event[] = [
    {
      id: '1',
      name: 'React Workshop',
      category: 'Technical Events',
      date: '2026-03-15',
      description: 'Learn React fundamentals',
      registrationOpen: true,
      maxParticipants: 50,
      currentParticipants: 30,
    },
    {
      id: '2',
      name: 'Dance Performance',
      category: 'Cultural Events',
      date: '2026-01-15',
      description: 'Cultural dance show',
      registrationOpen: true,
      maxParticipants: 100,
      currentParticipants: 100,
    },
    {
      id: '3',
      name: 'AI Hackathon',
      category: 'Hackathons',
      date: '2026-04-01',
      venue: 'Tech Hub',
      description: 'Build AI solutions',
      registrationOpen: false,
    },
  ];

  describe('searchEvents', () => {
    it('should search by event name', () => {
      const result = searchEvents(mockEvents, 'React');
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('React Workshop');
    });

    it('should search by description', () => {
      const result = searchEvents(mockEvents, 'fundamentals');
      expect(result.length).toBe(1);
      expect(result[0].description).toContain('fundamentals');
    });

    it('should search by category', () => {
      const result = searchEvents(mockEvents, 'Cultural');
      expect(result.length).toBe(1);
      expect(result[0].category).toBe('Cultural Events');
    });

    it('should search by venue', () => {
      const result = searchEvents(mockEvents, 'Tech Hub');
      expect(result.length).toBe(1);
      expect(result[0].venue).toBe('Tech Hub');
    });

    it('should be case-insensitive', () => {
      const result = searchEvents(mockEvents, 'REACT');
      expect(result.length).toBe(1);
    });

    it('should return all events for empty query', () => {
      const result = searchEvents(mockEvents, '');
      expect(result.length).toBe(3);
    });

    it('should return all events for whitespace query', () => {
      const result = searchEvents(mockEvents, '   ');
      expect(result.length).toBe(3);
    });

    it('should return empty array for no matches', () => {
      const result = searchEvents(mockEvents, 'NonexistentTerm');
      expect(result.length).toBe(0);
    });
  });

  describe('canRegisterForEvent', () => {
    it('should return true for open registration with capacity', () => {
      const event = mockEvents[0];
      expect(canRegisterForEvent(event)).toBe(true);
    });

    it('should return false for closed registration', () => {
      const event = mockEvents[2];
      expect(canRegisterForEvent(event)).toBe(false);
    });

    it('should return false when at capacity', () => {
      const event = mockEvents[1];
      expect(canRegisterForEvent(event)).toBe(false);
    });

    it('should return true when no max participants set', () => {
      const event: Event = {
        ...mockEvents[0],
        maxParticipants: undefined,
        currentParticipants: undefined,
      };
      expect(canRegisterForEvent(event)).toBe(true);
    });

    it('should return true when currentParticipants is undefined', () => {
      const event: Event = {
        ...mockEvents[0],
        maxParticipants: 100,
        currentParticipants: undefined,
      };
      expect(canRegisterForEvent(event)).toBe(true);
    });
  });

  describe('getEventsByCategory', () => {
    it('should return events for specific category', () => {
      const result = getEventsByCategory(mockEvents, 'Technical Events');
      expect(result.length).toBe(1);
      expect(result[0].category).toBe('Technical Events');
    });

    it('should be case-insensitive', () => {
      const result = getEventsByCategory(mockEvents, 'hackathons');
      expect(result.length).toBe(1);
    });

    it('should return all events for "all" category', () => {
      const result = getEventsByCategory(mockEvents, 'all');
      expect(result.length).toBe(3);
    });

    it('should return empty array for non-existent category', () => {
      const result = getEventsByCategory(mockEvents, 'Sports');
      expect(result.length).toBe(0);
    });

    it('should return all events for empty category', () => {
      const result = getEventsByCategory(mockEvents, '');
      expect(result.length).toBe(3);
    });
  });

  describe('getUpcomingEvents', () => {
    it('should return only future events', () => {
      const result = getUpcomingEvents(mockEvents);
      expect(result.length).toBeGreaterThan(0);
      result.forEach(event => {
        const eventDate = new Date(event.date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        expect(eventDate >= now).toBe(true);
      });
    });

    it('should exclude past events', () => {
      const result = getUpcomingEvents(mockEvents);
      const pastEvent = result.find(e => e.date === '2026-01-15');
      expect(pastEvent).toBeUndefined();
    });

    it('should handle empty array', () => {
      const result = getUpcomingEvents([]);
      expect(result.length).toBe(0);
    });
  });

  describe('getPastEvents', () => {
    it('should return only past events', () => {
      const result = getPastEvents(mockEvents);
      result.forEach(event => {
        const eventDate = new Date(event.date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        expect(eventDate < now).toBe(true);
      });
    });

    it('should exclude future events', () => {
      const result = getPastEvents(mockEvents);
      const futureEvent = result.find(e => new Date(e.date) > new Date());
      expect(futureEvent).toBeUndefined();
    });

    it('should handle empty array', () => {
      const result = getPastEvents([]);
      expect(result.length).toBe(0);
    });
  });

  describe('getEventStats', () => {
    it('should calculate total events', () => {
      const stats = getEventStats(mockEvents);
      expect(stats.total).toBe(3);
    });

    it('should count events by category', () => {
      const stats = getEventStats(mockEvents);
      expect(stats.byCategory['Technical Events']).toBe(1);
      expect(stats.byCategory['Cultural Events']).toBe(1);
      expect(stats.byCategory['Hackathons']).toBe(1);
    });

    it('should count open registrations', () => {
      const stats = getEventStats(mockEvents);
      expect(stats.openRegistration).toBe(2);
    });

    it('should calculate total capacity', () => {
      const stats = getEventStats(mockEvents);
      expect(stats.totalCapacity).toBe(150);
    });

    it('should calculate total registered', () => {
      const stats = getEventStats(mockEvents);
      expect(stats.totalRegistered).toBe(130);
    });

    it('should handle events without capacity', () => {
      const events: Event[] = [
        {
          id: '1',
          name: 'Event',
          category: 'Test',
          date: '2026-02-15',
          description: 'Test event',
          registrationOpen: true,
        },
      ];
      const stats = getEventStats(events);
      expect(stats.totalCapacity).toBe(0);
      expect(stats.totalRegistered).toBe(0);
    });

    it('should handle empty array', () => {
      const stats = getEventStats([]);
      expect(stats.total).toBe(0);
      expect(Object.keys(stats.byCategory).length).toBe(0);
    });
  });

  describe('validateEvent', () => {
    it('should validate complete valid event', () => {
      const event: Partial<Event> = {
        name: 'Test Event',
        category: 'Technical Events',
        date: '2026-02-15',
        description: 'This is a test event description',
        maxParticipants: 50,
        currentParticipants: 25,
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject event without name', () => {
      const event: Partial<Event> = {
        category: 'Technical Events',
        date: '2026-02-15',
        description: 'Description here',
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Event name is required');
    });

    it('should reject event without category', () => {
      const event: Partial<Event> = {
        name: 'Test Event',
        date: '2026-02-15',
        description: 'Description here',
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Event category is required');
    });

    it('should reject event without date', () => {
      const event: Partial<Event> = {
        name: 'Test Event',
        category: 'Technical Events',
        description: 'Description here',
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Event date is required');
    });

    it('should reject event with invalid date', () => {
      const event: Partial<Event> = {
        name: 'Test Event',
        category: 'Technical Events',
        date: 'invalid-date',
        description: 'Description here',
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid event date');
    });

    it('should reject event with short description', () => {
      const event: Partial<Event> = {
        name: 'Test Event',
        category: 'Technical Events',
        date: '2026-02-15',
        description: 'Short',
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Event description must be at least 10 characters');
    });

    it('should reject event with invalid max participants', () => {
      const event: Partial<Event> = {
        name: 'Test Event',
        category: 'Technical Events',
        date: '2026-02-15',
        description: 'Valid description here',
        maxParticipants: 0,
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Maximum participants must be at least 1');
    });

    it('should reject event with negative current participants', () => {
      const event: Partial<Event> = {
        name: 'Test Event',
        category: 'Technical Events',
        date: '2026-02-15',
        description: 'Valid description here',
        currentParticipants: -5,
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Current participants cannot be negative');
    });

    it('should reject event where current exceeds max', () => {
      const event: Partial<Event> = {
        name: 'Test Event',
        category: 'Technical Events',
        date: '2026-02-15',
        description: 'Valid description here',
        maxParticipants: 50,
        currentParticipants: 60,
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Current participants cannot exceed maximum');
    });

    it('should return all validation errors for invalid event', () => {
      const event: Partial<Event> = {
        description: 'Short',
      };
      const result = validateEvent(event);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
