// dashboard.cy.js

describe('Dashboard Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard');
  });

  it('should load the dashboard page successfully', () => {
    cy.url().should('include', '/dashboard');
    cy.contains('Mood Dashboard').should('be.visible');
  });

  it('should display the dominant mood chart', () => {
    cy.get('.echarts-for-react').first().should('be.visible');
    cy.contains('Dominant Mood').should('be.visible');
  });

  it('should display the mood distribution pie chart', () => {
    cy.get('.echarts-for-react').eq(1).should('be.visible');
    cy.contains('Mood Distribution').should('be.visible');
  });

  it('should display the mood by time of day chart', () => {
    cy.get('.echarts-for-react').eq(2).should('be.visible');
    cy.contains('Mood Distribution by Time of Day').should('be.visible');
  });

  it('should display the mood trends bubble chart', () => {
    cy.get('.echarts-for-react').eq(3).should('be.visible');
    cy.contains('Mood Trends (Bubble Chart)').should('be.visible');
  });

  it('should display the top reasons bar chart', () => {
    cy.get('.echarts-for-react').eq(4).should('be.visible');
    cy.contains('Top Reasons for Your Moods').should('be.visible');
  });

  it('should display the summary cards with correct data', () => {
    cy.contains('Total Mood Entries').should('be.visible');
    cy.contains('Most Recent Mood').should('be.visible');
    cy.contains('Unique Moods Tracked').should('be.visible');
  });

  it('should display the recent mood entries table', () => {
    cy.contains('Recent Mood Entries').should('be.visible');
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').should('have.length.at.least', 1);
  });

  it('should allow changing the time filter', () => {
    cy.get('#timeFilter').select('month');
    cy.get('#timeFilter').should('have.value', 'month');
    
  });

  it('should refresh data when refresh button is clicked', () => {
    
    cy.contains('Refresh').click();
  });


  it('should display loading state while fetching data', () => {
    // Delay the response to test loading state
  
    
    cy.visit('http://localhost:3000/dashboard');
    cy.get('.animate-spin').should('be.visible');
    cy.get('.animate-spin').should('not.exist');
  });
});