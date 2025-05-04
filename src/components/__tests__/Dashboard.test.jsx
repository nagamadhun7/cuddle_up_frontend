// src/components/__tests__/Dashboard.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Mock all external modules before importing the component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children, className }) => (
    <a href={to} className={className} data-testid="mock-link">
      {children}
    </a>
  )
}));

// Create a proper mock for echarts-for-react
jest.mock('echarts-for-react', () => ({
  __esModule: true,
  default: function MockEChart(props) {
    return (
      <div data-testid="mock-echart">
        Mock Chart
      </div>
    );
  }
}));

jest.mock('echarts', () => ({
  graphic: {
    LinearGradient: jest.fn((x, y, x2, y2, colorStops) => ({ x, y, x2, y2, colorStops })),
  }
}));

// Mock echarts-liquidfill
jest.mock('echarts-liquidfill', () => ({}));

// Mock firebase/auth
const mockGetIdToken = jest.fn().mockResolvedValue('mock-token');
const mockCurrentUser = { 
  uid: 'test-user-id',
  getIdToken: mockGetIdToken 
};
const mockGetAuth = jest.fn().mockReturnValue({ currentUser: mockCurrentUser });

jest.mock('firebase/auth', () => ({
  getAuth: () => mockGetAuth()
}));

// Mock axios - directly in the mock definition
jest.mock('axios', () => ({
  get: jest.fn()
}));

// Mock the emotionColors json
jest.mock('../../emotionColors.json', () => ({
  happy: "#FFD700",
  sad: "#B0C4DE",
  angry: "#FF6347",
  excited: "#32CD32",
  worried: "#FFA500",
  crying: "#0000FF",
  // Add other emotions as needed
  anger: "#FF0000",
  sadness: "#0000FF",
  excitement: "#00FF00",
  surprise: "#FFFF00",
  disgust: "#800080",
  neutral: "#CCCCCC"
}), { virtual: true });

// Import the component after all mocks are set up
const Dashboard = require('../Dashboard').default;

// Mock data for testing
const mockMoodData = [
  {
    id: '1',
    mood: 'Happy',
    reason: 'Good weather',
    createdAt: '2023-06-01T12:00:00.000Z',
    timeOfDay: 'earlyMorning'
  },
  {
    id: '2',
    mood: 'Sad',
    reason: 'Bad news',
    createdAt: '2023-06-02T15:30:00.000Z',
    timeOfDay: 'lateAfternoon'
  },
  {
    id: '3',
    mood: 'Excited',
    reason: 'New opportunity',
    createdAt: '2023-06-03T09:45:00.000Z',
    timeOfDay: 'lateMorning'
  }
];

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Set default axios behavior
    axios.get.mockResolvedValue({ data: mockMoodData });
    
    // Mock console.error and console.log
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Mock Date.prototype.toLocaleDateString
    const originalToLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = jest.fn().mockImplementation(function(locale, options) {
      if (this.getTime() === new Date('2023-06-01T12:00:00.000Z').getTime()) {
        return 'Jun 1, 12:00 PM';
      }
      if (this.getTime() === new Date('2023-06-02T15:30:00.000Z').getTime()) {
        return 'Jun 2, 3:30 PM';
      }
      if (this.getTime() === new Date('2023-06-03T09:45:00.000Z').getTime()) {
        return 'Jun 3, 9:45 AM';
      }
      return originalToLocaleDateString.call(this, locale, options);
    });
  });

  afterEach(() => {
    // Restore original methods
    jest.restoreAllMocks();
  });

  // Helper function to render component
  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  // Unit Tests
  
  test('renders dashboard header and filter options correctly', () => {
    renderDashboard();
    
    // Check for main title
    expect(screen.getByText('Mood Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Visualize your emotional patterns and gain insights')).toBeInTheDocument();
    
    // Check for filter options
    expect(screen.getByText('Time Period:')).toBeInTheDocument();
    expect(screen.getByText('Refresh')).toBeInTheDocument();
  });

  test('shows empty state when no moods are available', async () => {
    // Override the axios mock for this test only
    axios.get.mockResolvedValueOnce({ data: [] });
    
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('Welcome to Your Mood Dashboard!')).toBeInTheDocument();
      expect(screen.getByText('You haven\'t logged any moods yet. Start tracking to see patterns and insights about your emotional wellbeing.')).toBeInTheDocument();
      expect(screen.getByText('Log Your First Mood')).toBeInTheDocument();
    });
  });

  test('empty state has working Log Your First Mood link', async () => {
    // Override the axios mock for this test only
    axios.get.mockResolvedValueOnce({ data: [] });
    
    renderDashboard();
    
    await waitFor(() => {
      const logMoodLink = screen.getByText('Log Your First Mood');
      expect(logMoodLink).toBeInTheDocument();
      expect(logMoodLink.closest('[data-testid="mock-link"]')).toHaveAttribute('href', '/mood-capture');
    });
  });

  test('handles API error gracefully', async () => {
    // Mock API error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    
    renderDashboard();
    
    // Check that error is logged
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching or processing moods:', expect.any(Error));
    });
  });

});