describe("Homepage Tests", () => {
  beforeEach(() => {
    cy.visit("https://cozycove.vercel.app");
  });

  it("should load the homepage successfully", () => {
    cy.url().should("include", "/");
    cy.get("h1").contains("WELCOME TO THE");
  });

  it("should display the hero section with correct content", () => {
    cy.get("h1").contains("WELCOME TO THE");
    cy.get('img[alt="Coziest Cove Logo"]').should("be.visible");
    cy.get("p").contains("At Cozy Cove, we create warm, welcoming spaces");
  });

  it("should load the background image correctly", () => {
    cy.get('img[alt="Bluey cove background"]').should("be.visible");
  });

  it("should display the Snappy character image", () => {
    cy.get('img[alt="Snappy character"]').should("be.visible");
  });
});
