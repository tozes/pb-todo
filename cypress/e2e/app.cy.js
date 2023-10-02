// type definitions for Cypress object "cy"
/// <reference types="cypress" />

import todoPage from "../page-objects/todoPage";

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check

describe("Valide text and CRUD operations", function () {
  it("Valide text and CRUD operations", () => {
    cy.visit("/");
    todoPage.validateTextHeader();
    todoPage.validateTextPlaceholder();
    todoPage.validateInfoAboutDoubleClick();
    todoPage.createItems();
    todoPage.editItem();
    todoPage.statusActive();
    todoPage.countOfItems();
  });
});
