import { render, screen } from '@testing-library/react';
import { EventSummary } from '@/components/EventSummary';

jest.mock('@/lib/eventMetrics', () => ({
  getRegistrationStats: () => ({ total: 12, open: 9, closed: 3 }),
  getMostCommonCategory: () => 'Technical Events',
  getTopDepartments: () => [
    { department: 'CSE', count: 5 },
    { department: 'ECE', count: 3 },
  ],
}));

describe('EventSummary', () => {
  it('should render total event count', () => {
    render(<EventSummary />);
    expect(screen.getByText('12 events scheduled')).toBeTruthy();
  });

  it('should render registration stats', () => {
    render(<EventSummary />);
    expect(screen.getByText('9 open · 3 closed')).toBeTruthy();
  });

  it('should render top category and departments', () => {
    render(<EventSummary />);
    expect(screen.getByText('Top category: Technical Events')).toBeTruthy();
    expect(screen.getByText('CSE: 5')).toBeTruthy();
    expect(screen.getByText('ECE: 3')).toBeTruthy();
  });
});
