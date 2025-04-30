describe('MoodCapture Page - Complete Functional Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/mood-capture');
  });

  it('Loads the MoodCapture UI correctly', () => {
    cy.contains('Capture Your Mood').should('be.visible');
    cy.get('button').should('have.length.greaterThan', 0);
    cy.contains('How are you feeling?').should('exist');
  });

  it('Selects a mood and displays insights section', () => {
    cy.contains('Happy')
      .parent()
      .find('button')
      .click();

    cy.contains('Mood Analysis: Happy').should('be.visible');
  });

  it('Opens and closes all media input modals (Photo, Audio, Text)', () => {
    const types = [
      { label: 'Picture Your Emotions', modalTitle: 'Capture Your Expression' },
      { label: 'Speak Up, Share Your Mood', modalTitle: 'Record Your Voice' },
      { label: 'Type to Express', modalTitle: 'Share Your Thoughts' }
    ];

    types.forEach(({ label, modalTitle }) => {
      cy.contains(label).click();
      cy.contains(modalTitle).should('be.visible');
      cy.get('button').contains('Cancel').click();
    });
  });

  it('Selects a reason after mood selection', () => {
    cy.contains('Sad')
      .parent()
      .find('button')
      .click();

    cy.get('select#moodReason').should('exist').then(($select) => {
      const options = $select.find('option');
      if (options.length > 1) {
        cy.get('select#moodReason').select(options.eq(1).text());
      }
    });
  });

  it('Enters and submits a custom reason (if "Other" selected)', () => {
    cy.contains('Angry')
      .parent()
      .find('button')
      .click();

    cy.get('select#moodReason').then(($select) => {
      if ($select.find('option:contains("Other")').length > 0) {
        cy.get('select#moodReason').select('Other');
        cy.get('input#customReason').type('Testing Cypress Reason');
        cy.contains('Add Reason').click();

        // Confirm reason was added
        cy.get('select#moodReason').should('contain', 'Testing Cypress Reason');
      }
    });
  });

  

  
});
