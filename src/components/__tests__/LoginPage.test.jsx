
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock all external modules before importing any components
jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Heart: () => <div data-testid="heart-icon" />
}));

jest.mock('react-icons/fc', () => ({
  FcGoogle: () => <div data-testid="google-icon" />
}));

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  const mockNavigate = jest.fn();
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => <div>{children}</div>,
    useNavigate: () => mockNavigate
  };
});

const mockSignInWithEmailAndPassword = jest.fn();
const mockGoogleAuthProvider = jest.fn();
const mockGetAuth = jest.fn();
const mockSignInWithPopup = jest.fn();

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
  GoogleAuthProvider: jest.fn(() => mockGoogleAuthProvider()),
  getAuth: () => mockGetAuth(),
  signInWithPopup: (...args) => mockSignInWithPopup(...args)
}));

const mockPost = jest.fn();
jest.mock('axios', () => ({
  post: (...args) => mockPost(...args),
  get: jest.fn().mockResolvedValue({ data: {} }),
  create: jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({ data: {} }),
    post: jest.fn().mockResolvedValue({ data: {} })
  })
}));

jest.mock('../../firebaseConfig', () => ({
  auth: {}
}));

// Now import the component
const LoginPage = require('../LoginPage').default;

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders login form elements', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in with gmail/i })).toBeInTheDocument();
  });
  
  test('handles email/password input changes', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
  
  test('handles login form submission', async () => {
    const mockUser = {
      uid: 'user123',
      getIdToken: jest.fn().mockResolvedValue('token123')
    };
    
    mockSignInWithEmailAndPassword.mockResolvedValueOnce({ 
      user: mockUser
    });
    
    mockPost.mockResolvedValueOnce({ data: { success: true } });
    
    const navigate = require('react-router-dom').useNavigate();
    
    render(<LoginPage />);
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'test@example.com' } 
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'password123' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /log in$/i }));
    
    // Check that the sign in function was called with correct args
    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      'password123'
    );
    
    // Wait for the async operations to complete
    await waitFor(() => {
      // Check token was requested
      expect(mockUser.getIdToken).toHaveBeenCalledWith(true);
      
      // Check update status API call
      expect(mockPost).toHaveBeenCalledWith(
        'https://cuddle-up-backend.onrender.com/api/users/updateUserStatus',
        { userId: 'user123', status: 'active' },
        { headers: { Authorization: 'Bearer token123' } }
      );
      
      // Check navigation
      expect(navigate).toHaveBeenCalledWith('/mood-capture');
    });
  });
  
  test('handles login error', async () => {
    // Mock window.alert
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    // Mock failed login
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid credentials'));
    
    render(<LoginPage />);
    
    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'test@example.com' } 
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'wrong-password' } 
    });
    
    fireEvent.click(screen.getByRole('button', { name: /log in$/i }));
    
    // Wait for the alert to be called
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Error logging in. Please check your credentials!'
      );
    });
    
    mockAlert.mockRestore();
  });
  
  test('handles Google login', async () => {
    const mockUser = {
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      uid: 'google-user-123',
      getIdToken: jest.fn().mockResolvedValue('google-token-123')
    };
    
    mockGetAuth.mockReturnValueOnce({
      currentUser: mockUser
    });
    
    mockSignInWithPopup.mockResolvedValueOnce({});
    
    // Mock global fetch
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ success: true })
    });
    
    // Mock console.log
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<LoginPage />);
    
    // Click Google login button
    fireEvent.click(screen.getByRole('button', { name: /log in with gmail/i }));
    
    await waitFor(() => {
      expect(mockSignInWithPopup).toHaveBeenCalled();
      expect(mockUser.getIdToken).toHaveBeenCalledWith(true);
      
      expect(global.fetch).toHaveBeenCalledWith(
        "https://cuddle-up-backend.onrender.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer google-token-123"
          },
          body: JSON.stringify({
            name: 'Test User',
            age: 'Unknown',
            gender: 'Unknown',
            city: 'Unknown',
            country: 'Unknown',
            photoURL: 'https://example.com/photo.jpg',
            uid: 'google-user-123',
          }),
        }
      );
    });
    
    mockConsoleLog.mockRestore();
  });
  
  test('handles Google login error', async () => {
    // Mock window.alert
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    // Mock failed Google login
    mockSignInWithPopup.mockRejectedValueOnce(new Error('Google auth failed'));
    
    render(<LoginPage />);
    
    // Click Google login button
    fireEvent.click(screen.getByRole('button', { name: /log in with gmail/i }));
    
    // Wait for the alert to be called
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        'Error logging in with Google!'
      );
    });
    
    mockAlert.mockRestore();
  });
  
  test('navigation buttons work', () => {
    const navigate = require('react-router-dom').useNavigate();
    
    render(<LoginPage />);
    
    // Test back to home
    fireEvent.click(screen.getByText('Back to Home'));
    expect(navigate).toHaveBeenCalledWith('/');
    
    navigate.mockClear();
    
    // Test forgot password
    fireEvent.click(screen.getByText('Forgot password?'));
    expect(navigate).toHaveBeenCalledWith('/');
  });
});