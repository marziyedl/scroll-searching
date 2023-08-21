describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get('input[type="text"]').type("Chicken");
    cy.get(".col-sm-12").should("have.length", 5);
  });

  it("should navigate between  using arrow keys ", () => {
    cy.visit("/");
    cy.get('input[type="text"]').type("Chicken");
    cy.get(".col-sm-12").first().click();
    cy.document().trigger("keydown", { keyCode: "ArrowRight" });
    cy.get(".col-sm-12.box-shadow").should("exist");
  });

  it("should scrolls down and get API", () => {
    cy.visit("/");
    cy.get('input[type="text"]').type("a");
    cy.wait(1000).then(() => {
      cy.scrollTo("bottom");
    });
    cy.get(".col-sm-12").should("have.length", 10);
  });
});
