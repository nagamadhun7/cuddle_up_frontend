describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login'); // Change this URL if needed
    });
  
    it('renders the login form correctly', () => {
      cy.contains('Welcome Back!').should('be.visible');
      cy.get('input#email').should('exist');
      cy.get('input#password').should('exist');
      cy.contains('Log In').should('exist');
      cy.contains('Log In with Gmail').should('exist');
    });
  
    it('shows error on invalid credentials', () => {
      cy.get('input#email').type('invalid@email.com');
      cy.get('input#password').type('wrongpassword');
      cy.contains('Log In').click();
  
      // Adjust this based on actual UI feedback
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Error logging in');
      });
    });
  
    it('redirects on valid login', () => {
      cy.get('input#email').type('test@gmail.com'); 
      cy.get('input#password').type('testtest'); 
      cy.contains('Log In').click();
  
      cy.url().should('include', '/mood-capture');
    });
  });
  