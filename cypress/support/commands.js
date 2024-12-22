// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add("login", (login, password) => {
  cy.contains("Log in").click();
  cy.get("#mail").type(login);
  cy.get("#pass").type(password);
  cy.contains("Submit").click();
});

Cypress.Commands.add("addBook", (title, description, favorite) => {
  cy.contains("Books list").click();
  cy.contains("Add new").click();
  cy.get("#title").type(title);
  cy.get("#description").type(description);
  if (favorite) {
    cy.get("#favorite").check();
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add("checkFavorites", (title, visible) => {
  cy.contains("Favorites").click();
  if (visible) {
    cy.contains(title).should('be.visible');
  } else {
    cy.contains(title).should('not.exist');
  }
});

Cypress.Commands.add("selectViewPort", (viewport) => {
  const viewportName = Cypress.env("view-port") || "desktop";
  const viewports = Cypress.env("viewports");
  const selectedViewport = viewports[viewportName];

  if (!selectedViewport) {
    throw new Error(`Viewport configuration '${viewportName}' not found!`);
  }

  cy.viewport(selectedViewport.width, selectedViewport.height);
});

Cypress.Commands.add("preliminaryActions", () => {
  cy.selectViewPort();
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Books list").click();
});

Cypress.Commands.add("getLength", (selector) => {
  return cy.get(selector).then((elements) => elements.length);
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

