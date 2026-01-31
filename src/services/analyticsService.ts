/**
 * Analytics Service
 * Tracks and analyzes event and user data
 */

export interface EventAnalytics {
  eventId: string;
  views: number;
  registrations: number;
  uniqueVisitors: number;
  conversionRate: number;
  popularTimes: Map<string, number>;
  deviceTypes: Map<string, number>;
  referralSources: Map<string, number>;
}

export interface UserAnalytics {
  userId: string;
  totalViews: number;
  totalRegistrations: number;
  favoriteCategories: string[];
  lastActivity: Date;
  engagementScore: number;
}

export interface AnalyticsEvent {
  eventType: 'view' | 'click' | 'register' | 'share';
  eventId?: string;
  userId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  referralSource?: string;
}

export class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private eventAnalytics: Map<string, EventAnalytics> = new Map();
  private userAnalytics: Map<string, UserAnalytics> = new Map();

  /**
   * Track an analytics event
   */
  track(event: AnalyticsEvent): void {
    this.events.push(event);
    
    if (event.eventId) {
      this.updateEventAnalytics(event);
    }
    
    this.updateUserAnalytics(event);
  }

  /**
   * Get analytics for a specific event
   */
  getEventAnalytics(eventId: string): EventAnalytics {
    if (!this.eventAnalytics.has(eventId)) {
      return {
        eventId,
        views: 0,
        registrations: 0,
        uniqueVisitors: 0,
        conversionRate: 0,
        popularTimes: new Map(),
        deviceTypes: new Map(),
        referralSources: new Map(),
      };
    }
    
    return this.eventAnalytics.get(eventId)!;
  }

  /**
   * Get analytics for a user
   */
  getUserAnalytics(userId: string): UserAnalytics {
    if (!this.userAnalytics.has(userId)) {
      return {
        userId,
        totalViews: 0,
        totalRegistrations: 0,
        favoriteCategories: [],
        lastActivity: new Date(),
        engagementScore: 0,
      };
    }
    
    return this.userAnalytics.get(userId)!;
  }

  /**
   * Get top events by views
   */
  getTopEventsByViews(limit: number = 10): Array<{ eventId: string; views: number }> {
    return Array.from(this.eventAnalytics.values())
      .map(analytics => ({ eventId: analytics.eventId, views: analytics.views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  /**
   * Get top events by registrations
   */
  getTopEventsByRegistrations(limit: number = 10): Array<{ eventId: string; registrations: number }> {
    return Array.from(this.eventAnalytics.values())
      .map(analytics => ({ eventId: analytics.eventId, registrations: analytics.registrations }))
      .sort((a, b) => b.registrations - a.registrations)
      .slice(0, limit);
  }

  /**
   * Get events with highest conversion rate
   */
  getTopEventsByConversion(limit: number = 10): Array<{ eventId: string; conversionRate: number }> {
    return Array.from(this.eventAnalytics.values())
      .filter(analytics => analytics.views > 0)
      .map(analytics => ({ eventId: analytics.eventId, conversionRate: analytics.conversionRate }))
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, limit);
  }

  /**
   * Get most engaged users
   */
  getTopUsers(limit: number = 10): Array<{ userId: string; engagementScore: number }> {
    return Array.from(this.userAnalytics.values())
      .map(analytics => ({ userId: analytics.userId, engagementScore: analytics.engagementScore }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, limit);
  }

  /**
   * Get analytics for a date range
   */
  getAnalyticsByDateRange(startDate: Date, endDate: Date): {
    totalEvents: number;
    totalViews: number;
    totalRegistrations: number;
    uniqueUsers: number;
  } {
    const filteredEvents = this.events.filter(
      event => event.timestamp >= startDate && event.timestamp <= endDate
    );

    const uniqueUsers = new Set(filteredEvents.map(e => e.userId)).size;
    
    return {
      totalEvents: filteredEvents.length,
      totalViews: filteredEvents.filter(e => e.eventType === 'view').length,
      totalRegistrations: filteredEvents.filter(e => e.eventType === 'register').length,
      uniqueUsers,
    };
  }

  /**
   * Get device breakdown
   */
  getDeviceBreakdown(): Map<string, number> {
    const breakdown = new Map<string, number>();
    
    this.events.forEach(event => {
      if (event.deviceType) {
        breakdown.set(event.deviceType, (breakdown.get(event.deviceType) || 0) + 1);
      }
    });
    
    return breakdown;
  }

  /**
   * Get referral source breakdown
   */
  getReferralBreakdown(): Map<string, number> {
    const breakdown = new Map<string, number>();
    
    this.events.forEach(event => {
      if (event.referralSource) {
        breakdown.set(event.referralSource, (breakdown.get(event.referralSource) || 0) + 1);
      }
    });
    
    return breakdown;
  }

  /**
   * Get hourly activity pattern
   */
  getHourlyActivity(): Map<number, number> {
    const hourly = new Map<number, number>();
    
    for (let hour = 0; hour < 24; hour++) {
      hourly.set(hour, 0);
    }
    
    this.events.forEach(event => {
      const hour = event.timestamp.getHours();
      hourly.set(hour, (hourly.get(hour) || 0) + 1);
    });
    
    return hourly;
  }

  /**
   * Get daily activity pattern
   */
  getDailyActivity(): Map<string, number> {
    const daily = new Map<string, number>();
    
    this.events.forEach(event => {
      const day = event.timestamp.toISOString().split('T')[0];
      daily.set(day, (daily.get(day) || 0) + 1);
    });
    
    return daily;
  }

  /**
   * Calculate engagement score for a user
   */
  private calculateEngagementScore(userId: string): number {
    const userEvents = this.events.filter(e => e.userId === userId);
    
    // Score based on different event types
    const scores = {
      view: 1,
      click: 2,
      register: 10,
      share: 5,
    };
    
    let score = 0;
    userEvents.forEach(event => {
      score += scores[event.eventType] || 0;
    });
    
    // Bonus for recent activity (last 7 days)
    const recentEvents = userEvents.filter(
      event => Date.now() - event.timestamp.getTime() < 7 * 24 * 60 * 60 * 1000
    );
    score += recentEvents.length * 0.5;
    
    return Math.round(score);
  }

  /**
   * Update event analytics
   */
  private updateEventAnalytics(event: AnalyticsEvent): void {
    const eventId = event.eventId!;
    
    if (!this.eventAnalytics.has(eventId)) {
      this.eventAnalytics.set(eventId, {
        eventId,
        views: 0,
        registrations: 0,
        uniqueVisitors: 0,
        conversionRate: 0,
        popularTimes: new Map(),
        deviceTypes: new Map(),
        referralSources: new Map(),
      });
    }
    
    const analytics = this.eventAnalytics.get(eventId)!;
    
    if (event.eventType === 'view') {
      analytics.views++;
      
      // Track popular times
      const hour = event.timestamp.getHours();
      analytics.popularTimes.set(
        hour.toString(),
        (analytics.popularTimes.get(hour.toString()) || 0) + 1
      );
    }
    
    if (event.eventType === 'register') {
      analytics.registrations++;
    }
    
    // Update unique visitors
    const uniqueVisitors = new Set(
      this.events
        .filter(e => e.eventId === eventId && e.eventType === 'view')
        .map(e => e.userId)
    ).size;
    analytics.uniqueVisitors = uniqueVisitors;
    
    // Update conversion rate
    analytics.conversionRate = analytics.views > 0 
      ? (analytics.registrations / analytics.views) * 100 
      : 0;
    
    // Track device types
    if (event.deviceType) {
      analytics.deviceTypes.set(
        event.deviceType,
        (analytics.deviceTypes.get(event.deviceType) || 0) + 1
      );
    }
    
    // Track referral sources
    if (event.referralSource) {
      analytics.referralSources.set(
        event.referralSource,
        (analytics.referralSources.get(event.referralSource) || 0) + 1
      );
    }
  }

  /**
   * Update user analytics
   */
  private updateUserAnalytics(event: AnalyticsEvent): void {
    const userId = event.userId;
    
    if (!this.userAnalytics.has(userId)) {
      this.userAnalytics.set(userId, {
        userId,
        totalViews: 0,
        totalRegistrations: 0,
        favoriteCategories: [],
        lastActivity: event.timestamp,
        engagementScore: 0,
      });
    }
    
    const analytics = this.userAnalytics.get(userId)!;
    
    if (event.eventType === 'view') {
      analytics.totalViews++;
    }
    
    if (event.eventType === 'register') {
      analytics.totalRegistrations++;
    }
    
    analytics.lastActivity = event.timestamp;
    analytics.engagementScore = this.calculateEngagementScore(userId);
    
    // Update favorite categories from metadata
    if (event.metadata?.category) {
      const categories = analytics.favoriteCategories;
      if (!categories.includes(event.metadata.category)) {
        categories.push(event.metadata.category);
      }
    }
  }

  /**
   * Clear all analytics data
   */
  clear(): void {
    this.events = [];
    this.eventAnalytics.clear();
    this.userAnalytics.clear();
  }
}
