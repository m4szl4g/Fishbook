import * as cypresConfig from "../../cypress.json";

context("Catch", () => {
  beforeEach(() => {
    cy.login(cypresConfig.testUser.email, cypresConfig.testUser.password);
    cy.seed();
    cy.visit("http://localhost:4200");
  });

  afterEach(() => {
    cy.cleanup();
  });

  it("Register new fish", () => {
    //todo write the script...
  });
});
