import { filterAndSortEvents } from '@/lib/eventFilters';
import type { Event, EventCategory, DateTag, Department } from '@/components/data/events';

describe('eventFilters', () => {
  const categories = ['All Events', 'Technical Events', 'Cultural Events'] as EventCategory[];
  const dateTags = ['6 Mar', '7 Mar'] as DateTag[];
  const departments = ['CSE', 'ECE'] as Department[];

  const sampleEvents: Event[] = [
    {
      id: '1',
      title: 'Alpha Hack',
      description: 'Hackathon event',
      date: '6th March 2026',
      dateTag: '6 Mar',
      time: '10:00',
      venue: 'Hall A',
      categories: ['Technical Events'],
      department: 'CSE',
      image: '/img/1.jpg',
      registrationOpen: true,
    },
    {
      id: '2',
      title: 'Beta Beats',
      description: 'Music fest',
      date: '7th March 2026',
      dateTag: '7 Mar',
      time: '14:00',
      venue: 'Auditorium',
      categories: ['Cultural Events'],
      department: 'ECE',
      image: '/img/2.jpg',
      registrationOpen: false,
    },
    {
      id: '3',
      title: 'Gamma Sprint',
      description: 'Coding challenge',
      date: '6th March 2026',
      dateTag: '6 Mar',
      time: '09:00',
      venue: 'Lab 3',
      categories: ['Technical Events'],
      department: 'CSE',
      image: '/img/3.jpg',
      registrationOpen: true,
    },
  ];

  it('should filter by search query', () => {
    const results = filterAndSortEvents(sampleEvents, {
      searchQuery: 'music',
      activeFilter: 'All Events',
      sortBy: 'name-asc',
      categories,
      dateTags,
      departments,
    });

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Beta Beats');
  });

  it('should filter by category', () => {
    const results = filterAndSortEvents(sampleEvents, {
      searchQuery: '',
      activeFilter: 'Technical Events',
      sortBy: 'name-asc',
      categories,
      dateTags,
      departments,
    });

    expect(results).toHaveLength(2);
    expect(results.every(event => event.categories.includes('Technical Events'))).toBe(true);
  });

  it('should return empty list for unknown filters', () => {
    const results = filterAndSortEvents(sampleEvents, {
      searchQuery: '',
      activeFilter: 'Unknown Filter',
      sortBy: 'name-asc',
      categories,
      dateTags,
      departments,
    });

    expect(results).toEqual([]);
  });

  it('should sort by name descending', () => {
    const results = filterAndSortEvents(sampleEvents, {
      searchQuery: '',
      activeFilter: 'All Events',
      sortBy: 'name-desc',
      categories,
      dateTags,
      departments,
    });

    expect(results[0].title).toBe('Gamma Sprint');
    expect(results[2].title).toBe('Alpha Hack');
  });
});
