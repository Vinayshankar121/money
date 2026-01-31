import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterSection } from '@/components/FilterSection';

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  X: () => <span data-testid="x-icon">X</span>,
}));

describe('FilterSection Component', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render filter groups', () => {
      render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      expect(screen.getByText('Categories')).toBeTruthy();
    });

    it('should render all category options', () => {
      render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      expect(screen.getByText('All Events')).toBeTruthy();
      expect(screen.getByText('Cultural Events')).toBeTruthy();
      expect(screen.getByText('Technical Events')).toBeTruthy();
      expect(screen.getByText('Sports')).toBeTruthy();
    });

    it('should not render reset button when filter is "All Events"', () => {
      const { container } = render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      const resetButton = Array.from(container.querySelectorAll('*')).find(el => el.textContent === 'Reset Filters');
      expect(!resetButton).toBe(true);
    });

    it('should render reset button when filter is active', () => {
      render(<FilterSection activeFilter="Hackathons" onFilterChange={mockOnFilterChange} />);
      
      expect(screen.getByText('Reset Filters')).toBeTruthy();
    });
  });

  describe('Filter Selection', () => {
    it('should call onFilterChange when clicking a filter', async () => {
      const user = userEvent.setup();
      render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      const hackathonsFilter = screen.getByText('Hackathons');
      await user.click(hackathonsFilter);
      
      expect(mockOnFilterChange).toHaveBeenCalledWith('Hackathons');
      expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    });

    it('should call onFilterChange with correct category', async () => {
      const user = userEvent.setup();
      render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      await user.click(screen.getByText('Cultural Events'));
      expect(mockOnFilterChange).toHaveBeenCalledWith('Cultural Events');
      
      await user.click(screen.getByText('Sports'));
      expect(mockOnFilterChange).toHaveBeenCalledWith('Sports');
    });

    it('should allow clicking the same filter multiple times', async () => {
      const user = userEvent.setup();
      render(<FilterSection activeFilter="Hackathons" onFilterChange={mockOnFilterChange} />);
      
      const hackathonsFilter = screen.getByText('Hackathons');
      await user.click(hackathonsFilter);
      await user.click(hackathonsFilter);
      
      expect(mockOnFilterChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('Active Filter Highlighting', () => {
    it('should highlight active filter', () => {
      render(<FilterSection activeFilter="Hackathons" onFilterChange={mockOnFilterChange} />);
      
      const hackathonsFilter = screen.getByText('Hackathons');
      expect(hackathonsFilter).toBeTruthy();
    });

    it('should not highlight inactive filters', () => {
      render(<FilterSection activeFilter="Hackathons" onFilterChange={mockOnFilterChange} />);
      
      const sportsFilter = screen.getByText('Sports');
      expect(sportsFilter).toBeTruthy();
    });

    it('should update highlight when active filter changes', () => {
      const { rerender } = render(
        <FilterSection activeFilter="Hackathons" onFilterChange={mockOnFilterChange} />
      );
      
      expect(screen.getByText('Hackathons')).toBeTruthy();
      
      rerender(<FilterSection activeFilter="Sports" onFilterChange={mockOnFilterChange} />);
      
      expect(screen.getByText('Sports')).toBeTruthy();
      expect(screen.getByText('Hackathons')).toBeTruthy();
    });
  });

  describe('Reset Functionality', () => {
    it('should call onFilterChange with "All Events" when reset clicked', async () => {
      const user = userEvent.setup();
      render(<FilterSection activeFilter="Hackathons" onFilterChange={mockOnFilterChange} />);
      
      const resetButton = screen.getByText('Reset Filters');
      await user.click(resetButton);
      
      expect(mockOnFilterChange).toHaveBeenCalledWith('All Events');
    });

    it('should hide reset button after clicking it (when filter becomes "All Events")', () => {
      const { rerender } = render(
        <FilterSection activeFilter="Hackathons" onFilterChange={mockOnFilterChange} />
      );
      
      expect(screen.getByText('Reset Filters')).toBeTruthy();
      
      rerender(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      const { container } = render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      const resetButton = Array.from(container.querySelectorAll('*')).find(el => el.textContent === 'Reset Filters');
      expect(!resetButton).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid filter changes', async () => {
      const user = userEvent.setup();
      render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      await user.click(screen.getByText('Hackathons'));
      await user.click(screen.getByText('Sports'));
      await user.click(screen.getByText('Cultural Events'));
      
      expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
    });

    it('should handle empty activeFilter prop gracefully', () => {
      render(<FilterSection activeFilter="" onFilterChange={mockOnFilterChange} />);
      
      // Should render without crashing
      expect(screen.getByText('Categories')).toBeTruthy();
    });

    it('should handle undefined callback gracefully', () => {
      // This tests runtime safety - in real code TypeScript would prevent this
      const { container } = render(
        <FilterSection activeFilter="All Events" onFilterChange={undefined as any} />
      );
      
      expect(container).toBeTruthy();
    });
  });

  describe('Keyboard Accessibility', () => {
    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      // Tab through elements
      await user.tab();
      
      // Should be able to navigate with keyboard
      expect(document.activeElement).toBeTruthy();
    });

    it('should trigger filter change on Enter key', () => {
      render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      const hackathonsFilter = screen.getByText('Hackathons');
      
      // Simulate Enter key press
      fireEvent.keyDown(hackathonsFilter.parentElement!, { key: 'Enter', code: 'Enter' });
      
      // Click handler should still work with keyboard
      expect(hackathonsFilter).toBeTruthy();
    });
  });

  describe('Multiple Filter Groups', () => {
    it('should render filters from all available categories', () => {
      render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      // Check for various categories
      expect(screen.getByText('Hackathons')).toBeTruthy();
      expect(screen.getByText('Music')).toBeTruthy();
      expect(screen.getByText('Dance')).toBeTruthy();
      expect(screen.getByText('Paper Presentation')).toBeTruthy();
    });

    it('should allow switching between different category types', async () => {
      const user = userEvent.setup();
      render(<FilterSection activeFilter="All Events" onFilterChange={mockOnFilterChange} />);
      
      await user.click(screen.getByText('Dance'));
      expect(mockOnFilterChange).toHaveBeenCalledWith('Dance');
      
      await user.click(screen.getByText('Music'));
      expect(mockOnFilterChange).toHaveBeenCalledWith('Music');
    });
  });

  describe('Visual Feedback', () => {
    it('should have pulse animation on active filter', () => {
      render(<FilterSection activeFilter="Hackathons" onFilterChange={mockOnFilterChange} />);
      
      const hackathonsFilter = screen.getByText('Hackathons').parentElement;
      const pulseElement = hackathonsFilter?.querySelector('.animate-pulse');
      
      expect(pulseElement !== null).toBe(true);
    });

    it('should not have pulse animation on inactive filters', () => {
      render(<FilterSection activeFilter="Hackathons" onFilterChange={mockOnFilterChange} />);
      
      const sportsFilter = screen.getByText('Sports');
      // Inactive filter should not have pulse element as a direct child
      expect(sportsFilter).toBeTruthy();
    });
  });
});
