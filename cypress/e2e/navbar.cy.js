describe('Navbar', () => {
    beforeEach(() => {
      cy.visit('/'); // Visit the page where the Navbar is rendered
    });
  
    context('when the user is logged in', () => {
      it('should display the correct navigation links', () => {
        // Assuming you have a login mock or session set up
        cy.login(); // Mock user login here if necessary (You can create a custom command for logging in)
  
        // Check that the user-specific links are visible
        cy.get('a[href="/friends"]').should('be.visible');
        cy.get('a[href="/profile"]').should('be.visible');
        cy.get('a[href="/pomodoro"]').should('be.visible');
        cy.get('a[href="/dashboard"]').should('be.visible');
        cy.get('button').contains('Logout').should('be.visible');
      });
  
      it('should log out the user and redirect to the home page', () => {
        // Log in first (or assume the user is already logged in)
        cy.login();
  
        // Click the Logout button
        cy.get('button').contains('Logout').click();
  
        // Check that the user is redirected to the home page
        cy.url().should('include', '/');
        cy.get('a[href="/login"]').should('be.visible');
      });
    });
  
    context('when the user is a guest', () => {
      it('should display Login and Sign Up links', () => {
        // Check that login and sign-up links are visible when not logged in
        cy.get('a[href="/login"]').should('be.visible');
        cy.get('a[href="/signUp"]').should('be.visible');
      });
    });
  
    context('Mobile Menu', () => {
      it('should toggle the mobile menu when the menu button is clicked', () => {
        // Click the mobile menu button (Hamburger menu)
        cy.get('button').first().click(); // First button should be the hamburger menu
  
        // Check that the mobile menu is open
        cy.get('.md:hidden').should('be.visible');
  
        // Click the mobile menu button again to close it
        cy.get('button').first().click();
  
        // Check that the mobile menu is closed
        cy.get('.md:hidden').should('not.be.visible');
      });
    });
  
    context('Premium Features Link', () => {
      it('should show the Premium Features link correctly', () => {
        cy.get('a[href="/premium-features"]').should('be.visible');
      });
    });
  });
  