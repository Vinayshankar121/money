/**
 * Analytics Service - Engagement & Scoring Tests
 */

import { AnalyticsService } from '../../services/analyticsService';

describe('AnalyticsService - Engagement & Scoring', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    service = new AnalyticsService();
  });

  describe('engagement score calculation', () => {
    it('should calculate score for views', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getUserAnalytics('user1');
      expect(analytics.engagementScore).toBeGreaterThan(0);
    });

    it('should give higher score for registrations', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      const viewScore = service.getUserAnalytics('user1').engagementScore;
      
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      const registerScore = service.getUserAnalytics('user1').engagementScore;
      
      expect(registerScore).toBeGreaterThan(viewScore);
    });

    it('should give higher score for shares than views', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      const viewScore = service.getUserAnalytics('user1').engagementScore;
      
      service.track({
        eventType: 'share',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
      });
      const shareScore = service.getUserAnalytics('user2').engagementScore;
      
      expect(shareScore).toBeGreaterThan(viewScore);
    });

    it('should accumulate score from multiple events', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'click',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getUserAnalytics('user1');
      expect(analytics.engagementScore).toBeGreaterThan(10);
    });

    it('should give bonus for recent activity', () => {
      // Old activity (8 days ago)
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 8);
      
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: oldDate,
      });
      const oldScore = service.getUserAnalytics('user1').engagementScore;
      
      // Recent activity (today)
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
      });
      const recentScore = service.getUserAnalytics('user2').engagementScore;
      
      expect(recentScore).toBeGreaterThan(oldScore);
    });
  });

  describe('conversion tracking', () => {
    it('should calculate conversion rate correctly', () => {
      // 10 views, 2 registrations = 20% conversion
      for (let i = 0; i < 10; i++) {
        service.track({
          eventType: 'view',
          eventId: 'evt1',
          userId: `user${i}`,
          timestamp: new Date(),
        });
      }
      
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.conversionRate).toBe(20);
    });

    it('should handle 0% conversion', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.conversionRate).toBe(0);
    });

    it('should handle 100% conversion', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.conversionRate).toBe(100);
    });

    it('should handle conversion > 100% (registration without view)', () => {
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.conversionRate).toBe(0); // No views, so 0%
    });

    it('should update conversion rate dynamically', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
      });
      
      let analytics = service.getEventAnalytics('evt1');
      expect(analytics.conversionRate).toBe(0);
      
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      analytics = service.getEventAnalytics('evt1');
      expect(analytics.conversionRate).toBe(50);
    });
  });

  describe('unique visitor tracking', () => {
    it('should track unique visitors', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.uniqueVisitors).toBe(2);
    });

    it('should not count non-view events as visitors', () => {
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.uniqueVisitors).toBe(0);
    });

    it('should update unique visitors across multiple events', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      let analytics = service.getEventAnalytics('evt1');
      expect(analytics.uniqueVisitors).toBe(1);
      
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
      });
      
      analytics = service.getEventAnalytics('evt1');
      expect(analytics.uniqueVisitors).toBe(2);
    });
  });

  describe('category preferences', () => {
    it('should track favorite categories', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
        metadata: { category: 'music' },
      });
      
      const analytics = service.getUserAnalytics('user1');
      expect(analytics.favoriteCategories).toContain('music');
    });

    it('should not duplicate categories', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
        metadata: { category: 'music' },
      });
      service.track({
        eventType: 'view',
        eventId: 'evt2',
        userId: 'user1',
        timestamp: new Date(),
        metadata: { category: 'music' },
      });
      
      const analytics = service.getUserAnalytics('user1');
      const musicCount = analytics.favoriteCategories.filter(c => c === 'music').length;
      expect(musicCount).toBe(1);
    });

    it('should track multiple categories', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
        metadata: { category: 'music' },
      });
      service.track({
        eventType: 'view',
        eventId: 'evt2',
        userId: 'user1',
        timestamp: new Date(),
        metadata: { category: 'dance' },
      });
      service.track({
        eventType: 'view',
        eventId: 'evt3',
        userId: 'user1',
        timestamp: new Date(),
        metadata: { category: 'tech' },
      });
      
      const analytics = service.getUserAnalytics('user1');
      expect(analytics.favoriteCategories).toHaveLength(3);
      expect(analytics.favoriteCategories).toContain('music');
      expect(analytics.favoriteCategories).toContain('dance');
      expect(analytics.favoriteCategories).toContain('tech');
    });

    it('should handle events without category metadata', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getUserAnalytics('user1');
      expect(analytics.favoriteCategories).toEqual([]);
    });
  });

  describe('activity timestamps', () => {
    it('should update last activity on each event', () => {
      const first = new Date();
      first.setHours(first.getHours() - 2);
      
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: first,
      });
      
      const later = new Date();
      service.track({
        eventType: 'view',
        eventId: 'evt2',
        userId: 'user1',
        timestamp: later,
      });
      
      const analytics = service.getUserAnalytics('user1');
      expect(analytics.lastActivity.getTime()).toBeGreaterThan(first.getTime());
    });

    it('should track most recent activity', () => {
      const times = [
        new Date('2024-01-01'),
        new Date('2024-01-02'),
        new Date('2024-01-03'),
      ];
      
      times.forEach(time => {
        service.track({
          eventType: 'view',
          eventId: 'evt1',
          userId: 'user1',
          timestamp: time,
        });
      });
      
      const analytics = service.getUserAnalytics('user1');
      expect(analytics.lastActivity.toISOString()).toBe(times[2].toISOString());
    });
  });

  describe('edge cases', () => {
    it('should handle events with no metadata', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics).toBeDefined();
    });

    it('should handle very high engagement users', () => {
      for (let i = 0; i < 100; i++) {
        service.track({
          eventType: 'register',
          eventId: `evt${i}`,
          userId: 'user1',
          timestamp: new Date(),
        });
      }
      
      const analytics = service.getUserAnalytics('user1');
      expect(analytics.engagementScore).toBeGreaterThan(1000);
      expect(analytics.totalRegistrations).toBe(100);
    });

    it('should handle concurrent tracking', () => {
      const timestamp = new Date();
      
      for (let i = 0; i < 50; i++) {
        service.track({
          eventType: 'view',
          eventId: 'evt1',
          userId: `user${i}`,
          timestamp,
        });
      }
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.views).toBe(50);
      expect(analytics.uniqueVisitors).toBe(50);
    });
  });
});
