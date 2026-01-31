import { getCategoryTheme, getRegistrationBadge } from '@/lib/eventDisplay';
import type { EventCategory } from '@/components/data/events';

describe('eventDisplay', () => {
  describe('getCategoryTheme', () => {
    it('should return themed styles for known categories', () => {
      const theme = getCategoryTheme('Technical Events' as EventCategory);
      expect(theme.badgeClass).toContain('text-cyan');
      expect(theme.glowColor).toContain('rgba');
    });

    it('should return default theme for unknown category', () => {
      const theme = getCategoryTheme('All Events');
      expect(theme.badgeClass).toContain('text-primary');
    });
  });

  describe('getRegistrationBadge', () => {
    it('should return open badge for open registration', () => {
      const badge = getRegistrationBadge(true);
      expect(badge.label).toBe('Open');
      expect(badge.className).toContain('emerald');
    });

    it('should return closed badge for closed registration', () => {
      const badge = getRegistrationBadge(false);
      expect(badge.label).toBe('Closed');
      expect(badge.className).toContain('rose');
    });
  });
});
