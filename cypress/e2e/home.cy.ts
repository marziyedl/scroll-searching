describe("home spec", () => {
  it("should have 5 card in first call", () => {
    cy.visit("/");
    cy.get('input[type="search"]').type("Chicken");
    cy.get(".col-sm-12").should("have.length", 5);
  });

  it("should scrolls down and get API", () => {
    cy.visit("/");
    cy.get('input[type="search"]').type("a");
    cy.wait(1000).then(() => {
      cy.scrollTo("bottom");
    });
    cy.get(".col-sm-12").should("have.length", 10);
  });
});
