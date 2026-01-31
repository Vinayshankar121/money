/**
 * Integration test suite for SearchBar component.
 * Tests user interactions, accessibility, and edge cases.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '@/components/SearchBar';

describe('SearchBar Integration Tests', () => {
  describe('Rendering', () => {
    it('should render with placeholder text', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      expect(input).toBeInTheDocument();
    });

    it('should display current value', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="test search" onChange={mockOnChange} />);
      
      const input = screen.getByDisplayValue('test search');
      expect(input).toBeInTheDocument();
    });

    it('should render search icon', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const icon = screen.getByLabelText('Search events');
      expect(icon.previousSibling).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    it('should call onChange when typing', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      fireEvent.change(input, { target: { value: 'hackathon' } });
      
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('hackathon');
    });

    it('should handle empty string input', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="test" onChange={mockOnChange} />);
      
      const input = screen.getByDisplayValue('test');
      fireEvent.change(input, { target: { value: '' } });
      
      expect(mockOnChange).toHaveBeenCalledWith('');
    });

    it('should handle special characters', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      fireEvent.change(input, { target: { value: '!@#$%^&*()' } });
      
      expect(mockOnChange).toHaveBeenCalledWith('!@#$%^&*()');
    });

    it('should handle multiple rapid changes', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      
      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.change(input, { target: { value: 'ab' } });
      fireEvent.change(input, { target: { value: 'abc' } });
      
      expect(mockOnChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label attribute', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByLabelText('Search events');
      expect(input).toBeInTheDocument();
    });

    it('should have correct input type', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null value gracefully', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value={null as any} onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      expect(input).toHaveValue('');
    });

    it('should handle undefined onChange', () => {
      expect(() => {
        render(<SearchBar value="test" onChange={undefined as any} />);
      }).not.toThrow();
    });

    it('should handle very long input strings', () => {
      const mockOnChange = jest.fn();
      const longString = 'a'.repeat(500);
      
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      fireEvent.change(input, { target: { value: longString } });
      
      expect(mockOnChange).toHaveBeenCalledWith(longString);
    });
  });

  describe('Styling', () => {
    it('should have correct CSS classes', () => {
      const mockOnChange = jest.fn();
      render(<SearchBar value="" onChange={mockOnChange} />);
      
      const input = screen.getByPlaceholderText('Search events...');
      expect(input).toHaveClass('pl-12');
      expect(input).toHaveClass('h-12');
    });
  });
});
