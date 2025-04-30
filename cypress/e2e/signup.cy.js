describe('Signup Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup'); // Update the URL if your route differs
  });

  it('should complete step 1 and proceed to step 2', () => {
    // Fill out personal info
    cy.get('#name').type('John Doe');
    cy.get('#age').type('28');
    cy.get('select').select('Male');
    cy.get('#city').type('New York');
    cy.get('#country').type('USA');

    cy.contains('Next').click();

    // Check if step 2 fields are visible
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#confirmPassword').should('be.visible');
  });

  it('should show an error if passwords do not match', () => {
    cy.get('#name').type('Jane Doe');
    cy.get('#age').type('25');
    cy.get('select').select('Female');
    cy.get('#city').type('LA');
    cy.get('#country').type('USA');
    cy.contains('Next').click();

    cy.get('#email').type('janedoe@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('differentPassword');

    cy.contains('Sign Up').click();

    // Wait for the error message to appear
    cy.contains('Passwords do not match!').should('exist');
  });

  it('should show error if email already exists', () => {
    cy.get('#name').type('Test User');
    cy.get('#age').type('30');
    cy.get('select').select('Other');
    cy.get('#city').type('TestCity');
    cy.get('#country').type('TestCountry');
    cy.contains('Next').click();

    // Use an existing email address that is already in the database (you can use a mock or real email that exists)
    cy.get('#email').type('existinguser@example.com');
    cy.get('#password').type('test1234');
    cy.get('#confirmPassword').type('test1234');
    
    // Click on 'Sign Up'
    cy.contains('Sign Up').click();

    // Wait for the error message to appear
    cy.contains('Email not available (already in use)', { timeout: 10000 }).should('exist');
  });
});
