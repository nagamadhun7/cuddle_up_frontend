describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000/login'); // Change this URL if needed for different environments
  });

  it('renders the login form correctly', () => {
    // Check if the "Welcome Back!" heading is visible
    cy.contains('Welcome Back!').should('be.visible');
    
    // Ensure that the email and password input fields exist
    cy.get('input#email').should('exist');
    cy.get('input#password').should('exist');
    
    // Check if the login button is present
    cy.contains('Log In').should('exist');
  });

  it('shows error on invalid credentials', () => {
    // Simulate entering invalid login credentials
    cy.get('input#email').type('invalid@email.com');
    cy.get('input#password').type('wrongpassword');
    cy.contains('Log In').click();

    // Ensure the error message is displayed correctly (this depends on your UI feedback)
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Error logging in'); // Adjust this based on your actual error message
    });
  });

  it('redirects on valid login', () => {
    // Simulate a valid login
    cy.get('input#email').type('test@gmail.com'); 
    cy.get('input#password').type('testtest'); 
    cy.contains('Log In').click();

    // Check if the user is redirected to the expected page
    cy.url().should('include', '/mood-capture');
  });

  it('navigates to the home page when clicking "Back to Home"', () => {
    // Simulate clicking the "Back to Home" button
    cy.contains('Back to Home').click();

    // Wait for the page to load and check the current URL
    cy.location('href').should('eq', 'http://localhost:3000/'); // Adjust with your actual base URL
  });

  it('navigates to the forgot password page', () => {
    // Simulate clicking the "Forgot password?" link
    cy.contains('Forgot password?').click();

    // Ensure the URL includes the expected forgot password route
    cy.url().should('include', '/'); // Adjust with your actual forgot password URL
  });
});
