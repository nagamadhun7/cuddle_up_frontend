// cypress/e2e/signup.cy.js

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
  
      cy.contains('Passwords do not match!').should('exist');
    });
  
    it('should show error if email already exists', () => {
      cy.get('#name').type('Test User');
      cy.get('#age').type('30');
      cy.get('select').select('Other');
      cy.get('#city').type('TestCity');
      cy.get('#country').type('TestCountry');
      cy.contains('Next').click();
  
      cy.get('#email').type('existinguser@example.com'); // Use a real existing test user
      cy.get('#password').type('test1234');
      cy.get('#confirmPassword').type('test1234');
      cy.contains('Sign Up').click();
  
      cy.contains('Email not available').should('exist'); // or use full message if exact match needed
    });
  });
  