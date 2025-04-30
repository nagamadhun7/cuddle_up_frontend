describe('Dashboard', () => {
  
  // Login Step: Logging in with valid credentials
  before(() => {
    cy.visit('http://localhost:3000/login'); // Visit the login page
  
    // Log in using valid credentials
    cy.get('input#email').type('test@gmail.com'); // Enter email
    cy.get('input#password').type('testtest'); // Enter password
    cy.contains('Log In').click(); // Click the login button
    
    // Ensure that after login, the user is redirected to /mood-capture first
    cy.url().should('include', '/mood-capture'); // Check if it redirects to /mood-capture
  });

  // After mood capture, visit the /dashboard page
  it('should visit the dashboard after login and mood capture', () => {
    cy.visit('http://localhost:3000/dashboard'); // Directly visit the dashboard URL
    
    // Verify the title or key elements of the dashboard page
    cy.get('h1').should('contain', 'Mood Dashboard');
    
    // Check for presence of major sections
    cy.get('.summary-cards').should('exist'); // Summary cards
    cy.get('.mood-distribution-chart').should('exist'); // Mood distribution chart
    cy.get('.dominant-mood-chart').should('exist'); // Dominant mood chart
    cy.get('.mood-by-time-of-day-chart').should('exist'); // Mood by time of day chart
  });

  // Test 1: Check for empty state on the dashboard when no data is available
  it('should show an empty state on the dashboard when no mood data is available', () => {
    cy.visit('http://localhost:3000/dashboard'); // Visit the dashboard page URL
  
    // Assuming no data is present, check if the empty state message is displayed
    cy.get('.empty-state').should('be.visible');
    cy.get('.empty-state').should('contain', 'Track your mood!'); // Adjust message as needed
  });

  // Test 2: Verify time filter functionality on the dashboard (select time filter "This Week")
  it('should change the time filter on dashboard and update the displayed data', () => {
    cy.visit('http://localhost:3000/dashboard'); // Visit the dashboard URL
    
    // Select a time period from the dropdown (e.g., "This Week")
    cy.get('select').select('This Week');
    
    // Verify that the data changes based on the filter
    cy.get('.mood-distribution-chart').should('not.have.class', 'empty');
    cy.get('.dominant-mood-chart').should('not.have.class', 'empty');
  });

  // Test 3: Check that mood data is displayed correctly on the dashboard
  it('should display mood data in dashboard charts correctly', () => {
    cy.visit('http://localhost:3000/dashboard'); // Visit the dashboard URL
  
    // Check that the mood distribution chart has data
    cy.get('.mood-distribution-chart').find('.echarts-for-react').should('exist');
    cy.get('.mood-distribution-chart').find('.echarts-for-react').should('not.be.empty');
  
    // Check that the dominant mood chart is also populated
    cy.get('.dominant-mood-chart').find('.echarts-for-react').should('exist');
    cy.get('.dominant-mood-chart').find('.echarts-for-react').should('not.be.empty');
  });

  // Test 4: Verify that recent mood entries are displayed correctly on the dashboard
  it('should display recent mood entries on the dashboard table', () => {
    cy.visit('http://localhost:3000/dashboard'); // Visit the dashboard URL
  
    // Verify the presence of the recent mood entries table
    cy.get('.recent-mood-entries').should('exist');
  
    // Check if the first entry has the correct format
    cy.get('.recent-mood-entries tbody tr')
      .first()
      .within(() => {
        cy.get('td').eq(0).should('contain', 'Happy'); // Mood column
        cy.get('td').eq(1).should('contain', 'Work'); // Reason column
        cy.get('td').eq(2).should('contain', 'Morning'); // Time of Day
      });
  });
});
