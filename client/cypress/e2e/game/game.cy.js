/// <reference types="cypress" />

describe('Game Application', () => {
    beforeEach(() => {
      cy.visit('/games/cozy-routines');
      
      // Wait for the game to load completely
      cy.get('[data-testid="menu-screen"]', { timeout: 10000 }).should('be.visible');
    });
    
    it('displays the game title and menu options', () => {
      cy.contains('Routine Rush').should('be.visible');
      cy.contains('Build Your Best Day!').should('be.visible');
      
      // Check if menu buttons are visible
      cy.contains('Morning Routine').should('be.visible');
      cy.contains('Afternoon Routine').should('be.visible');
      cy.contains('Night Routine').should('be.visible');
    });
    
    it('navigates to Morning Routine and displays the first task', () => {
      // Click on the Morning Routine button
      cy.contains('Morning Routine').click();
      
      // Verify that we're on the routine screen
      cy.get('[data-testid="routine-screen"]').should('be.visible');
      
      // Check for the routine title
      cy.contains('Morning Routine').should('be.visible');
      
      // Check for the first task (Brush Teeth)
      cy.contains('Brush Teeth').should('be.visible');
      cy.contains('Catch the runaway toothbrush!').should('be.visible');
    });
    
    it('navigates back to menu from a routine', () => {
      // Go to Morning Routine
      cy.contains('Morning Routine').click();
      
      // Click the back button
      cy.get('[data-testid="back-button"]').click();
      
      // Verify we're back at the menu
      cy.get('[data-testid="menu-screen"]').should('be.visible');
      cy.contains('Routine Rush').should('be.visible');
    });
    
    it('shows completion message when a task is completed', () => {
      // Go to Morning Routine
      cy.contains('Morning Routine').click();
      
      // Mock task completion
      // Since we can't directly interact with the game mechanics in a real test,
      // we're using a workaround by exposing a test helper function
      cy.window().then((win) => {
        // Check if the helper function exists
        if (typeof win.__completeCurrentTask === 'function') {
          win.__completeCurrentTask();
        } else {
          // Fallback: directly click the complete button if our test helper isn't available
          cy.get('[data-testid="complete-task"]').click();
        }
      });
      
      // Check for the completion message
      cy.contains('Great job!').should('be.visible');
      cy.contains('You completed the task!').should('be.visible');
      
      // Wait for auto-progression
      cy.wait(2000);
      
      // Verify the second task is now shown
      cy.contains('Eat Breakfast').should('be.visible');
    });
    
    it('can navigate through the entire Morning Routine flow', () => {
      // Go to Morning Routine
      cy.contains('Morning Routine').click();
      
      // Complete all 4 tasks
      for (let i = 0; i < 4; i++) {
        // Complete the current task
        cy.window().then((win) => {
          if (typeof win.__completeCurrentTask === 'function') {
            win.__completeCurrentTask();
          } else {
            cy.get('[data-testid="complete-task"]').click();
          }
        });
        
        // Wait for the completion animation
        cy.wait(2000);
      }
      
      // Verify we're at the badge screen
      cy.get('[data-testid="badge-screen"]').should('be.visible');
      cy.contains('You earned a badge!').should('be.visible');
      
      // Return to menu
      cy.contains('Return to Menu').click();
      
      // Verify we're back at the menu
      cy.get('[data-testid="menu-screen"]').should('be.visible');
    });
    
    it('tracks and stores performance data', () => {
      // Complete a routine task and verify localStorage has performance data
      cy.contains('Morning Routine').click();
      
      // Complete the first task
      cy.window().then((win) => {
        if (typeof win.__completeCurrentTask === 'function') {
          win.__completeCurrentTask();
        } else {
          cy.get('[data-testid="complete-task"]').click();
        }
      });
      
      // Wait for the task to be completed
      cy.wait(2000);
      
      // Check localStorage for performance data
      cy.window().then((win) => {
        const performanceData = JSON.parse(win.localStorage.getItem('routineRushPerformance') || '{}');
        expect(performanceData).to.have.property('Morning Routine');
        expect(performanceData['Morning Routine']).to.have.property('Brush Teeth');
      });
    });
  });
  
  // Test for the parent dashboard
  describe('Parent Dashboard', () => {
    beforeEach(() => {
      // Visit the parent dashboard page
      cy.visit('/parent-dashboard'); // Adjust this path as needed
      
      // Clear localStorage to start fresh
      cy.window().then((win) => {
        win.localStorage.removeItem('routineRushPerformance');
      });
    });
    
    it('displays child progress information', () => {
      // First go to the game and generate some performance data
      cy.visit('/game');
      cy.contains('Morning Routine').click();
      
      // Complete a task
      cy.window().then((win) => {
        if (typeof win.__completeCurrentTask === 'function') {
          win.__completeCurrentTask();
        } else {
          cy.get('[data-testid="complete-task"]').click();
        }
      });
      
      // Wait for completion
      cy.wait(2000);
      
      // Then go to the parent dashboard
      cy.visit('/parent-dashboard');
      
      // Check that performance data is displayed
      cy.contains('Morning Routine').should('be.visible');
      cy.contains('Brush Teeth').should('be.visible');
    });
  });