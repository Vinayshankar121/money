/**
 * Registration Service - Payment & Status Tests
 */

import { RegistrationService } from '../../services/registrationService';

describe('RegistrationService - Payment & Status Management', () => {
  let service: RegistrationService;

  beforeEach(() => {
    service = new RegistrationService();
  });

  describe('cancel', () => {
    it('should successfully cancel a registration', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      const cancelResult = service.cancel(result.registration!.id);
      
      expect(cancelResult.success).toBe(true);
      
      const reg = service.getRegistration(result.registration!.id);
      expect(reg?.status).toBe('cancelled');
    });

    it('should return error for non-existent registration', () => {
      const result = service.cancel('non-existent');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Registration not found');
    });

    it('should return error when cancelling already cancelled registration', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      service.cancel(result.registration!.id);
      const secondCancel = service.cancel(result.registration!.id);
      
      expect(secondCancel.success).toBe(false);
      expect(secondCancel.error).toBe('Registration already cancelled');
    });

    it('should remove user from event registrations', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      expect(service.isUserRegistered('evt1', 'john@example.com')).toBe(true);
      
      service.cancel(result.registration!.id);
      
      expect(service.isUserRegistered('evt1', 'john@example.com')).toBe(false);
    });

    it('should allow re-registration after cancellation', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      service.cancel(result.registration!.id);
      
      const result2 = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      expect(result2.success).toBe(true);
    });
  });

  describe('updatePaymentStatus', () => {
    it('should update payment status to completed', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      const updateResult = service.updatePaymentStatus(
        result.registration!.id,
        'completed'
      );
      
      expect(updateResult.success).toBe(true);
      
      const reg = service.getRegistration(result.registration!.id);
      expect(reg?.paymentStatus).toBe('completed');
    });

    it('should update payment status to failed', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      const updateResult = service.updatePaymentStatus(
        result.registration!.id,
        'failed'
      );
      
      expect(updateResult.success).toBe(true);
      
      const reg = service.getRegistration(result.registration!.id);
      expect(reg?.paymentStatus).toBe('failed');
    });

    it('should return error for non-existent registration', () => {
      const result = service.updatePaymentStatus('non-existent', 'completed');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Registration not found');
    });

    it('should confirm pending registration when payment completed', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      // Manually set to pending
      const reg = service.getRegistration(result.registration!.id);
      if (reg) reg.status = 'pending';
      
      service.updatePaymentStatus(result.registration!.id, 'completed');
      
      const updated = service.getRegistration(result.registration!.id);
      expect(updated?.status).toBe('confirmed');
    });

    it('should not change status when payment fails', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      const originalStatus = result.registration!.status;
      
      service.updatePaymentStatus(result.registration!.id, 'failed');
      
      const reg = service.getRegistration(result.registration!.id);
      expect(reg?.status).toBe(originalStatus);
    });

    it('should handle multiple payment updates', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      service.updatePaymentStatus(result.registration!.id, 'failed');
      let reg = service.getRegistration(result.registration!.id);
      expect(reg?.paymentStatus).toBe('failed');
      
      service.updatePaymentStatus(result.registration!.id, 'completed');
      reg = service.getRegistration(result.registration!.id);
      expect(reg?.paymentStatus).toBe('completed');
    });
  });

  describe('edge cases', () => {
    it('should handle email with special characters', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john.doe+test@example.com',
        userPhone: '9876543210',
      });
      
      expect(result.success).toBe(true);
    });

    it('should handle phone with spaces', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '987 654 3210',
      });
      
      expect(result.success).toBe(true);
    });

    it('should handle phone with hyphens', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '987-654-3210',
      });
      
      expect(result.success).toBe(true);
    });

    it('should handle name with special characters', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: "O'Brien-Smith Jr.",
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      expect(result.success).toBe(true);
      expect(result.registration?.userName).toBe("O'Brien-Smith Jr.");
    });

    it('should handle empty team members array', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
        teamMembers: [],
      });
      
      expect(result.success).toBe(true);
      expect(result.registration?.teamMembers).toEqual([]);
    });

    it('should handle large team members array', () => {
      const teamMembers = Array.from({ length: 10 }, (_, i) => `Member ${i + 1}`);
      
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
        teamMembers,
      });
      
      expect(result.success).toBe(true);
      expect(result.registration?.teamMembers).toHaveLength(10);
    });

    it('should handle concurrent registrations', () => {
      const results = Array.from({ length: 5 }, (_, i) =>
        service.register({
          eventId: 'evt1',
          userName: `User ${i + 1}`,
          userEmail: `user${i + 1}@example.com`,
          userPhone: '9876543210',
        })
      );
      
      expect(results.every(r => r.success)).toBe(true);
      expect(service.getEventRegistrationCount('evt1')).toBe(5);
    });

    it('should handle registration for event with zero capacity', () => {
      service.setEventCapacity('evt1', 0);
      
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      expect(result.registration?.status).toBe('waitlist');
    });

    it('should maintain data integrity after multiple operations', () => {
      // Register 3 users
      const reg1 = service.register({
        eventId: 'evt1',
        userName: 'User 1',
        userEmail: 'user1@example.com',
        userPhone: '9876543210',
      });
      const reg2 = service.register({
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
      
      // Cancel one
      service.cancel(reg1.registration!.id);
      
      // Update payment
      service.updatePaymentStatus(reg2.registration!.id, 'completed');
      
      // Verify all data intact
      const allRegs = service.getEventRegistrations('evt1');
      expect(allRegs).toHaveLength(3);
      
      const stats = service.getStats('evt1');
      expect(stats.total).toBe(3);
      expect(stats.cancelled).toBe(1);
      expect(stats.confirmed).toBe(2);
    });
  });
});
