// src/components/__tests__/Signup.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock all external modules before importing the component
jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  Heart: () => <div data-testid="heart-icon" />
}));

jest.mock('react-icons/fc', () => ({
  FcGoogle: () => <div data-testid="google-icon" />
}));

// Mock React Router
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock Firebase Auth
const mockCreateUserWithEmailAndPassword = jest.fn();
const mockGetIdToken = jest.fn();
const mockGetAuth = jest.fn(() => ({}));

jest.mock('firebase/auth', () => ({
  getAuth: () => mockGetAuth(),
  createUserWithEmailAndPassword: (...args) => mockCreateUserWithEmailAndPassword(...args),
}));

// Mock fetch API
global.fetch = jest.fn();

// Import the component using require after mocking dependencies
const Signup = require('../SignupPage').default;

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    
    // Reset fetch mock
    global.fetch.mockReset();
    global.fetch.mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })
    );
    
    // Mock console.log to prevent output during tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  // Unit Tests
  
  test('renders first step form correctly', () => {
    render(<Signup />);
    
    expect(screen.getByText('Tell Us About Yourself')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  test('updates state when first step form inputs change', () => {
    render(<Signup />);
    
    const nameInput = screen.getByLabelText('Full Name');
    const ageInput = screen.getByLabelText('Age');
    const genderSelect = screen.getByRole('combobox'); // The select element
    const cityInput = screen.getByLabelText('City');
    const countryInput = screen.getByLabelText('Country');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.change(genderSelect, { target: { value: 'Male' } });
    fireEvent.change(cityInput, { target: { value: 'New York' } });
    fireEvent.change(countryInput, { target: { value: 'USA' } });
    
    expect(nameInput.value).toBe('John Doe');
    expect(ageInput.value).toBe('25');
    expect(genderSelect.value).toBe('Male');
    expect(cityInput.value).toBe('New York');
    expect(countryInput.value).toBe('USA');
  });

  test('shows error when Next is clicked with incomplete first step form', () => {
    render(<Signup />);
    
    // Leave fields empty
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('All fields are required.')).toBeInTheDocument();
  });

  test('advances to second step when Next is clicked with complete first step form', () => {
    render(<Signup />);
    
    // Fill out all required fields in step 1
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    
    // Click Next
    fireEvent.click(screen.getByText('Next'));
    
    // Check that we're now on step 2
    expect(screen.getByText('Create Your Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('goes back to first step when Back is clicked on second step', async () => {
    render(<Signup />);
    
    // Fill out step 1 and advance to step 2
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Now we're on step 2, click Back
    fireEvent.click(screen.getByText('Back'));
    
    // Check that we're back on step 1
    expect(screen.getByText('Tell Us About Yourself')).toBeInTheDocument();
  });

  test('updates state when second step form inputs change', async () => {
    render(<Signup />);
    
    // Fill out step 1 and advance to step 2
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Now we're on step 2, fill out those fields
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });
  
  // Integration Tests
  
  test('shows error when Sign Up is clicked with incomplete second step form', async () => {
    render(<Signup />);
    
    // Fill out step 1 and advance to step 2
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Now we're on step 2, but don't fill out the fields
    
    // Click Sign Up
    fireEvent.click(screen.getByText('Sign Up'));
    
    // Check for error message
    expect(screen.getByText('All fields are required.')).toBeInTheDocument();
  });

  test('shows error when passwords do not match on signup', async () => {
    render(<Signup />);
    
    // Fill out step 1 and advance to step 2
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Now we're on step 2, fill out fields with mismatched passwords
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password456' } });
    
    // Click Sign Up
    fireEvent.click(screen.getByText('Sign Up'));
    
    // Check for error message
    expect(screen.getByText('Passwords do not match!')).toBeInTheDocument();
  });

  test('completes signup process successfully', async () => {
    // Mock successful Firebase auth
    const mockUser = {
      uid: 'user123',
      getIdToken: jest.fn().mockResolvedValue('mock-token')
    };
    
    mockCreateUserWithEmailAndPassword.mockResolvedValue({
      user: mockUser
    });
    
    // Mock getAuth to return a valid object for auth
    mockGetAuth.mockReturnValue({});
    
    render(<Signup />);
    
    // Fill out step 1
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Fill out step 2
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    
    // Click Sign Up
    fireEvent.click(screen.getByText('Sign Up'));
    
    // Wait for async operations to complete
    await waitFor(() => {
      // Check Firebase auth was called
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        {},  // This should match what getAuth() returns
        'john@example.com',
        'password123'
      );
      
      // Check token was requested
      expect(mockUser.getIdToken).toHaveBeenCalled();
      
      // Check fetch was called with correct data
      expect(global.fetch).toHaveBeenCalledWith(
        'https://cuddle-up-backend.onrender.com/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer mock-token'
          },
          body: JSON.stringify({
            name: 'John Doe',
            age: '25',
            gender: 'Male',
            city: 'New York',
            country: 'USA',
            uid: 'user123'
          })
        }
      );
      
      // Check navigation to login page
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('handles Firebase email already in use error', async () => {
    // Mock Firebase auth error
    mockCreateUserWithEmailAndPassword.mockRejectedValue({
      message: 'Firebase: Error (auth/email-already-in-use).'
    });
    
    render(<Signup />);
    
    // Fill out step 1
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Fill out step 2
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    
    // Click Sign Up
    fireEvent.click(screen.getByText('Sign Up'));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Email not available (already in use)')).toBeInTheDocument();
    });
  });

  test('handles Firebase invalid email error', async () => {
    // Mock Firebase auth error
    mockCreateUserWithEmailAndPassword.mockRejectedValue({
      message: 'Firebase: Error (auth/invalid-email).'
    });
    
    render(<Signup />);
    
    // Fill out step 1
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Fill out step 2
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    
    // Click Sign Up
    fireEvent.click(screen.getByText('Sign Up'));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  test('handles Firebase weak password error', async () => {
    // Mock Firebase auth error
    mockCreateUserWithEmailAndPassword.mockRejectedValue({
      message: 'Firebase: Error (auth/weak-password).'
    });
    
    render(<Signup />);
    
    // Fill out step 1
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Fill out step 2
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'weak' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'weak' } });
    
    // Click Sign Up
    fireEvent.click(screen.getByText('Sign Up'));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Password should be at least 6 characters')).toBeInTheDocument();
    });
  });

  test('handles generic error during signup', async () => {
    // Mock Firebase auth error
    mockCreateUserWithEmailAndPassword.mockRejectedValue({
      message: 'Some unknown error'
    });
    
    render(<Signup />);
    
    // Fill out step 1
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Fill out step 2
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    
    // Click Sign Up
    fireEvent.click(screen.getByText('Sign Up'));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('An error occurred, please try again.')).toBeInTheDocument();
    });
  });

  test('navigates to home page when back button is clicked', () => {
    render(<Signup />);
    
    const backButton = screen.getByText('Back to Home');
    fireEvent.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('handles API error during registration', async () => {
    // Mock successful Firebase auth
    const mockUser = {
      uid: 'user123',
      getIdToken: jest.fn().mockResolvedValue('mock-token')
    };
    
    mockCreateUserWithEmailAndPassword.mockResolvedValue({
      user: mockUser
    });
    
    // Mock API error
    global.fetch.mockImplementation(() => 
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Registration failed' })
      })
    );
    
    render(<Signup />);
    
    // Fill out step 1
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Fill out step 2
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    
    // Click Sign Up
    fireEvent.click(screen.getByText('Sign Up'));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('An error occurred, please try again.')).toBeInTheDocument();
    });
  });
});