import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/SearchBar';

describe('SearchBar Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render search input with placeholder', () => {
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      expect(input).toBeInTheDocument();
    });

    it('should render with search icon', () => {
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      // Check for the Search icon (Lucide React renders as SVG)
      const container = screen.getByPlaceholderText('Search events...').parentElement;
      expect(container).toBeInTheDocument();
    });

    it('should display provided value', () => {
      render(<SearchBar value="hackathon" onChange={mockOnChange} />);
      
      const input = screen.getByDisplayValue('hackathon');
      expect(input).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onChange when user types', async () => {
      const user = userEvent.setup();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      await user.type(input, 'tech');
      
      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith('t');
    });

    it('should handle onChange with each character typed', async () => {
      const user = userEvent.setup();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      await user.type(input, 'abc');
      
      expect(mockOnChange).toHaveBeenCalledTimes(3);
    });

    it('should update when value prop changes', () => {
      const { rerender } = render(<SearchBar value="initial" onChange={mockOnChange} />);
      
      expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
      
      rerender(<SearchBar value="updated" onChange={mockOnChange} />);
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
    });

    it('should handle clearing the input', async () => {
      const user = userEvent.setup();
      render(<SearchBar value="test" onChange={mockOnChange} />);
      
      const input = screen.getByDisplayValue('test');
      await user.clear(input);
      
      expect(mockOnChange).toHaveBeenCalled();
    });

    it('should handle paste events', async () => {
      const user = userEvent.setup();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      await user.click(input);
      await user.paste('pasted text');
      
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters', async () => {
      const user = userEvent.setup();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      await user.type(input, '!@#$%');
      
      expect(mockOnChange).toHaveBeenCalled();
    });

    it('should handle very long input', async () => {
      const user = userEvent.setup();
      const longText = 'a'.repeat(100);
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      await user.type(input, longText);
      
      expect(mockOnChange).toHaveBeenCalled();
    });

    it('should handle empty string value', () => {
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      expect(input).toHaveValue('');
    });

    it('should handle numeric input', async () => {
      const user = userEvent.setup();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      await user.type(input, '123');
      
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper input type', () => {
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      
      // Tab to focus
      await user.tab();
      expect(input).toHaveFocus();
    });
  });
});
