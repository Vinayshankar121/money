import { 
  cn, 
  debounce, 
  formatDate, 
  isEmpty, 
  truncateText, 
  capitalize,
  normalizeText
} from '@/lib/utils';

/**
 * Test suite for utility functions.
 * Covers class name merging, debouncing, date formatting, and text manipulation.
 */
describe('Utils Library', () => {
  describe('cn (className merger)', () => {
    it('should merge single class name', () => {
      const result = cn('text-red-500');
      expect(result).toBe('text-red-500');
    });

    it('should merge multiple class names', () => {
      const result = cn('text-red-500', 'bg-blue-500', 'p-4');
      expect(result).toContain('text-red-500');
      expect(result).toContain('bg-blue-500');
      expect(result).toContain('p-4');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
    });

    it('should remove falsy values', () => {
      const result = cn('text-red-500', false, null, undefined, 'bg-blue-500');
      expect(result).toContain('text-red-500');
      expect(result).toContain('bg-blue-500');
    });

    it('should merge conflicting Tailwind classes correctly', () => {
      const result = cn('p-4', 'p-8');
      // twMerge should resolve conflicts, keeping the last one
      expect(result).toBe('p-8');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle array of classes', () => {
      const result = cn(['text-red-500', 'bg-blue-500']);
      expect(result).toContain('text-red-500');
      expect(result).toContain('bg-blue-500');
    });

    it('should handle object notation', () => {
      const result = cn({
        'text-red-500': true,
        'bg-blue-500': false,
        'p-4': true,
      });
      expect(result).toContain('text-red-500');
      expect(result).not.toContain('bg-blue-500');
      expect(result).toContain('p-4');
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debounced = debounce(mockFn, 300);

      debounced('arg1');
      debounced('arg2');
      debounced('arg3');

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('arg3');
    });

    it('should handle multiple debounced calls', () => {
      const mockFn = jest.fn();
      const debounced = debounce(mockFn, 200);

      debounced('first');
      jest.advanceTimersByTime(100);
      debounced('second');
      jest.advanceTimersByTime(150);
      debounced('third');

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(200);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('third');
    });

    it('should clear timeout on new call', () => {
      const mockFn = jest.fn();
      const debounced = debounce(mockFn, 300);

      debounced('arg1');
      jest.advanceTimersByTime(150);
      debounced('arg2');
      jest.advanceTimersByTime(150);

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(150);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('arg2');
    });
  });

  describe('formatDate', () => {
    it('should format date object correctly', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'en-US');
      expect(result).toBeTruthy();
      expect(result).toContain('Jan');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });

    it('should format date string correctly', () => {
      const result = formatDate('2024-12-25', 'en-US');
      expect(result).toBeTruthy();
      expect(result).toContain('Dec');
      expect(result).toContain('25');
      expect(result).toContain('2024');
    });

    it('should handle invalid date', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('');
    });

    it('should use default locale', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toBeTruthy();
    });

    it('should support different locales', () => {
      const date = new Date('2024-01-15');
      const enResult = formatDate(date, 'en-US');
      const deResult = formatDate(date, 'de-DE');
      expect(enResult).toBeTruthy();
      expect(deResult).toBeTruthy();
    });

    it('should return empty string for invalid Date object', () => {
      const invalidDate = new Date('invalid');
      const result = formatDate(invalidDate);
      expect(result).toBe('');
    });
  });

  describe('isEmpty', () => {
    it('should detect null as empty', () => {
      expect(isEmpty(null)).toBe(true);
    });

    it('should detect undefined as empty', () => {
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should detect empty string as empty', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
    });

    it('should detect non-empty string as not empty', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty('  hello  ')).toBe(false);
    });

    it('should detect empty array as empty', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('should detect non-empty array as not empty', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it('should detect empty object as empty', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('should detect non-empty object as not empty', () => {
      expect(isEmpty({ key: 'value' })).toBe(false);
    });

    it('should detect zero as not empty', () => {
      expect(isEmpty(0)).toBe(false);
    });

    it('should detect false as not empty', () => {
      expect(isEmpty(false)).toBe(false);
    });
  });

  describe('truncateText', () => {
    it('should truncate text to max length', () => {
      const result = truncateText('Hello World This Is Long', 10);
      expect(result).toBe('Hello W...');
      expect(result.length).toBe(10);
    });

    it('should not truncate short text', () => {
      const result = truncateText('Hi', 10);
      expect(result).toBe('Hi');
    });

    it('should handle empty text', () => {
      const result = truncateText('', 10);
      expect(result).toBe('');
    });

    it('should handle max length of zero', () => {
      const result = truncateText('Hello', 0);
      expect(result).toBe('');
    });

    it('should handle negative max length', () => {
      const result = truncateText('Hello', -5);
      expect(result).toBe('');
    });

    it('should truncate at exact max length boundary', () => {
      const result = truncateText('Hello', 5);
      expect(result).toBe('Hello');
    });

    it('should truncate one character over max length', () => {
      const result = truncateText('Hello!', 5);
      expect(result.endsWith('...')).toBe(true);
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should lowercase rest of the string', () => {
      expect(capitalize('HELLO')).toBe('Hello');
    });

    it('should handle mixed case', () => {
      expect(capitalize('hELLO')).toBe('Hello');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle text with spaces', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('should handle text starting with numbers', () => {
      expect(capitalize('123abc')).toBe('123abc');
    });

    it('should handle special characters', () => {
      expect(capitalize('@hello')).toBe('@hello');
    });
  });

  describe('normalizeText', () => {
    it('should trim whitespace', () => {
      expect(normalizeText('  Hello  ')).toBe('hello');
    });

    it('should lowercase text', () => {
      expect(normalizeText('SPARK')).toBe('spark');
    });

    it('should handle mixed casing with spaces', () => {
      expect(normalizeText('  MiXeD Case  ')).toBe('mixed case');
    });
  });
});
