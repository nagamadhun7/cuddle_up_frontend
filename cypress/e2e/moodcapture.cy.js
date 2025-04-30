describe('MoodCapture Component', () => {
    beforeEach(() => {
      // You might want to set up some initial state or visit a page before each test
      cy.visit('/'); // adjust the URL based on where this component is rendered
    });
  
    it('should display an error message when errorMessage is set', () => {
      // Assuming you can manipulate the state to show the error
      cy.window().then((win) => {
        win.document.body.innerHTML = ''; // Clear any previous content if needed
        // Manually setting the errorMessage for testing
        win.errorMessage = 'An error occurred!';
      });
  
      cy.get('.bg-red-50').should('exist');  // This is the container for the error message
      cy.get('.text-red-600').should('contain.text', 'An error occurred!');
    });
  
    it('should display the "Save Mood" button when user is authenticated and not a guest', () => {
      // Mock the state of user and guest
      cy.window().then((win) => {
        win.isGuest = false;
        win.user = { id: 1, name: 'John Doe' }; // Mock user object
      });
  
      // Check if the button is displayed
      cy.get('button').contains('Save Mood').should('be.visible');
    });
  
    it('should not display the "Save Mood" button if the user is a guest', () => {
      // Mock the guest state
      cy.window().then((win) => {
        win.isGuest = true;
        win.user = null; // No user
      });
  
      // Ensure the "Save Mood" button is not visible
      cy.get('button').contains('Save Mood').should('not.exist');
    });
  
    it('should open the Mood Input Modal when isModalOpen is true', () => {
      // Trigger modal open (mock state)
      cy.window().then((win) => {
        win.isModalOpen = true;
      });
  
      // Ensure modal is visible
      cy.get('.MoodInputModal').should('be.visible');
    });
  
    it('should close the Mood Input Modal when the close button is clicked', () => {
      // Trigger modal open (mock state)
      cy.window().then((win) => {
        win.isModalOpen = true;
      });
  
      // Close the modal by clicking the close button
      cy.get('.MoodInputModal .close-btn').click();
  
      // Ensure modal is not visible
      cy.get('.MoodInputModal').should('not.exist');
    });
  
    it('should handle the Save Mood button click', () => {
      // Mock user state
      cy.window().then((win) => {
        win.isGuest = false;
        win.user = { id: 1, name: 'John Doe' }; // Mock user
      });
  
      // Stub the save mood function
      cy.stub(win, 'handleSaveMood').as('saveMoodStub');
  
      // Click the "Save Mood" button
      cy.get('button').contains('Save Mood').click();
  
      // Ensure the save mood function was called
      cy.get('@saveMoodStub').should('have.been.calledOnce');
    });
  });
  