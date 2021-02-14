Cypress.Commands.add("addItem", item => {
  cy.get(".new-todo").type(`${item}{enter}`);
});

Cypress.Commands.add("eraseItem", text => {
  cy.get(".todo-list")
    .contains(text)
    .siblings(`button.destroy`)
    .invoke(`css`, `display`, `block`)
    .click();
});

Cypress.Commands.add("completeItem", item => {
  cy.get(".todo-list")
    .contains(item)
    .siblings(`.toggle`)
    .check();
});

Cypress.Commands.add("unCompleteItem", item => {
  cy.get(".todo-list")
    .contains(item)
    .siblings(`.toggle`)
    .check()
    .uncheck();
});

Cypress.Commands.add("clearComplete", () => {
  cy.get(`.footer`)
    .contains(`Clear completed`)
    .click();
});
