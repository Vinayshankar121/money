import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EventCard } from '@/components/EventCard';
import { Event } from '@/components/data/events';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockEvent: Event = {
  id: '1',
  title: 'Test Hackathon',
  description: 'A test hackathon event',
  date: '6th March 2026',
  dateTag: '6 Mar',
  time: '10:00 - 18:00',
  venue: 'Main Hall',
  categories: ['Hackathons'],
  department: 'CSE',
  image: '/test-image.jpg',
  registrationOpen: true,
  teamSize: '2-4',
  prizes: ['$1000', '$500'],
  rules: ['Rule 1', 'Rule 2'],
  coordinators: [{ name: 'John Doe', phone: '1234567890' }],
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('EventCard Component', () => {
  it('should render without crashing', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    expect(container).toBeTruthy();
  });

  it('should render link element', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    const link = container.querySelector('a');
    expect(link).toBeTruthy();
  });

  it('should have correct href attribute', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    const link = container.querySelector('a');
    expect(link?.getAttribute('href')).toBe('/event/1');
  });

  it('should render image element', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('should have correct image source', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('/test-image.jpg');
  });

  it('should have title in document', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    expect(container.textContent).toContain('Test Hackathon');
  });

  it('should render with proper classes', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    const card = container.querySelector('.rounded-lg');
    expect(card).toBeTruthy();
  });

  it('should handle event with registration open', () => {
    const eventOpen = { ...mockEvent, registrationOpen: true };
    const { container } = renderWithRouter(<EventCard event={eventOpen} />);
    expect(container).toBeTruthy();
  });

  it('should handle event with registration closed', () => {
    const eventClosed = { ...mockEvent, registrationOpen: false };
    const { container } = renderWithRouter(<EventCard event={eventClosed} />);
    expect(container).toBeTruthy();
  });

  it('should handle different event categories', () => {
    const eventDifferentCategory = { ...mockEvent, categories: ['Music' as any] };
    const { container } = renderWithRouter(<EventCard event={eventDifferentCategory} />);
    expect(container).toBeTruthy();
  });

  it('should render title heading', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    const h3 = container.querySelector('h3');
    expect(h3).toBeTruthy();
    expect(h3?.textContent).toContain('Test Hackathon');
  });

  it('should handle event without team size', () => {
    const noTeamEvent = { ...mockEvent, teamSize: undefined };
    const { container } = renderWithRouter(<EventCard event={noTeamEvent} />);
    expect(container).toBeTruthy();
  });

  it('should handle event without prizes', () => {
    const noPrizesEvent = { ...mockEvent, prizes: undefined };
    const { container } = renderWithRouter(<EventCard event={noPrizesEvent} />);
    expect(container).toBeTruthy();
  });

  it('should handle empty department', () => {
    const noDeptEvent = { ...mockEvent, department: '' as '' };
    const { container } = renderWithRouter(<EventCard event={noDeptEvent} />);
    expect(container).toBeTruthy();
  });

  it('should render with proper styling applied', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    const link = container.querySelector('a.group');
    expect(link).toBeTruthy();
  });

  it('should have aspect-square class', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    const card = container.querySelector('.aspect-square');
    expect(card).toBeTruthy();
  });

  it('should show category badge', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    expect(container.textContent).toContain('Hackathons');
  });

  it('should show registration open badge', () => {
    const { container } = renderWithRouter(<EventCard event={mockEvent} />);
    expect(container.textContent).toContain('Open');
  });

  it('should show registration closed badge', () => {
    const eventClosed = { ...mockEvent, registrationOpen: false };
    const { container } = renderWithRouter(<EventCard event={eventClosed} />);
    expect(container.textContent).toContain('Closed');
  });
});
