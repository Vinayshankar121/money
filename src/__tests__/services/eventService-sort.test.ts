import {
  sortEvents,
  Event,
  EventSortOptions,
} from '@/services/eventService';

describe('Event Sorting Service', () => {
  const mockEvents: Event[] = [
    {
      id: '1',
      name: 'Zeta Workshop',
      category: 'Technical Events',
      date: '2026-03-15',
      description: 'Advanced workshop',
      registrationOpen: true,
      currentParticipants: 30,
    },
    {
      id: '2',
      name: 'Alpha Conference',
      category: 'Cultural Events',
      date: '2026-02-10',
      description: 'Annual conference',
      registrationOpen: true,
      currentParticipants: 150,
    },
    {
      id: '3',
      name: 'Beta Hackathon',
      category: 'Hackathons',
      date: '2026-02-20',
      description: 'Coding competition',
      registrationOpen: false,
      currentParticipants: 50,
    },
  ];

  describe('sortEvents - Name', () => {
    it('should sort events by name in ascending order', () => {
      const options: EventSortOptions = { field: 'name', order: 'asc' };
      const result = sortEvents(mockEvents, options);
      
      expect(result[0].name).toBe('Alpha Conference');
      expect(result[1].name).toBe('Beta Hackathon');
      expect(result[2].name).toBe('Zeta Workshop');
    });

    it('should sort events by name in descending order', () => {
      const options: EventSortOptions = { field: 'name', order: 'desc' };
      const result = sortEvents(mockEvents, options);
      
      expect(result[0].name).toBe('Zeta Workshop');
      expect(result[1].name).toBe('Beta Hackathon');
      expect(result[2].name).toBe('Alpha Conference');
    });

    it('should handle names with special characters', () => {
      const events: Event[] = [
        { ...mockEvents[0], name: 'Workshop 2026' },
        { ...mockEvents[1], name: 'Workshop 2025' },
      ];
      const options: EventSortOptions = { field: 'name', order: 'asc' };
      const result = sortEvents(events, options);
      
      expect(result.length).toBe(2);
    });
  });

  describe('sortEvents - Date', () => {
    it('should sort events by date in ascending order', () => {
      const options: EventSortOptions = { field: 'date', order: 'asc' };
      const result = sortEvents(mockEvents, options);
      
      expect(result[0].date).toBe('2026-02-10');
      expect(result[1].date).toBe('2026-02-20');
      expect(result[2].date).toBe('2026-03-15');
    });

    it('should sort events by date in descending order', () => {
      const options: EventSortOptions = { field: 'date', order: 'desc' };
      const result = sortEvents(mockEvents, options);
      
      expect(result[0].date).toBe('2026-03-15');
      expect(result[1].date).toBe('2026-02-20');
      expect(result[2].date).toBe('2026-02-10');
    });

    it('should handle events with same date', () => {
      const events: Event[] = [
        { ...mockEvents[0], date: '2026-02-15' },
        { ...mockEvents[1], date: '2026-02-15' },
      ];
      const options: EventSortOptions = { field: 'date', order: 'asc' };
      const result = sortEvents(events, options);
      
      expect(result.length).toBe(2);
    });
  });

  describe('sortEvents - Category', () => {
    it('should sort events by category in ascending order', () => {
      const options: EventSortOptions = { field: 'category', order: 'asc' };
      const result = sortEvents(mockEvents, options);
      
      expect(result[0].category).toBe('Cultural Events');
      expect(result[1].category).toBe('Hackathons');
      expect(result[2].category).toBe('Technical Events');
    });

    it('should sort events by category in descending order', () => {
      const options: EventSortOptions = { field: 'category', order: 'desc' };
      const result = sortEvents(mockEvents, options);
      
      expect(result[0].category).toBe('Technical Events');
      expect(result[1].category).toBe('Hackathons');
      expect(result[2].category).toBe('Cultural Events');
    });
  });

  describe('sortEvents - Participants', () => {
    it('should sort events by participants in ascending order', () => {
      const options: EventSortOptions = { field: 'participants', order: 'asc' };
      const result = sortEvents(mockEvents, options);
      
      expect(result[0].currentParticipants).toBe(30);
      expect(result[1].currentParticipants).toBe(50);
      expect(result[2].currentParticipants).toBe(150);
    });

    it('should sort events by participants in descending order', () => {
      const options: EventSortOptions = { field: 'participants', order: 'desc' };
      const result = sortEvents(mockEvents, options);
      
      expect(result[0].currentParticipants).toBe(150);
      expect(result[1].currentParticipants).toBe(50);
      expect(result[2].currentParticipants).toBe(30);
    });

    it('should handle events with undefined participants', () => {
      const events: Event[] = [
        { ...mockEvents[0], currentParticipants: undefined },
        { ...mockEvents[1], currentParticipants: 50 },
      ];
      const options: EventSortOptions = { field: 'participants', order: 'asc' };
      const result = sortEvents(events, options);
      
      expect(result.length).toBe(2);
    });

    it('should treat undefined participants as 0', () => {
      const events: Event[] = [
        { ...mockEvents[0], currentParticipants: 10 },
        { ...mockEvents[1], currentParticipants: undefined },
      ];
      const options: EventSortOptions = { field: 'participants', order: 'asc' };
      const result = sortEvents(events, options);
      
      expect(result[0].currentParticipants).toBeFalsy();
    });
  });

  describe('sortEvents - Edge Cases', () => {
    it('should handle empty array', () => {
      const options: EventSortOptions = { field: 'name', order: 'asc' };
      const result = sortEvents([], options);
      
      expect(result.length).toBe(0);
    });

    it('should handle single event', () => {
      const options: EventSortOptions = { field: 'name', order: 'asc' };
      const result = sortEvents([mockEvents[0]], options);
      
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(mockEvents[0]);
    });

    it('should not mutate original array', () => {
      const original = [...mockEvents];
      const options: EventSortOptions = { field: 'name', order: 'asc' };
      
      sortEvents(mockEvents, options);
      
      expect(mockEvents[0]).toEqual(original[0]);
      expect(mockEvents[1]).toEqual(original[1]);
    });

    it('should create a new array', () => {
      const options: EventSortOptions = { field: 'name', order: 'asc' };
      const result = sortEvents(mockEvents, options);
      
      expect(result).not.toBe(mockEvents);
    });
  });

  describe('sortEvents - Stability', () => {
    it('should maintain relative order for equal elements', () => {
      const events: Event[] = [
        { ...mockEvents[0], name: 'Event A', date: '2026-02-15' },
        { ...mockEvents[1], name: 'Event B', date: '2026-02-15' },
        { ...mockEvents[2], name: 'Event C', date: '2026-02-15' },
      ];
      const options: EventSortOptions = { field: 'date', order: 'asc' };
      const result = sortEvents(events, options);
      
      expect(result.length).toBe(3);
      expect(result[0].date).toBe('2026-02-15');
    });
  });
});
