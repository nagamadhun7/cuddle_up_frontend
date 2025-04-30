describe('Mood Dashboard', () => {
  
    // Test 1: Verify dashboard renders properly
    it('should render the dashboard properly', () => {
      cy.visit('/'); // Visit the URL where your app is running
  
      // Verify the title of the page
      cy.get('h1').should('contain', 'Mood Dashboard');
  
      // Check for presence of major sections
      cy.get('.summary-cards').should('exist'); // Check for summary cards
      cy.get('.mood-distribution-chart').should('exist'); // Mood distribution chart
      cy.get('.dominant-mood-chart').should('exist'); // Dominant mood chart
      cy.get('.mood-by-time-of-day-chart').should('exist'); // Mood by time of day chart
    });
  
    // Test 2: Check for empty state when no data is available
    it('should show an empty state message when no mood data is available', () => {
      cy.visit('/'); // Visit the URL
  
      // Assuming no data is present, check if the empty state message is displayed
      cy.get('.empty-state').should('be.visible');
      cy.get('.empty-state').should('contain', 'Track your mood!');
    });
  
    // Test 3: Verify time filter functionality (select time filter "This Week")
    it('should change the time filter and update the displayed data', () => {
      cy.visit('/'); // Visit the URL
      
      // Select a time period from the dropdown (e.g., "This Week")
      cy.get('select').select('This Week');
      
      // Verify that the data changes based on the filter
      cy.get('.mood-distribution-chart').should('not.have.class', 'empty');
      cy.get('.dominant-mood-chart').should('not.have.class', 'empty');
    });
  
    // Test 4: Check that mood data is displayed correctly in charts
    it('should display mood data in charts correctly', () => {
      cy.visit('/'); // Visit the dashboard
  
      // Check that the mood distribution chart has data
      cy.get('.mood-distribution-chart').find('.echarts-for-react').should('exist');
      cy.get('.mood-distribution-chart').find('.echarts-for-react').should('not.be.empty');
  
      // Check that the dominant mood chart is also populated
      cy.get('.dominant-mood-chart').find('.echarts-for-react').should('exist');
      cy.get('.dominant-mood-chart').find('.echarts-for-react').should('not.be.empty');
    });
  
    // Test 5: Verify that recent mood entries are displayed in the table
    it('should display recent mood entries in the table', () => {
      cy.visit('/'); // Visit the URL
  
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
  