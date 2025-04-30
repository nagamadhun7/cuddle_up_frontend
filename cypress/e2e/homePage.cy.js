describe('HomePage', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/'); // This will load your homepage, update the URL if necessary
    });
  
    it('should display the homepage with the correct title and buttons', () => {
      cy.contains('CuddleUp'); // Check if the page contains the app title "CuddleUp"
      cy.contains('Capture the Quiet in Your Heart'); // Check for the tagline
  
      // Check if all buttons are visible and contain correct text
      cy.get('button').contains('Log In').should('be.visible');
      cy.get('button').contains('Sign Up').should('be.visible');
      cy.get('button').contains('Continue as Guest').should('be.visible');
    });
  
    it('should navigate to the login page when the "Log In" button is clicked', () => {
      // Click on the "Log In" button
      cy.get('button').contains('Log In').click();
  
      // Check if the URL is correct and navigated to the login page
      cy.url().should('include', '/login');
    });
  
    it('should navigate to the sign-up page when the "Sign Up" button is clicked', () => {
      // Click on the "Sign Up" button
      cy.get('button').contains('Sign Up').click();
  
      // Check if the URL is correct and navigated to the sign-up page
      cy.url().should('include', '/signUp');
    });
  
    it('should enable guest mode when the "Continue as Guest" button is clicked', () => {
      // You will need to mock the enableGuestMode function in your parent component for this test
      // For this example, we’ll simulate a guest mode activation and check the behavior
  
      // Check for the button and simulate clicking it
      cy.get('button').contains('Continue as Guest').click();
  
      // Assuming your app shows some indication of guest mode (e.g., redirects to home page or shows some message)
      // Change this according to your app's behavior when guest mode is enabled.
      cy.url().should('eq', 'http://localhost:3000/mood-capture'); // Example check to stay on the homepage
  
      
    });
  
    it('should have animated background circles', () => {
      // Check that animated circles are present
      cy.get('.animate-pulse').should('have.length.greaterThan', 0);
    });
  });
  