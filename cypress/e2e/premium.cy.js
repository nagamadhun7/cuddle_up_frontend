describe('Premium Features Page', () => {
    beforeEach(() => {
      // Load the page
      cy.visit('/premium-feature'); // Adjust this URL based on your routing setup
    });
  
    it('should display the page title', () => {
      cy.get('h1').contains('Premium Features');
    });
  
    it('should show the mood-based food recommendations section', () => {
      cy.get('h2').contains('Mood-Based Food Recommendations');
      cy.get('.grid-cols-3 .bg-yellow-100').should('contain', '😊');
      cy.get('.grid-cols-3 .bg-blue-100').should('contain', '😔');
      cy.get('.grid-cols-3 .bg-purple-100').should('contain', '😴');
    });
  
    it('should render the food plate SVG correctly', () => {
      cy.get('svg').should('have.length', 1); // Check for 1 SVG element on the page
      cy.get('circle').should('have.length', 6); // Check if there are the expected number of circles in the SVG
    });
  
    it('should show the task prioritization section', () => {
      cy.get('h2').contains('Eunoia: Task Prioritization');
      cy.get('.bg-gradient-to-r').should('contain', 'Eunoia intelligently rearranges');
      cy.get('.flex.items-center').should('have.length', 3); // Check for the 3 items with check-circle
    });
  
    it('should show the advanced mood analytics section', () => {
      cy.get('h2').contains('Advanced Mood Analytics');
      cy.get('svg').should('have.length', 2); // Check for 2 SVG elements in this section (BarChart and Calendar icons)
    });
  
    it('should show the unlock premium button', () => {
      cy.get('button').contains('Unlock Premium Now').should('exist');
      cy.get('button').should('have.class', 'bg-gradient-to-r');
    });
  
    it('should navigate correctly when the button is clicked', () => {
      cy.get('button').contains('Unlock Premium Now').click();
      // Assuming the button leads to a new page, you can test the navigation
      cy.url().should('include', '/checkout'); // Adjust based on your actual navigation
    });
  });
  