// src/components/__tests__/MoodInputModal.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoodInputModal from '../MoodInputModal';

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
  post: jest.fn().mockResolvedValue({
    data: {
      dominantEmotion: 'Happy',
      confidence: 0.85
    }
  })
}));

// Mock the global fetch
global.fetch = jest.fn().mockImplementation(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      dominantEmotion: 'Happy',
      confidence: 0.85
    })
  })
);

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');

// Mock MediaRecorder
global.MediaRecorder = jest.fn().mockImplementation(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  ondataavailable: jest.fn(),
  onstop: jest.fn(),
  stream: {
    getTracks: () => [{
      stop: jest.fn()
    }]
  }
}));

// Mock navigator.mediaDevices
global.navigator.mediaDevices = {
  getUserMedia: jest.fn().mockResolvedValue({
    getTracks: () => [{
      stop: jest.fn()
    }]
  })
};

describe('MoodInputModal Component', () => {
  // Setup default props
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    inputType: 'text',
    onMoodDetected: jest.fn(),
    isGuest: false
  };

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.log to prevent noise in test output
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Basic render tests for each input type
  test('renders text input mode correctly', () => {
    render(<MoodInputModal {...defaultProps} inputType="text" />);
    
    expect(screen.getByText('Share Your Thoughts')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your thoughts...')).toBeInTheDocument();
  });

  test('renders audio input mode correctly', () => {
    render(<MoodInputModal {...defaultProps} inputType="audio" />);
    
    expect(screen.getByText('Record Your Voice')).toBeInTheDocument();
    expect(screen.getByText('Start Recording')).toBeInTheDocument();
  });

  test('renders photo input mode correctly', () => {
    render(<MoodInputModal {...defaultProps} inputType="photo" />);
    
    expect(screen.getByText('Capture Your Expression')).toBeInTheDocument();
    expect(screen.getByText('Choose from Device')).toBeInTheDocument();
    expect(screen.getByText('Take Selfie')).toBeInTheDocument();
  });

  // Test that modal doesn't render when closed
  test('does not render when isOpen is false', () => {
    const { container } = render(<MoodInputModal {...defaultProps} isOpen={false} />);
    
    // The container should be empty since the modal shouldn't render
    expect(container.firstChild).toBeNull();
  });

  // Test guest mode message
  test('shows guest mode message when isGuest is true', () => {
    render(<MoodInputModal {...defaultProps} isGuest={true} />);
    
    expect(screen.getByText('Guest Mode:')).toBeInTheDocument();
    expect(screen.getByText('Your mood will be analyzed but not saved.')).toBeInTheDocument();
  });

  // Test basic interaction - text input
  test('updates text input value when typing', () => {
    render(<MoodInputModal {...defaultProps} inputType="text" />);
    
    const textArea = screen.getByPlaceholderText('Type your thoughts...');
    fireEvent.change(textArea, { target: { value: 'I am feeling happy today!' } });
    
    expect(textArea.value).toBe('I am feeling happy today!');
  });

  // Test close button functionality
  test('calls onClose when close button is clicked', () => {
    render(<MoodInputModal {...defaultProps} />);
    
    // Find close button (it's an SVG within a button)
    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  // Test cancel button functionality
  test('calls onClose when cancel button is clicked', () => {
    render(<MoodInputModal {...defaultProps} />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  // Test analyze button disabled state
  test('analyze button is disabled when text input is empty', () => {
    render(<MoodInputModal {...defaultProps} inputType="text" />);
    
    const analyzeButton = screen.getByText('Analyze Mood');
    expect(analyzeButton).toBeDisabled();
    
    // Add text to enable the button
    const textArea = screen.getByPlaceholderText('Type your thoughts...');
    fireEvent.change(textArea, { target: { value: 'Some text' } });
    
    expect(analyzeButton).not.toBeDisabled();
  });
});