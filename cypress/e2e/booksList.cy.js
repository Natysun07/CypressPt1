describe('First Task. Login tests/Favorite books tests', () => {
  it('Visit WebSite', () => {
    cy.visit('/booksNode')
    cy.contains('Log in').should('be.visible')
  });

  it("Should successfully login", () => {
    cy.visit("/booksNode");
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.visit("/booksNode");
    cy.contains("Log in").click();
    cy.get("#mail").type(" ");
    cy.get("#pass").type("test");
    cy.contains("Submit").click();
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Please fill out this field.");
  });

  it("Should not login with empty password", () => {
    cy.visit("/booksNode");
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.contains("Submit").click();
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should add book to favorites if the 'add to favorite' check-box is checked", () => {
    cy.preliminaryActions();
    const selector = '.card'
    
    cy.getLength(selector).then((booksNum) => {
        const title = "Book" + booksNum;
        const description = "Book" + booksNum;
  
        cy.addBook(title, description, true);
        cy.checkFavorites(title, true);
      });
  });

  it("Should not add book to favorites if the 'add to favorite' check-box is not checked", () => {
    cy.preliminaryActions();
    const selector = '.card'

    cy.getLength(selector).then((booksNum) => {
        const title = "Book" + booksNum;
        const description = "Book" + booksNum;
  
        cy.addBook(title, description, false);
        cy.checkFavorites(title, false);
      });
  });

  it("Should add book to favorites if the 'Add to favorite' button is clicked", () => {
    cy.preliminaryActions();
    const selector = '.card'
  
    cy.getLength(selector).then((booksNum) => {
      const title = "Book" + booksNum;
      const description = "Book" + booksNum;

      cy.addBook(title, description, false);
      cy.contains('#root > div > div > div > a > div > div.card-body > div', title)
        .parents('a')
        .find('div.card-footer > button')
        .click();
      cy.checkFavorites(title, true);
      });
  });

});