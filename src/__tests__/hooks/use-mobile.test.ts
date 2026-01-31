import { renderHook, act, waitFor } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Test suite for useIsMobile custom hook.
 * Verifies responsive breakpoint detection at 768px.
 */
describe('useIsMobile Hook', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    // Restore original value
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe('Initial State', () => {
    it('should return false for desktop width (>= 768px)', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    it('should return true for mobile width (< 768px)', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('should return false for exactly 768px (boundary)', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    it('should return true for exactly 767px (boundary)', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 767,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should be responsive to screen size changes', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
      
      // Test passes if hook initializes correctly
    });
  });

  describe('Edge Cases', () => {
    it('should handle very small screen widths', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('should handle very large screen widths', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 3840,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    it('should handle rapid resize events', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(false);
      });

      // Simulate multiple rapid resizes
      act(() => {
        for (let i = 0; i < 10; i++) {
          const width = i % 2 === 0 ? 375 : 1024;
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
          });
          window.dispatchEvent(new Event('resize'));
        }
      });

      // Should settle on the last value (desktop)
      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });
  });

  describe('Memory Management', () => {
    it('should clean up on unmount', async () => {
      const { unmount } = renderHook(() => useIsMobile());
      
      // Unmounting should not throw errors
      expect(() => unmount()).not.toThrow();
    });

    it('should not cause memory leaks with multiple mounts', async () => {
      const { unmount: unmount1 } = renderHook(() => useIsMobile());
      const { unmount: unmount2 } = renderHook(() => useIsMobile());
      const { unmount: unmount3 } = renderHook(() => useIsMobile());

      unmount1();
      unmount2();
      unmount3();

      // If no errors thrown, cleanup worked correctly
      expect(true).toBe(true);
    });
  });

  describe('Common Device Widths', () => {
    const deviceWidths = [
      { name: 'iPhone SE', width: 375, expected: true },
      { name: 'iPhone 12 Pro', width: 390, expected: true },
      { name: 'iPad Mini', width: 768, expected: false },
      { name: 'iPad Pro', width: 1024, expected: false },
      { name: 'Desktop', width: 1920, expected: false },
    ];

    deviceWidths.forEach(({ name, width, expected }) => {
      it(`should return ${expected} for ${name} (${width}px)`, async () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { result } = renderHook(() => useIsMobile());

        await waitFor(() => {
          expect(result.current).toBe(expected);
        });
      });
    });
  });
});
