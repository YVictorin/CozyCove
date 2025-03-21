describe("Products Page E2E Tests", () => {
  beforeEach(() => {
    cy.visit("https://cozycove.vercel.app/products");
  });

  it("should load the Products page successfully", () => {
    cy.contains("Filter builds:").should("exist");
    cy.get(".product-card").should("have.length.greaterThan", 0);
  });

  it("should filter products correctly", () => {
    cy.get(".filter-button").contains("Calming Activities").click();
    cy.get(".product-card").each(($el) => {
      cy.wrap($el).find(".category-tag").should("contain.text", "Calming");
    });
  });

  it("should open and close product details modal", () => {
    cy.get(".product-card").first().click();
    cy.get(".modal-content").should("exist");
    cy.get(".modal-content button").contains("Close").click();
    cy.get(".modal-content").should("not.exist");
  });

  it("should cycle through all filters", () => {
    cy.get(".filter-button").each(($btn) => {
      cy.wrap($btn).click();
      cy.wait(500);
      cy.get(".product-card").should("have.length.greaterThan", 0);
    });
  });
});
