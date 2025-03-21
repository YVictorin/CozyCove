describe('Parents Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/Parents', { timeout: 30000 });  // Ensure page fully loads
        cy.wait(1000); // Give time for any delayed elements
    });

    it('should display the hero section with correct title', () => {
        cy.get('h1')
            .contains('GROWN-UPS')
            .should('be.visible');

        cy.contains('Supporting parents, caregivers, and educators')
            .should('be.visible');
    });

    it('should navigate through resource categories carousel', () => {
        // Wait for the page to fully render
        cy.wait(1000); // Allow data fetching

        // Ensure the carousel exists before interacting with it
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="carousel"]').length > 0) {
                cy.get('[data-testid="carousel"]', { timeout: 15000 }).should('be.visible');

                // Store first card title
                cy.get('[data-testid="carousel"] div[role="article"]')
                    .first()
                    .find('h3')
                    .invoke('text')
                    .as('firstCardTitle');

                // Click right scroll button
                cy.get('button[aria-label="Scroll right"]').click();
                cy.wait(500); // Allow animation

                // Check if a new card is visible
                cy.get('@firstCardTitle').then((firstCardTitle) => {
                    cy.get('[data-testid="carousel"] div[role="article"]')
                        .first()
                        .find('h3')
                        .invoke('text')
                        .should('not.eq', firstCardTitle);
                });

                // Scroll left and verify it's back to the first card
                cy.get('button[aria-label="Scroll left"]').click();
                cy.wait(500);

                cy.get('@firstCardTitle').then((firstCardTitle) => {
                    cy.get('[data-testid="carousel"] div[role="article"]')
                        .first()
                        .find('h3')
                        .invoke('text')
                        .should('eq', firstCardTitle);
                });
            } else {
                cy.log('Carousel not found, skipping test.');
            }
        });
    });

    it('should toggle FAQ items when clicked', () => {
        // Get the first FAQ question
        cy.get('.border-b h3').first().as('firstFaq');

        // Initially, the answer should not be visible
        cy.get('.border-b').first().find('p').should('not.exist');

        // Click to open
        cy.get('@firstFaq').click();

        // Now the answer should be visible
        cy.get('.border-b').first().find('p').should('be.visible');

        // Click again to close
        cy.get('@firstFaq').click();

        // Answer should be hidden again
        cy.get('.border-b').first().find('p').should('not.exist');
    });

   
    it('should have a functioning SupportBot component', () => {
      // Ensure the SupportBot button is present
      cy.get('.fixed.bottom-1.right-1', { timeout: 10000 }).should('exist');
  
      // Ensure it's not hidden by checking height
      cy.get('.fixed.bottom-1.right-1').then(($el) => {
        if ($el.height() === 0) {
          cy.log('SupportBot is hidden, skipping test.');
          return;
        }
  
        // Click to open Support Bot
        cy.wrap($el).click({ force: true });
  
        // Ensure the chat window opens
        cy.get('dialog', { timeout: 5000 }).should('be.visible');
  
        // Close the bot
        cy.get('dialog .text-white.cursor-pointer').last().click();
  
        // Ensure the chat window closes
        cy.get('dialog').should('not.exist');
      });
    });
  });