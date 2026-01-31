import {
  getCountsByCategory,
  getCountsByDateTag,
  getMostCommonCategory,
  getRegistrationStats,
  getTopDepartments,
} from '@/lib/eventMetrics';
import type { Event } from '@/components/data/events';

describe('eventMetrics', () => {
  const sampleEvents: Event[] = [
    {
      id: '1',
      title: 'Alpha',
      description: 'Tech event',
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
      title: 'Beta',
      description: 'Music event',
      date: '7th March 2026',
      dateTag: '7 Mar',
      time: '12:00',
      venue: 'Hall B',
      categories: ['Music'],
      department: 'ECE',
      image: '/img/2.jpg',
      registrationOpen: false,
    },
    {
      id: '3',
      title: 'Gamma',
      description: 'Tech sprint',
      date: '6th March 2026',
      dateTag: '6 Mar',
      time: '14:00',
      venue: 'Hall C',
      categories: ['Technical Events'],
      department: 'CSE',
      image: '/img/3.jpg',
      registrationOpen: true,
    },
  ];

  it('should compute registration stats', () => {
    const stats = getRegistrationStats(sampleEvents);
    expect(stats.total).toBe(3);
    expect(stats.open).toBe(2);
    expect(stats.closed).toBe(1);
  });

  it('should count events by date tag', () => {
    const counts = getCountsByDateTag(sampleEvents);
    expect(counts['6 Mar']).toBe(2);
    expect(counts['7 Mar']).toBe(1);
  });

  it('should return the most common category', () => {
    const category = getMostCommonCategory(sampleEvents);
    expect(category).toBe('Technical Events');
  });

  it('should return top departments by event count', () => {
    const topDepartments = getTopDepartments(sampleEvents, 1);
    expect(topDepartments).toHaveLength(1);
    expect(topDepartments[0].department).toBe('CSE');
    expect(topDepartments[0].count).toBe(2);
  });

  it('should handle empty events list for categories', () => {
    const counts = getCountsByCategory([]);
    expect(Object.keys(counts)).toHaveLength(0);
  });
});
