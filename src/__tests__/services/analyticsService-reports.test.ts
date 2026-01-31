/**
 * Analytics Service - Reporting & Insights Tests
 */

import { AnalyticsService } from '../../services/analyticsService';

describe('AnalyticsService - Reporting & Insights', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    service = new AnalyticsService();
  });

  describe('getTopEventsByViews', () => {
    beforeEach(() => {
      // Event 1: 10 views
      for (let i = 0; i < 10; i++) {
        service.track({
          eventType: 'view',
          eventId: 'evt1',
          userId: `user${i}`,
          timestamp: new Date(),
        });
      }
      
      // Event 2: 5 views
      for (let i = 0; i < 5; i++) {
        service.track({
          eventType: 'view',
          eventId: 'evt2',
          userId: `user${i}`,
          timestamp: new Date(),
        });
      }
      
      // Event 3: 15 views
      for (let i = 0; i < 15; i++) {
        service.track({
          eventType: 'view',
          eventId: 'evt3',
          userId: `user${i}`,
          timestamp: new Date(),
        });
      }
    });

    it('should return events sorted by views', () => {
      const topEvents = service.getTopEventsByViews();
      
      expect(topEvents[0].eventId).toBe('evt3');
      expect(topEvents[0].views).toBe(15);
      expect(topEvents[1].eventId).toBe('evt1');
      expect(topEvents[1].views).toBe(10);
      expect(topEvents[2].eventId).toBe('evt2');
      expect(topEvents[2].views).toBe(5);
    });

    it('should respect limit parameter', () => {
      const topEvents = service.getTopEventsByViews(2);
      
      expect(topEvents).toHaveLength(2);
      expect(topEvents[0].eventId).toBe('evt3');
      expect(topEvents[1].eventId).toBe('evt1');
    });

    it('should handle empty data', () => {
      const emptyService = new AnalyticsService();
      const topEvents = emptyService.getTopEventsByViews();
      
      expect(topEvents).toEqual([]);
    });
  });

  describe('getTopEventsByRegistrations', () => {
    beforeEach(() => {
      // Event 1: 3 registrations
      for (let i = 0; i < 3; i++) {
        service.track({
          eventType: 'register',
          eventId: 'evt1',
          userId: `user${i}`,
          timestamp: new Date(),
        });
      }
      
      // Event 2: 7 registrations
      for (let i = 0; i < 7; i++) {
        service.track({
          eventType: 'register',
          eventId: 'evt2',
          userId: `user${i}`,
          timestamp: new Date(),
        });
      }
    });

    it('should return events sorted by registrations', () => {
      const topEvents = service.getTopEventsByRegistrations();
      
      expect(topEvents[0].eventId).toBe('evt2');
      expect(topEvents[0].registrations).toBe(7);
      expect(topEvents[1].eventId).toBe('evt1');
      expect(topEvents[1].registrations).toBe(3);
    });

    it('should respect limit parameter', () => {
      const topEvents = service.getTopEventsByRegistrations(1);
      
      expect(topEvents).toHaveLength(1);
      expect(topEvents[0].eventId).toBe('evt2');
    });
  });

  describe('getTopEventsByConversion', () => {
    beforeEach(() => {
      // Event 1: 100% conversion (1 view, 1 registration)
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
      
      // Event 2: 50% conversion (2 views, 1 registration)
      service.track({
        eventType: 'view',
        eventId: 'evt2',
        userId: 'user1',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'view',
        eventId: 'evt2',
        userId: 'user2',
        timestamp: new Date(),
      });
      service.track({
        eventType: 'register',
        eventId: 'evt2',
        userId: 'user1',
        timestamp: new Date(),
      });
    });

    it('should return events sorted by conversion rate', () => {
      const topEvents = service.getTopEventsByConversion();
      
      expect(topEvents[0].eventId).toBe('evt1');
      expect(topEvents[0].conversionRate).toBe(100);
      expect(topEvents[1].eventId).toBe('evt2');
      expect(topEvents[1].conversionRate).toBe(50);
    });

    it('should filter out events with no views', () => {
      service.track({
        eventType: 'register',
        eventId: 'evt3',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      const topEvents = service.getTopEventsByConversion();
      expect(topEvents.every(e => e.eventId !== 'evt3')).toBe(true);
    });
  });

  describe('getTopUsers', () => {
    beforeEach(() => {
      // User 1: high engagement (1 view, 1 registration, 1 share)
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
      service.track({
        eventType: 'share',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
      });
      
      // User 2: low engagement (1 view)
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
      });
    });

    it('should return users sorted by engagement score', () => {
      const topUsers = service.getTopUsers();
      
      expect(topUsers[0].userId).toBe('user1');
      expect(topUsers[0].engagementScore).toBeGreaterThan(topUsers[1].engagementScore);
      expect(topUsers[1].userId).toBe('user2');
    });

    it('should respect limit parameter', () => {
      const topUsers = service.getTopUsers(1);
      
      expect(topUsers).toHaveLength(1);
      expect(topUsers[0].userId).toBe('user1');
    });
  });

  describe('getAnalyticsByDateRange', () => {
    beforeEach(() => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Yesterday
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: yesterday,
      });
      
      // Today
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: today,
      });
      service.track({
        eventType: 'register',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: today,
      });
      
      // Tomorrow
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user3',
        timestamp: tomorrow,
      });
    });

    it('should filter by date range correctly', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);
      
      const analytics = service.getAnalyticsByDateRange(today, endOfToday);
      
      expect(analytics.totalEvents).toBeGreaterThanOrEqual(2);
      expect(analytics.totalViews).toBeGreaterThanOrEqual(1);
      expect(analytics.totalRegistrations).toBeGreaterThanOrEqual(1);
    });

    it('should count unique users', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 2);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      
      const analytics = service.getAnalyticsByDateRange(yesterday, tomorrow);
      
      expect(analytics.uniqueUsers).toBeGreaterThanOrEqual(3);
    });

    it('should handle empty date range', () => {
      const farFuture = new Date();
      farFuture.setFullYear(farFuture.getFullYear() + 10);
      const farFuture2 = new Date(farFuture);
      farFuture2.setDate(farFuture2.getDate() + 1);
      
      const analytics = service.getAnalyticsByDateRange(farFuture, farFuture2);
      
      expect(analytics.totalEvents).toBe(0);
      expect(analytics.uniqueUsers).toBe(0);
    });
  });

  describe('getDeviceBreakdown', () => {
    beforeEach(() => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
        deviceType: 'mobile',
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
        deviceType: 'mobile',
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user3',
        timestamp: new Date(),
        deviceType: 'desktop',
      });
    });

    it('should return device breakdown', () => {
      const breakdown = service.getDeviceBreakdown();
      
      expect(breakdown.get('mobile')).toBe(2);
      expect(breakdown.get('desktop')).toBe(1);
    });

    it('should handle events without device type', () => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user4',
        timestamp: new Date(),
      });
      
      const breakdown = service.getDeviceBreakdown();
      expect(breakdown.get('mobile')).toBe(2);
    });
  });

  describe('getReferralBreakdown', () => {
    beforeEach(() => {
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: new Date(),
        referralSource: 'google',
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: new Date(),
        referralSource: 'facebook',
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user3',
        timestamp: new Date(),
        referralSource: 'google',
      });
    });

    it('should return referral breakdown', () => {
      const breakdown = service.getReferralBreakdown();
      
      expect(breakdown.get('google')).toBe(2);
      expect(breakdown.get('facebook')).toBe(1);
    });
  });

  describe('getHourlyActivity', () => {
    it('should return activity for all 24 hours', () => {
      const hourly = service.getHourlyActivity();
      
      expect(hourly.size).toBe(24);
      expect(hourly.get(0)).toBeDefined();
      expect(hourly.get(23)).toBeDefined();
    });

    it('should track activity by hour', () => {
      const timestamp = new Date();
      timestamp.setHours(10, 0, 0, 0);
      
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp,
      });
      
      const hourly = service.getHourlyActivity();
      expect(hourly.get(10)).toBeGreaterThan(0);
    });
  });

  describe('getDailyActivity', () => {
    it('should group activity by day', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: today,
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: yesterday,
      });
      
      const daily = service.getDailyActivity();
      
      expect(daily.size).toBeGreaterThanOrEqual(2);
    });

    it('should count multiple events on same day', () => {
      const today = new Date();
      
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user1',
        timestamp: today,
      });
      service.track({
        eventType: 'view',
        eventId: 'evt1',
        userId: 'user2',
        timestamp: today,
      });
      
      const daily = service.getDailyActivity();
      const todayKey = today.toISOString().split('T')[0];
      
      expect(daily.get(todayKey)).toBeGreaterThanOrEqual(2);
    });
  });
});
