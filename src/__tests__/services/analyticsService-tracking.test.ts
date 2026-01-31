/**
 * Analytics Service - Event Tracking Tests
 */

import { AnalyticsService, AnalyticsEvent } from '../../services/analyticsService';

describe('AnalyticsService - Event Tracking', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    service = new AnalyticsService();
  });

  describe('track', () => {
    it('should track a view event', () => {
      const event: AnalyticsEvent = {
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      };
      
      service.track(event);
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.views).toBe(1);
    });

    it('should track multiple view events', () => {
      for (let i = 0; i < 5; i++) {
        service.track({
          eventType: 'view',
          eventId: 'evt1',
          userId: `user${i}`,
          timestamp: new Date(),
        });
      }
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.views).toBe(5);
    });

    it('should track registration events', () => {
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.registrations).toBe(1);
    });

    it('should track click events', () => {
      service.track({
        eventType: 'click',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const userAnalytics = service.getUserAnalytics('user1');
      expect(userAnalytics.engagementScore).toBeGreaterThan(0);
    });

    it('should track share events', () => {
      service.track({
        eventType: 'share',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const userAnalytics = service.getUserAnalytics('user1');
      expect(userAnalytics.engagementScore).toBeGreaterThan(0);
    });

    it('should track device type', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
        deviceType: 'mobile',
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.deviceTypes.get('mobile')).toBe(1);
    });

    it('should track referral source', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
        referralSource: 'google',
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.referralSources.get('google')).toBe(1);
    });

    it('should track events without eventId', () => {
      service.track({
        eventType: 'click',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const userAnalytics = service.getUserAnalytics('user1');
      expect(userAnalytics.engagementScore).toBeGreaterThan(0);
    });
  });

  describe('getEventAnalytics', () => {
    beforeEach(() => {
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
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
    });

    it('should return correct analytics', () => {
      const analytics = service.getEventAnalytics('evt1');
      
      expect(analytics.eventId).toBe('evt1');
      expect(analytics.views).toBe(2);
      expect(analytics.registrations).toBe(1);
      expect(analytics.uniqueVisitors).toBe(2);
    });

    it('should calculate conversion rate', () => {
      const analytics = service.getEventAnalytics('evt1');
      
      expect(analytics.conversionRate).toBe(50); // 1 registration / 2 views * 100
    });

    it('should return empty analytics for non-existent event', () => {
      const analytics = service.getEventAnalytics('evt-non-existent');
      
      expect(analytics.views).toBe(0);
      expect(analytics.registrations).toBe(0);
      expect(analytics.uniqueVisitors).toBe(0);
      expect(analytics.conversionRate).toBe(0);
    });

    it('should track unique visitors correctly', () => {
      // Same user views multiple times
      service.track({
        eventType: 'view',
        eventId: 'evt2',
        userId: 'user1',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'view',
        eventId: 'evt2',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const analytics = service.getEventAnalytics('evt2');
      expect(analytics.views).toBe(2);
      expect(analytics.uniqueVisitors).toBe(1);
    });
  });

  describe('getUserAnalytics', () => {
    beforeEach(() => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
        metadata: { category: 'music' },
      });
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
    });

    it('should return correct user analytics', () => {
      const analytics = service.getUserAnalytics('user1');
      
      expect(analytics.userId).toBe('user1');
      expect(analytics.totalViews).toBe(1);
      expect(analytics.totalRegistrations).toBe(1);
    });

    it('should track favorite categories', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt2',
        userId: 'user1',
        timestamp: new Date(),
        metadata: { category: 'dance' },
      });
      
      const analytics = service.getUserAnalytics('user1');
      expect(analytics.favoriteCategories).toContain('music');
      expect(analytics.favoriteCategories).toContain('dance');
    });

    it('should update last activity', () => {
      const before = new Date();
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
      });
      const after = new Date();
      
      const analytics = service.getUserAnalytics('user2');
      expect(analytics.lastActivity.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(analytics.lastActivity.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('should calculate engagement score', () => {
      const analytics = service.getUserAnalytics('user1');
      
      expect(analytics.engagementScore).toBeGreaterThan(0);
    });

    it('should return empty analytics for new user', () => {
      const analytics = service.getUserAnalytics('user-new');
      
      expect(analytics.totalViews).toBe(0);
      expect(analytics.totalRegistrations).toBe(0);
      expect(analytics.favoriteCategories).toEqual([]);
    });
  });

  describe('popular times tracking', () => {
    it('should track popular hours', () => {
      const morning = new Date();
      morning.setHours(9, 0, 0, 0);
      
      const evening = new Date();
      evening.setHours(18, 0, 0, 0);
      
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: morning,
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: morning,
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user3',
        timestamp: evening,
      });
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.popularTimes.get('9')).toBe(2);
      expect(analytics.popularTimes.get('18')).toBe(1);
    });
  });

  describe('clear', () => {
    it('should clear all analytics data', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      service.clear();
      
      const analytics = service.getEventAnalytics('evt1');
      expect(analytics.views).toBe(0);
    });
  });
});
