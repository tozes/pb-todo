class TodoPage {
  editedItemName = "";
  secondItemName = "";
  validateTextHeader() {
    cy.getByDataTest("header-text").invoke("text").should("eq", "todos");
  }

  validateTextPlaceholder() {
    cy.getByDataTest("new-todo").should(
      "have.attr",
      "placeholder",
      "What needs to be done?"
    );
  }

  validateInfoAboutDoubleClick() {
    cy.getByDataTest("double-click-info")
      .invoke("text")
      .should("eq", "Double-click to edit a todo");
  }

  createItems() {
    const itemId = crypto.randomUUID();
    const firstItemName = `First item name ${itemId}`;
    const secondItemName = `Second item name ${itemId}`;
    this.editedfirstItemName = `Edited first item name ${itemId}`;
    this.secondItemName = secondItemName;
    cy.getByDataTest("new-todo").click().type(firstItemName).type("{enter}");
    cy.getByDataTest("new-todo").click().type(secondItemName).type("{enter}");
    cy.getByDataTest("new-item").should("contain", firstItemName);
  }

  editItem() {
    cy.getByDataTest("new-item").eq(0).dblclick();
    cy.getByDataTest("edit")
      .eq(0)
      .clear()
      .type(this.editedfirstItemName)
      .type("{enter}");
    cy.getByDataTest("new-item").should("contain", this.editedfirstItemName);
  }
  statusActive() {
    console.log(this.secondItemName);
    cy.getByDataTest("active").click();
    cy.getByDataTest("new-item")
      .should("be.visible")
      .should("contain", this.editedfirstItemName)
      .then(() => {
        cy.getByDataTest("new-item").should("contain", this.secondItemName);
      });
  }
  countOfItems() {
    cy.getByDataTest("new-item").should("have.length", 2);

    cy.getByDataTest("todo-count")
      .invoke("text")
      .then((text) => {
        const createdItemlength = parseInt(text, 10);
        console.log("Číselná hodnota z todo-count:", createdItemlength);

        cy.getByDataTest("new-item")
          .its("length")
          .then((expectedCount) => {
            console.log("expectedCount: ", expectedCount);

            if (createdItemlength === expectedCount) {
              cy.log(
                `Created ${createdItemlength} item/s and Counter showing ${expectedCount} item/s it'correct value`
              );
            } else {
              cy.log(
                `Counter of items doesn't work correct. Created ${createdItemlength} item/s and Counter showing ${expectedCount}`
              );
            }
          });
      });
  }
}

const todoPage = new TodoPage();
export default todoPage;
