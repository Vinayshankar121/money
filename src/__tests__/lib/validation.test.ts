import {
  validateEmail,
  validatePhone,
  validateName,
  validateCollege,
  validateEventSelection,
  validateRegistrationForm,
  RegistrationFormData,
} from '@/lib/validation';

/**
 * Test suite for form validation utilities.
 * Covers email, phone, name validation with edge cases.
 */
describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'john.doe@university.edu',
        'event@spark2026.in',
        'test.user+tag@domain.co.in',
      ];

      validEmails.forEach(email => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@.com',
      ];

      invalidEmails.forEach(email => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeTruthy();
      });
    });

    it('should reject empty email', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Email is required');
    });

    it('should reject whitespace-only email', () => {
      const result = validateEmail('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Email is required');
    });

    it('should trim surrounding whitespace for valid email', () => {
      const result = validateEmail('  user@example.com  ');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('validatePhone', () => {
    it('should accept valid Indian phone numbers', () => {
      const validPhones = [
        '9876543210',
        '8123456789',
        '7012345678',
        '6999999999',
      ];

      validPhones.forEach(phone => {
        const result = validatePhone(phone);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should accept phone numbers with spaces and hyphens', () => {
      const validPhones = [
        '987 654 3210',
        '987-654-3210',
        '98765 43210',
      ];

      validPhones.forEach(phone => {
        const result = validatePhone(phone);
        expect(result.isValid).toBe(true);
      });
    });

    it('should accept phone numbers with country code prefix', () => {
      const validPhones = [
        '+91 98765 43210',
        '91-9876543210',
      ];

      validPhones.forEach(phone => {
        const result = validatePhone(phone);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject invalid phone numbers', () => {
      const invalidPhones = [
        '123456789',      // Too short
        '12345678901',    // Too long
        '0123456789',     // Starts with 0
        '5123456789',     // Starts with 5
        'abcdefghij',     // Contains letters
      ];

      invalidPhones.forEach(phone => {
        const result = validatePhone(phone);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeTruthy();
      });
    });

    it('should reject empty phone number', () => {
      const result = validatePhone('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Phone number is required');
    });
  });

  describe('validateName', () => {
    it('should accept valid names', () => {
      const validNames = [
        'John Doe',
        'Mary Jane',
        "O'Brien",
        'Jean-Pierre',
        'Dr. Smith',
      ];

      validNames.forEach(name => {
        const result = validateName(name);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject names with invalid characters', () => {
      const invalidNames = [
        'John123',
        'Name@Invalid',
        'Test#User',
        'User$Name',
      ];

      invalidNames.forEach(name => {
        const result = validateName(name);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('invalid characters');
      });
    });

    it('should reject names that are too short', () => {
      const result = validateName('A');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('at least 2 characters');
    });

    it('should reject empty names', () => {
      const result = validateName('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Name is required');
    });

    it('should use custom field name in error messages', () => {
      const result = validateName('', 'First Name');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('First Name is required');
    });
  });

  describe('validateCollege', () => {
    it('should accept valid college names', () => {
      const validColleges = [
        'SV College of Engineering',
        'MIT',
        'IIT Bombay',
        'University of California',
      ];

      validColleges.forEach(college => {
        const result = validateCollege(college);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject college names that are too short', () => {
      const result = validateCollege('AB');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('at least 3 characters');
    });

    it('should reject empty college names', () => {
      const result = validateCollege('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('College name is required');
    });

    it('should reject whitespace-only college names', () => {
      const result = validateCollege('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('College name is required');
    });
  });

  describe('validateEventSelection', () => {
    it('should accept valid event selections', () => {
      const validSelections = [
        ['event1'],
        ['event1', 'event2'],
        ['event1', 'event2', 'event3', 'event4', 'event5'],
      ];

      validSelections.forEach(events => {
        const result = validateEventSelection(events);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject empty event selection', () => {
      const result = validateEventSelection([]);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Please select at least one event');
    });

    it('should reject more than 5 events', () => {
      const events = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'];
      const result = validateEventSelection(events);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('maximum of 5 events');
    });

    it('should reject selections with empty event IDs', () => {
      const result = validateEventSelection(['event1', '  ', 'event3']);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Selected events contain invalid entries');
    });
  });

  describe('validateRegistrationForm', () => {
    const validFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      college: 'SV College',
      events: ['event1', 'event2'],
    };

    it('should validate a complete valid form', () => {
      const result = validateRegistrationForm(validFormData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should return errors for invalid name', () => {
      const formData = { ...validFormData, name: '' };
      const result = validateRegistrationForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeTruthy();
    });

    it('should return errors for invalid email', () => {
      const formData = { ...validFormData, email: 'invalidemail' };
      const result = validateRegistrationForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeTruthy();
    });

    it('should return errors for invalid phone', () => {
      const formData = { ...validFormData, phone: '123' };
      const result = validateRegistrationForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBeTruthy();
    });

    it('should return errors for invalid college', () => {
      const formData = { ...validFormData, college: '' };
      const result = validateRegistrationForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.college).toBeTruthy();
    });

    it('should return errors for invalid event selection', () => {
      const formData = { ...validFormData, events: [] };
      const result = validateRegistrationForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.events).toBeTruthy();
    });

    it('should return multiple errors for multiple invalid fields', () => {
      const formData = {
        name: '',
        email: 'invalidemail',
        phone: '123',
        college: '',
        events: [],
      };

      const result = validateRegistrationForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.phone).toBeTruthy();
      expect(result.errors.college).toBeTruthy();
      expect(result.errors.events).toBeTruthy();
    });

    it('should validate form with minimum valid data', () => {
      const formData = {
        name: 'AB',
        email: 'a@b.c',
        phone: '9876543210',
        college: 'ABC',
        events: ['e1'],
      };

      const result = validateRegistrationForm(formData);
      expect(result.isValid).toBe(true);
    });

    it('should validate form with maximum events allowed', () => {
      const formData = {
        ...validFormData,
        events: ['e1', 'e2', 'e3', 'e4', 'e5'],
      };

      const result = validateRegistrationForm(formData);
      expect(result.isValid).toBe(true);
    });

    it('should reject form with too many events', () => {
      const formData = {
        ...validFormData,
        events: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'],
      };

      const result = validateRegistrationForm(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.events).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined values gracefully', () => {
      expect(validateEmail(undefined as any).isValid).toBe(false);
      expect(validatePhone(undefined as any).isValid).toBe(false);
      expect(validateName(undefined as any).isValid).toBe(false);
    });

    it('should trim whitespace in validations', () => {
      expect(validateName('  John Doe  ').isValid).toBe(true);
      expect(validateCollege('  MIT  ').isValid).toBe(true);
    });

    it('should handle special characters in names appropriately', () => {
      expect(validateName("O'Connor").isValid).toBe(true);
      expect(validateName('Jean-Pierre').isValid).toBe(true);
      expect(validateName('Dr. Smith').isValid).toBe(true);
    });
  });
});
