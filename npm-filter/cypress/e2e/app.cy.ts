describe("Navigation", () => {
  it("should navigate to the home page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get("input[name='filter']").type("react");

    // The new url should include "search=react"
    cy.url().should("include", "search=react");

    cy.get("div[id='clear']").click();

    cy.url().should("include", "search=");
  });
});
