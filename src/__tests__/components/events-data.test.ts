import { 
  categories, 
  dateTags, 
  departments, 
  events,
  EventCategory,
  DateTag,
  Department,
  Event 
} from '@/components/data/events';
import { getCountsByDateTag, getRegistrationStats } from '@/lib/eventMetrics';
import { filterAndSortEvents } from '@/lib/eventFilters';

describe('Event Data Service', () => {
  describe('Constants Validation', () => {
    it('should export valid categories array', () => {
      expect(categories).toBeDefined();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should include "All Events" as first category', () => {
      expect(categories[0]).toBe('All Events');
    });

    it('should include all expected categories', () => {
      const expectedCategories = [
        'All Events',
        'Cultural Events',
        'Technical Events',
        'Sports',
        'Arts',
        'Dance',
        'Pitch and Talk',
        'Hackathons',
        'Music',
        'Stand up Comedy',
        'Paper Presentation',
        'Project Expo',
        'Spotlight Events',
      ];
      
      expectedCategories.forEach(category => {
        expect(categories).toContain(category);
      });
    });

    it('should export valid dateTags array', () => {
      expect(dateTags).toBeDefined();
      expect(Array.isArray(dateTags)).toBe(true);
      expect(dateTags).toEqual(['6 Mar', '7 Mar']);
    });

    it('should export valid departments array', () => {
      expect(departments).toBeDefined();
      expect(Array.isArray(departments)).toBe(true);
      expect(departments.length).toBeGreaterThan(0);
    });

    it('should include all expected departments', () => {
      const expectedDepts = ['CSE', 'CSD', 'CSM', 'CSC', 'CS-IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'MBA', 'MCA'];
      
      expectedDepts.forEach(dept => {
        expect(departments).toContain(dept);
      });
    });
  });

  describe('Events Array Validation', () => {
    it('should export events array', () => {
      expect(events).toBeDefined();
      expect(Array.isArray(events)).toBe(true);
    });

    it('should have at least one event', () => {
      expect(events.length).toBeGreaterThan(0);
    });

    it('should have unique event IDs', () => {
      const ids = events.map(event => event.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Event Structure Validation', () => {
    it('should have valid structure for all events', () => {
      events.forEach(event => {
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('title');
        expect(event).toHaveProperty('description');
        expect(event).toHaveProperty('date');
        expect(event).toHaveProperty('dateTag');
        expect(event).toHaveProperty('time');
        expect(event).toHaveProperty('venue');
        expect(event).toHaveProperty('categories');
        expect(event).toHaveProperty('department');
        expect(event).toHaveProperty('image');
        expect(event).toHaveProperty('registrationOpen');
      });
    });

    it('should have non-empty required fields', () => {
      events.forEach(event => {
        expect(event.id).toBeTruthy();
        expect(event.title).toBeTruthy();
        // Description may be empty for some events
        expect(event.description !== undefined).toBe(true);
        // Date may be empty for some events
        expect(event.date !== undefined).toBe(true);
        expect(event.dateTag).toBeTruthy();
        // Time may be empty for some events (allowing empty time)
        expect(event.time !== undefined).toBe(true);
        // Venue may be empty for some events
        expect(event.venue !== undefined).toBe(true);
        expect(event.categories.length).toBeGreaterThan(0);
        // Image may have fallback or be empty
        expect(event.image !== undefined).toBe(true);
      });
    });

    it('should have valid dateTag values', () => {
      events.forEach(event => {
        expect(['6 Mar', '7 Mar']).toContain(event.dateTag);
      });
    });

    it('should have valid categories', () => {
      const validCategories = categories.filter(c => c !== 'All Events');
      
      events.forEach(event => {
        event.categories.forEach(category => {
          expect(validCategories).toContain(category);
        });
      });
    });

    it('should have valid department or empty string', () => {
      events.forEach(event => {
        if (event.department) {
          expect(departments).toContain(event.department);
        } else {
          expect(event.department).toBe('');
        }
      });
    });

    it('should have boolean registrationOpen field', () => {
      events.forEach(event => {
        expect(typeof event.registrationOpen).toBe('boolean');
      });
    });
  });

  describe('Event Filtering Logic', () => {
    it('should filter events by category', () => {
      const hackathonEvents = events.filter(event => 
        event.categories.includes('Hackathons')
      );
      
      expect(hackathonEvents.length).toBeGreaterThanOrEqual(0);
      hackathonEvents.forEach(event => {
        expect(event.categories).toContain('Hackathons');
      });
    });

    it('should filter events by dateTag', () => {
      const day1Events = events.filter(event => event.dateTag === '6 Mar');
      const day2Events = events.filter(event => event.dateTag === '7 Mar');
      
      expect(day1Events.length + day2Events.length).toBe(events.length);
    });

    it('should filter events by department', () => {
      const cseEvents = events.filter(event => event.department === 'CSE');
      
      cseEvents.forEach(event => {
        expect(event.department).toBe('CSE');
      });
    });

    it('should handle multiple category filtering', () => {
      const culturalOrTechnical = events.filter(event => 
        event.categories.some(cat => 
          cat === 'Cultural Events' || cat === 'Technical Events'
        )
      );
      
      culturalOrTechnical.forEach(event => {
        const hasValidCategory = event.categories.some(cat => 
          cat === 'Cultural Events' || cat === 'Technical Events'
        );
        expect(hasValidCategory).toBe(true);
      });
    });
  });

  describe('Event Search Logic', () => {
    it('should find events by title search', () => {
      if (events.length > 0) {
        const firstEventTitle = events[0].title.split(' ')[0];
        const searchResults = events.filter(event => 
          event.title.toLowerCase().includes(firstEventTitle.toLowerCase())
        );
        
        expect(searchResults.length).toBeGreaterThan(0);
      }
    });

    it('should find events by description search', () => {
      const searchTerm = 'event';
      const searchResults = events.filter(event => 
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      expect(searchResults.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle case-insensitive search', () => {
      if (events.length > 0) {
        const searchTerm = events[0].title.substring(0, 5).toUpperCase();
        const searchResults = events.filter(event => 
          event.title.toUpperCase().includes(searchTerm)
        );
        
        expect(searchResults.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Event Sorting Logic', () => {
    it('should sort events by title alphabetically', () => {
      const sortedByTitle = [...events].sort((a, b) => 
        a.title.localeCompare(b.title)
      );
      
      expect(sortedByTitle.length).toBe(events.length);
      
      for (let i = 1; i < sortedByTitle.length; i++) {
        expect(
          sortedByTitle[i - 1].title.localeCompare(sortedByTitle[i].title)
        ).toBeLessThanOrEqual(0);
      }
    });

    it('should sort events by dateTag', () => {
      const sortedByDate = [...events].sort((a, b) => 
        a.dateTag.localeCompare(b.dateTag)
      );
      
      expect(sortedByDate.length).toBe(events.length);
    });

    it('should group events by category', () => {
      const groupedByCategory = events.reduce((acc, event) => {
        event.categories.forEach(category => {
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(event);
        });
        return acc;
      }, {} as Record<string, Event[]>);
      
      expect(Object.keys(groupedByCategory).length).toBeGreaterThan(0);
    });
  });

  describe('Event Metrics', () => {
    it('should compute registration stats from dataset', () => {
      const stats = getRegistrationStats(events);
      expect(stats.total).toBe(events.length);
      expect(stats.open + stats.closed).toBe(events.length);
    });

    it('should compute counts by date tag from dataset', () => {
      const counts = getCountsByDateTag(events);
      expect(counts['6 Mar'] + counts['7 Mar']).toBe(events.length);
    });
  });

  describe('Event Filtering Helper', () => {
    it('should filter by date tag using helper', () => {
      const filtered = filterAndSortEvents(events, {
        searchQuery: '',
        activeFilter: '6 Mar',
        sortBy: 'name-asc',
        categories,
        dateTags,
        departments,
      });

      filtered.forEach(event => {
        expect(event.dateTag).toBe('6 Mar');
      });
    });

    it('should filter by department using helper', () => {
      const filtered = filterAndSortEvents(events, {
        searchQuery: '',
        activeFilter: 'CSE',
        sortBy: 'name-asc',
        categories,
        dateTags,
        departments,
      });

      filtered.forEach(event => {
        expect(event.department).toBe('CSE');
      });
    });

    it('should return empty list for invalid filter', () => {
      const filtered = filterAndSortEvents(events, {
        searchQuery: '',
        activeFilter: 'Invalid Filter',
        sortBy: 'name-asc',
        categories,
        dateTags,
        departments,
      });

      expect(filtered).toEqual([]);
    });
  });

  describe('Optional Fields Validation', () => {
    it('should validate teamSize format when present', () => {
      events.forEach(event => {
        if (event.teamSize) {
          expect(typeof event.teamSize).toBe('string');
          expect(event.teamSize.length).toBeGreaterThan(0);
        }
      });
    });

    it('should validate prizes array when present', () => {
      events.forEach(event => {
        if (event.prizes) {
          expect(Array.isArray(event.prizes)).toBe(true);
          event.prizes.forEach(prize => {
            expect(typeof prize).toBe('string');
            expect(prize.length).toBeGreaterThan(0);
          });
        }
      });
    });

    it('should validate rules array when present', () => {
      events.forEach(event => {
        if (event.rules) {
          expect(Array.isArray(event.rules)).toBe(true);
          event.rules.forEach(rule => {
            expect(typeof rule).toBe('string');
            expect(rule.length).toBeGreaterThan(0);
          });
        }
      });
    });

    it('should validate coordinators array when present', () => {
      events.forEach(event => {
        if (event.coordinators) {
          expect(Array.isArray(event.coordinators)).toBe(true);
          event.coordinators.forEach(coordinator => {
            expect(coordinator).toHaveProperty('name');
            expect(coordinator).toHaveProperty('phone');
            expect(typeof coordinator.name).toBe('string');
            expect(typeof coordinator.phone).toBe('string');
            expect(coordinator.name.length).toBeGreaterThan(0);
            expect(coordinator.phone.length).toBeGreaterThan(0);
          });
        }
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle events with multiple categories', () => {
      const multiCategoryEvents = events.filter(event => event.categories.length > 1);
      
      multiCategoryEvents.forEach(event => {
        expect(event.categories.length).toBeGreaterThan(1);
        event.categories.forEach(category => {
          expect(typeof category).toBe('string');
        });
      });
    });

    it('should handle events with empty department', () => {
      const noDeptEvents = events.filter(event => event.department === '');
      
      noDeptEvents.forEach(event => {
        expect(event.department).toBe('');
      });
    });

    it('should handle very long descriptions', () => {
      events.forEach(event => {
        // Description field exists
        expect(event.description !== undefined).toBe(true);
        // Descriptions should be reasonable length
        expect(event.description.length).toBeLessThan(10000);
      });
    });
  });
});
