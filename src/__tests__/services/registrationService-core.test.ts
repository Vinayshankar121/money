/**
 * Core Registration Service Tests
 */

import { RegistrationService, RegistrationData } from '../../services/registrationService';

describe('RegistrationService - Core Functionality', () => {
  let service: RegistrationService;

  beforeEach(() => {
    service = new RegistrationService();
  });

  describe('register', () => {
    const validData: RegistrationData = {
      eventId: 'evt1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userPhone: '9876543210',
    };

    it('should successfully register a user', () => {
      const result = service.register(validData);
      
      expect(result.success).toBe(true);
      expect(result.registration).toBeDefined();
      expect(result.registration?.userName).toBe('John Doe');
      expect(result.registration?.status).toBe('confirmed');
    });

    it('should reject invalid email', () => {
      const result = service.register({
        ...validData,
        userEmail: 'invalid-email',
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid email address');
    });

    it('should reject invalid phone', () => {
      const result = service.register({
        ...validData,
        userPhone: '12345',
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid phone number');
    });

    it('should accept valid Indian phone numbers', () => {
      const phones = ['9876543210', '8765432109', '7654321098', '6543210987'];
      
      phones.forEach((phone, idx) => {
        const result = service.register({
          ...validData,
          userEmail: `user${idx}@example.com`,
          userPhone: phone,
        });
        
        expect(result.success).toBe(true);
      });
    });

    it('should reject phone starting with invalid digits', () => {
      const invalidPhones = ['5876543210', '4765432109', '3654321098'];
      
      invalidPhones.forEach(phone => {
        const result = service.register({
          ...validData,
          userPhone: phone,
        });
        
        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid phone number');
      });
    });

    it('should prevent duplicate registrations', () => {
      service.register(validData);
      const result = service.register(validData);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Already registered for this event');
    });

    it('should allow same user to register for different events', () => {
      const result1 = service.register(validData);
      const result2 = service.register({
        ...validData,
        eventId: 'evt2',
      });
      
      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
    });

    it('should generate unique registration IDs', () => {
      const result1 = service.register(validData);
      const result2 = service.register({
        ...validData,
        userEmail: 'jane@example.com',
      });
      
      expect(result1.registration?.id).not.toBe(result2.registration?.id);
    });

    it('should set registration date', () => {
      const before = new Date();
      const result = service.register(validData);
      const after = new Date();
      
      expect(result.registration?.registrationDate).toBeDefined();
      expect(result.registration!.registrationDate.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(result.registration!.registrationDate.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('should initialize payment status as pending', () => {
      const result = service.register(validData);
      
      expect(result.registration?.paymentStatus).toBe('pending');
    });

    it('should store team members when provided', () => {
      const result = service.register({
        ...validData,
        teamMembers: ['Alice', 'Bob'],
      });
      
      expect(result.registration?.teamMembers).toEqual(['Alice', 'Bob']);
    });

    it('should handle registration without team members', () => {
      const result = service.register(validData);
      
      expect(result.registration?.teamMembers).toBeUndefined();
    });
  });

  describe('getRegistration', () => {
    it('should retrieve registration by ID', () => {
      const result = service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      const retrieved = service.getRegistration(result.registration!.id);
      
      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe(result.registration!.id);
    });

    it('should return undefined for non-existent ID', () => {
      const retrieved = service.getRegistration('non-existent');
      
      expect(retrieved).toBeUndefined();
    });
  });

  describe('getEventRegistrations', () => {
    beforeEach(() => {
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
        eventId: 'evt2',
        userName: 'User 3',
        userEmail: 'user3@example.com',
        userPhone: '9876543212',
      });
    });

    it('should return all registrations for an event', () => {
      const regs = service.getEventRegistrations('evt1');
      
      expect(regs).toHaveLength(2);
      expect(regs.every(r => r.eventId === 'evt1')).toBe(true);
    });

    it('should return empty array for event with no registrations', () => {
      const regs = service.getEventRegistrations('evt3');
      
      expect(regs).toEqual([]);
    });
  });

  describe('getUserRegistrations', () => {
    beforeEach(() => {
      service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      service.register({
        eventId: 'evt2',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      service.register({
        eventId: 'evt3',
        userName: 'Jane Doe',
        userEmail: 'jane@example.com',
        userPhone: '9876543211',
      });
    });

    it('should return all registrations for a user', () => {
      const regs = service.getUserRegistrations('john@example.com');
      
      expect(regs).toHaveLength(2);
      expect(regs.every(r => r.userEmail === 'john@example.com')).toBe(true);
    });

    it('should return empty array for user with no registrations', () => {
      const regs = service.getUserRegistrations('unknown@example.com');
      
      expect(regs).toEqual([]);
    });
  });

  describe('isUserRegistered', () => {
    beforeEach(() => {
      service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
    });

    it('should return true for registered user', () => {
      expect(service.isUserRegistered('evt1', 'john@example.com')).toBe(true);
    });

    it('should return false for non-registered user', () => {
      expect(service.isUserRegistered('evt1', 'jane@example.com')).toBe(false);
    });

    it('should return false for different event', () => {
      expect(service.isUserRegistered('evt2', 'john@example.com')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should remove all registrations', () => {
      service.register({
        eventId: 'evt1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        userPhone: '9876543210',
      });
      
      service.clear();
      
      expect(service.getEventRegistrations('evt1')).toEqual([]);
      expect(service.isUserRegistered('evt1', 'john@example.com')).toBe(false);
    });
  });
});
