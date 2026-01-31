/**
 * Registration Service - Capacity Management Tests
 */

import { RegistrationService } from '../../services/registrationService';

describe('RegistrationService - Capacity Management', () => {
  let service: RegistrationService;

  beforeEach(() => {
    service = new RegistrationService();
  });

  describe('setEventCapacity', () => {
    it('should set capacity for an event', () => {
      service.setEventCapacity('evt1', 10);
      
      // Fill up to capacity
      for (let i = 0; i < 10; i++) {
        const result = service.register({
          eventId: 'evt1',
          userName: `User ${i}`,
          userEmail: `user${i}@example.com`,
          userPhone: '9876543210',
        });
        expect(result.registration?.status).toBe('confirmed');
      }
      
      expect(service.getEventRegistrationCount('evt1')).toBe(10);
    });

    it('should put registrations on waitlist when capacity reached', () => {
      service.setEventCapacity('evt1', 2);
      
      service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 2',
        userEmail: 'user2@example.com',
        userPhone: '9876543211',
      });
      
      const result3 = service.register({
        eventId: 'evt1',
        userName: 'User 3',
        userEmail: 'user3@example.com',
        userPhone: '9876543212',
      });
      
      expect(result3.registration?.status).toBe('waitlist');
    });

    it('should allow unlimited registrations when no capacity set', () => {
      for (let i = 0; i < 100; i++) {
        const result = service.register({
          eventId: 'evt1',
          userName: `User ${i}`,
          userEmail: `user${i}@example.com`,
          userPhone: '9876543210',
        });
        expect(result.registration?.status).toBe('confirmed');
      }
    });
  });

  describe('getEventRegistrationCount', () => {
    it('should return correct count', () => {
      expect(service.getEventRegistrationCount('evt1')).toBe(0);
      
      service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      
      expect(service.getEventRegistrationCount('evt1')).toBe(1);
      
      service.register({
        eventId: 'evt1',
        userName: 'User 2',
        userEmail: 'user2@example.com',
        userPhone: '9876543211',
      });
      
      expect(service.getEventRegistrationCount('evt1')).toBe(2);
    });

    it('should not count cancelled registrations', () => {
      const result1 = service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 2',
        userEmail: 'user2@example.com',
        userPhone: '9876543211',
      });
      
      expect(service.getEventRegistrationCount('evt1')).toBe(2);
      
      service.cancel(result1.registration!.id);
      
      expect(service.getEventRegistrationCount('evt1')).toBe(1);
    });

    it('should count waitlist registrations', () => {
      service.setEventCapacity('evt1', 1);
      
      service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 2',
        userEmail: 'user2@example.com',
        userPhone: '9876543211',
      });
      
      expect(service.getEventRegistrationCount('evt1')).toBe(2);
    });
  });

  describe('getWaitlist', () => {
    beforeEach(() => {
      service.setEventCapacity('evt1', 2);
      
      service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 2',
        userEmail: 'user2@example.com',
        userPhone: '9876543211',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 3',
        userEmail: 'user3@example.com',
        userPhone: '9876543212',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 4',
        userEmail: 'user4@example.com',
        userPhone: '9876543213',
      });
    });

    it('should return all waitlisted registrations', () => {
      const waitlist = service.getWaitlist('evt1');
      
      expect(waitlist).toHaveLength(2);
      expect(waitlist.every(r => r.status === 'waitlist')).toBe(true);
    });

    it('should return empty array when no waitlist', () => {
      const waitlist = service.getWaitlist('evt2');
      
      expect(waitlist).toEqual([]);
    });

    it('should maintain waitlist order', () => {
      const waitlist = service.getWaitlist('evt1');
      
      expect(waitlist[0].userName).toBe('User 3');
      expect(waitlist[1].userName).toBe('User 4');
    });
  });

  describe('cancel with waitlist promotion', () => {
    it('should promote from waitlist when spot opens', () => {
      service.setEventCapacity('evt1', 2);
      
      const result1 = service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 2',
        userEmail: 'user2@example.com',
        userPhone: '9876543211',
      });
      const result3 = service.register({
        eventId: 'evt1',
        userName: 'User 3',
        userEmail: 'user3@example.com',
        userPhone: '9876543212',
      });
      
      expect(result3.registration?.status).toBe('waitlist');
      
      service.cancel(result1.registration!.id);
      
      const promoted = service.getRegistration(result3.registration!.id);
      expect(promoted?.status).toBe('confirmed');
    });

    it('should not promote when cancelling waitlisted registration', () => {
      service.setEventCapacity('evt1', 1);
      
      service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      const result2 = service.register({
        eventId: 'evt1',
        userName: 'User 2',
        userEmail: 'user2@example.com',
        userPhone: '9876543211',
      });
      const result3 = service.register({
        eventId: 'evt1',
        userName: 'User 3',
        userEmail: 'user3@example.com',
        userPhone: '9876543212',
      });
      
      service.cancel(result2.registration!.id);
      
      const reg3 = service.getRegistration(result3.registration!.id);
      expect(reg3?.status).toBe('waitlist');
    });

    it('should promote first waitlisted person only', () => {
      service.setEventCapacity('evt1', 2);
      
      const result1 = service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 2',
        userEmail: 'user2@example.com',
        userPhone: '9876543211',
      });
      const result3 = service.register({
        eventId: 'evt1',
        userName: 'User 3',
        userEmail: 'user3@example.com',
        userPhone: '9876543212',
      });
      const result4 = service.register({
        eventId: 'evt1',
        userName: 'User 4',
        userEmail: 'user4@example.com',
        userPhone: '9876543213',
      });
      
      service.cancel(result1.registration!.id);
      
      const reg3 = service.getRegistration(result3.registration!.id);
      const reg4 = service.getRegistration(result4.registration!.id);
      
      expect(reg3?.status).toBe('confirmed');
      expect(reg4?.status).toBe('waitlist');
    });
  });

  describe('getStats', () => {
    beforeEach(() => {
      service.setEventCapacity('evt1', 2);
      
      const result1 = service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 2',
        userEmail: 'user2@example.com',
        userPhone: '9876543211',
      });
      service.register({
        eventId: 'evt1',
        userName: 'User 3',
        userEmail: 'user3@example.com',
        userPhone: '9876543212',
      });
      
      service.cancel(result1.registration!.id);
      service.updatePaymentStatus(result1.registration!.id, 'completed');
    });

    it('should return correct statistics', () => {
      const stats = service.getStats('evt1');
      
      expect(stats.total).toBe(3);
      expect(stats.confirmed).toBe(2); // User 2 + User 3 (promoted from waitlist)
      expect(stats.pending).toBe(0);
      expect(stats.cancelled).toBe(1);
      expect(stats.waitlist).toBe(0); // User 3 was promoted
    });

    it('should return zero stats for non-existent event', () => {
      const stats = service.getStats('evt2');
      
      expect(stats.total).toBe(0);
      expect(stats.confirmed).toBe(0);
      expect(stats.pending).toBe(0);
      expect(stats.cancelled).toBe(0);
      expect(stats.waitlist).toBe(0);
    });
  });
});
