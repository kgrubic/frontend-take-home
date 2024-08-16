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

describe("Error Page", () => {
  context("Error", () => {
    const errorMsg = "There was an error. Remove search npm name and try again";

    it("simulates an error when dashboard cannot be displayed", () => {
      cy.intercept(
        {
          method: "GET",
          url: "https://api.npms.io/v2/search/suggestions?q=react-window",
        },
        {
          forceNetworkError: true,
        }
      ).as("getNetworkFailure");

      cy.visit("http://localhost:3000/?search=react-window");
      cy.wait("@getNetworkFailure", { timeout: 1000 });
      cy.wait(2000);
      cy.contains(errorMsg).should("be.visible");
    });
  });
});
