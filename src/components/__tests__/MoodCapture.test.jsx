// src/components/__tests__/MoodCapture.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoodCapture from '../MoodCapture';

// Mock the child components
jest.mock('../MoodInputModal', () => {
  return function MockMoodInputModal({ isOpen, onClose, inputType, onMoodDetected }) {
    if (!isOpen) return null;
    return (
      <div data-testid="mood-input-modal">
        <p>Modal Type: {inputType}</p>
        <button onClick={onClose}>Close Modal</button>
        <button 
          onClick={() => onMoodDetected({ 
            dominantEmotion: 'Happy',
            confidence: 0.85,
            type: inputType 
          })}
        >
          Detect Mood
        </button>
      </div>
    );
  };
});

// Mock socket.io
jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const io = jest.fn(() => ({ emit, on }));
  return { io };
});

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: () => ({
    currentUser: {
      uid: 'test-user-id',
      getIdToken: jest.fn().mockResolvedValue('mock-token')
    }
  })
}));

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: [] }),
  post: jest.fn().mockResolvedValue({ data: { success: true } })
}));

// Mock fetch
global.fetch = jest.fn().mockImplementation(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { emotion: 'Happy', reason: 'Good weather' },
      { emotion: 'Happy', reason: 'Time with friends' },
      { emotion: 'Sad', reason: 'Bad news' }
    ])
  })
);

// Mock emotion colors
jest.mock('../../emotionColors.json', () => ({
  happy: '#FFD700',
  sad: '#B0C4DE',
  angry: '#FF6347',
  excited: '#32CD32',
  worried: '#FFA500',
  crying: '#0000FF'
}), { virtual: true });

describe('MoodCapture Component', () => {
  // Default props
  const defaultProps = {
    user: { uid: 'test-user-id' },
    isGuest: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    // Mock console.log and console.error
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Basic render test
  test('renders the mood capture page correctly', () => {
    render(<MoodCapture {...defaultProps} />);
    
    // Check for main heading and description
    expect(screen.getByText('Capture Your Mood')).toBeInTheDocument();
    expect(screen.getByText('Express how you feel and track your emotions over time.')).toBeInTheDocument();
    
    // Check for emotion selection section
    expect(screen.getByText('How are you feeling?')).toBeInTheDocument();
    
    // Check for media input section
    expect(screen.getByText('Capture Your Mood with Media')).toBeInTheDocument();
  });

  // Test mood selection
  test('selects a mood when clicking on a mood button', () => {
    render(<MoodCapture {...defaultProps} />);
    
    // Find Happy mood button by its emoji and click it
    const happyMoodButton = screen.getByText('😊').closest('button');
    fireEvent.click(happyMoodButton);
    
    // Check that the mood insights section appears
    waitFor(() => {
      expect(screen.getByText('Mood Analysis: Happy')).toBeInTheDocument();
    });
  });

  // Test opening modal
  test('opens the modal when a media input option is clicked', () => {
    render(<MoodCapture {...defaultProps} />);
    
    // Find media input buttons
    const mediaButtons = screen.getAllByText(/Type to Express|Speak Up, Share Your Mood|Picture Your Emotions/);
    
    // Click on text input option
    fireEvent.click(mediaButtons[2]); // Text option
    
    // Check that modal opens
    expect(screen.getByTestId('mood-input-modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Type: text')).toBeInTheDocument();
  });

  // Test mood detection from modal
  test('processes detected mood from modal', async () => {
    render(<MoodCapture {...defaultProps} />);
    
    // Open modal
    const mediaButtons = screen.getAllByText(/Type to Express|Speak Up, Share Your Mood|Picture Your Emotions/);
    fireEvent.click(mediaButtons[0]); // Photo option
    
    // Click detect mood button in modal
    const detectMoodButton = screen.getByText('Detect Mood');
    fireEvent.click(detectMoodButton);
    
    // Check that mood was processed
    await waitFor(() => {
      expect(screen.getByText('Mood Analysis: Happy')).toBeInTheDocument();
    });
  });

  // Test for guest mode
  test('save mood button is not shown for guest users', async () => {
    render(<MoodCapture {...defaultProps} isGuest={true} />);
    
    // Select a mood
    const happyMoodButton = screen.getByText('😊').closest('button');
    fireEvent.click(happyMoodButton);
    
    // Check that the save button is not present
    await waitFor(() => {
      expect(screen.queryByText('Save Mood')).not.toBeInTheDocument();
    });
  });

  // Test for logged-in users
  test('save mood button is shown for logged-in users', async () => {
    render(<MoodCapture {...defaultProps} />);
    
    // Select a mood
    const happyMoodButton = screen.getByText('😊').closest('button');
    fireEvent.click(happyMoodButton);
    
    // Select a reason from dropdown
    await waitFor(() => {
      const reasonSelect = screen.getByLabelText('What factors contributed to this mood?');
      fireEvent.change(reasonSelect, { target: { value: 'Good weather' } });
    });
    
    // Check that the save button is present
    await waitFor(() => {
      expect(screen.getByText('Save Mood')).toBeInTheDocument();
    });
  });
});