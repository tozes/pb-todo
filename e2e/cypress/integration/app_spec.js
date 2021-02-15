import { oneText, anotherText, viewports } from "../support/data";

describe("Desktop - Assignment - Todos app", () => {
  context("No addition tests", () => {
    beforeEach(() => {
      cy.visit(`/`);
    });

    it(`Placeholder copy is correct`, () => {
      cy.focused()
        .should("have.attr", "placeholder")
        .and(`eq`, "What needs to be done?");
    });

    it("Field accepts data entered", () => {
      cy.get(".new-todo")
        .type(oneText)
        .should("have.value", oneText);
    });
  });

  context("Adding items", () => {
    beforeEach(() => {
      cy.visit(`/`);
      cy.addItem(oneText);
    });

    it("New item added appears in the list", () => {
      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("contain", oneText);
    });

    it("Submission is erased from field after added in the list", () => {
      cy.get(".new-todo").should(`have.value`, ``);
    });

    it("Placeholder remains after adding an item", () => {
      cy.get(".new-todo")
        .should("have.attr", "placeholder")
        .and(`eq`, "What needs to be done?");
    });

    it(`Item added is not complete by default`, () => {
      cy.get(`.todo-list > li`)
        .last()
        .should(`not.have.class`, "completed");
    });
  });

  context("Erasing items", () => {
    beforeEach(() => {
      cy.visit(`/`);
      cy.addItem(oneText);
    });

    it("Uncomplete item is erased", () => {
      cy.eraseItem(oneText);
      cy.get(".todo-list > li").should(`not.exist`);
    });

    it("Complete item is erased", () => {
      cy.completeItem(oneText);
      cy.eraseItem(oneText);
      cy.get(".todo-list > li").should(`not.exist`);
    });
  });

  context("Toggle behavior", () => {
    beforeEach(() => {
      cy.visit(`/`);
      cy.addItem(oneText);
    });

    it(`Checkbox completes the item selected`, () => {
      cy.completeItem(oneText);
      cy.get(`.todo-list > li.completed`)
        .children(`input.edit`)
        .should("have.value", oneText);
    });

    it(`Checkbox completes only one item`, () => {
      cy.completeItem(oneText);
      cy.get(`.todo-list > li.completed`).should(`have.length`, 1);
    });

    it(`Uncheck removes complete state`, () => {
      cy.unCompleteItem(oneText);
      cy.get(`.todo-list > li.completed`).should(`not.exist`);
    });
  });

  context("Filters behavior", () => {
    beforeEach(() => {
      cy.visit(`/`);
      cy.addItem(oneText);
      cy.addItem(anotherText);
      cy.completeItem(oneText);
    });

    it(`Count only counts active items`, () => {
      cy.get(".todo-list > li")
        .not(`.completed`)
        .its(`length`)
        .then(length => {
          cy.get(`.todo-count`)
            .children()
            .invoke(`text`)
            .then(p => {
              length !== 1
                ? expect(p).to.eq(`${length} items left`)
                : expect(p).to.eq(`${length} item left`);
            });
        });
    });

    it(`All filter shows all items in the list`, () => {
      cy.get(".todo-list > li")
        .its(`length`)
        .then(lengthDefault => {
          cy.get(`.filters > li`)
            .contains(`All`)
            .click();
          cy.get(".todo-list > li")
            .its(`length`)
            .then(lengthAfterClick => {
              expect(lengthDefault).to.eq(lengthAfterClick);
            });
        });
    });

    it(`Active filter shows only active items in the list`, () => {
      cy.get(".todo-list > li")
        .not(`.completed`)
        .its(`length`)
        .then(lengthDefault => {
          cy.get(`.filters > li`)
            .contains(`Active`)
            .click();
          cy.get(".todo-list > li")
            .its(`length`)
            .then(lengthAfterClick => {
              expect(lengthDefault).to.eq(lengthAfterClick);
            });
        });
    });

    it(`Completed filter shows only completed items in the list`, () => {
      cy.get(".todo-list > li.completed")
        .its(`length`)
        .then(lengthDefault => {
          cy.get(`.filters > li`)
            .contains(`Completed`)
            .click();
          cy.get(".todo-list > li")
            .its(`length`)
            .then(lengthAfterClick => {
              expect(lengthDefault).to.eq(lengthAfterClick);
            });
        });
    });
  });

  context("Clear completed items behavior", () => {
    beforeEach(() => {
      cy.visit(`/`);
      cy.addItem(oneText);
      cy.addItem(anotherText);
      cy.completeItem(oneText);
    });

    it(`Clear completed items works`, () => {
      cy.get(".todo-list > li.completed")
        .its(`length`)
        .then(lengthCompleted => {
          cy.get(`.todo-list > li`)
            .its(`length`)
            .then(lenghtAll => {
              cy.clearComplete();
              cy.get(`.todo-list > li`)
                .its(`length`)
                .then(lengthAfterClear => {
                  expect(lengthAfterClear).to.eq(lenghtAll - lengthCompleted);
                });
            });
        });
    });

    it(`Clear completed link is not present when there are no completed items`, () => {
      cy.clearComplete();
      cy.contains(`Clear completed`).should(`not.exist`);
    });
  });
});

// Mobile viewports and user agent set

viewports.forEach(viewport => {
  describe(`In ${viewport} - Assignment - Todos app`, () => {
    context("No addition tests", () => {
      beforeEach(() => {
        cy.viewport(viewport);
        cy.visit(`/`, {
          headers: {
            "user-agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
          }
        });
      });

      it(`Placeholder copy is correct`, () => {
        cy.focused()
          .should("have.attr", "placeholder")
          .and(`eq`, "What needs to be done?");
      });

      it("Field accepts data entered", () => {
        cy.get(".new-todo")
          .type(oneText)
          .should("have.value", oneText);
      });
    });

    context("Adding items", () => {
      beforeEach(() => {
        cy.viewport(viewport);
        cy.visit(`/`, {
          headers: {
            "user-agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
          }
        });
        cy.addItem(oneText);
      });

      it("New item added appears in the list", () => {
        cy.get(".todo-list li")
          .should("have.length", 1)
          .and("contain", oneText);
      });

      it("Submission is erased from field after added in the list", () => {
        cy.get(".new-todo").should(`have.value`, ``);
      });

      it("Placeholder remains after adding an item", () => {
        cy.get(".new-todo")
          .should("have.attr", "placeholder")
          .and(`eq`, "What needs to be done?");
      });

      it(`Item added is not complete by default`, () => {
        cy.get(`.todo-list > li`)
          .last()
          .should(`not.have.class`, "completed");
      });
    });

    context("Erasing items", () => {
      beforeEach(() => {
        cy.viewport(viewport);
        cy.visit(`/`, {
          headers: {
            "user-agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
          }
        });
        cy.addItem(oneText);
      });

      it("Uncomplete item is erased", () => {
        cy.eraseItem(oneText);
        cy.get(".todo-list > li").should(`not.exist`);
      });

      it("Complete item is erased", () => {
        cy.completeItem(oneText);
        cy.eraseItem(oneText);
        cy.get(".todo-list > li").should(`not.exist`);
      });
    });

    context("Toggle behavior", () => {
      beforeEach(() => {
        cy.viewport(viewport);
        cy.visit(`/`, {
          headers: {
            "user-agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
          }
        });
        cy.addItem(oneText);
      });

      it(`Checkbox completes the item selected`, () => {
        cy.completeItem(oneText);
        cy.get(`.todo-list > li.completed`)
          .children(`input.edit`)
          .should("have.value", oneText);
      });

      it(`Checkbox completes only one item`, () => {
        cy.completeItem(oneText);
        cy.get(`.todo-list > li.completed`).should(`have.length`, 1);
      });

      it(`Uncheck removes complete state`, () => {
        cy.unCompleteItem(oneText);
        cy.get(`.todo-list > li.completed`).should(`not.exist`);
      });
    });

    context("Filters behavior", () => {
      beforeEach(() => {
        cy.viewport(viewport);
        cy.visit(`/`, {
          headers: {
            "user-agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
          }
        });
        cy.addItem(oneText);
        cy.addItem(anotherText);
        cy.completeItem(oneText);
      });

      it(`Count only counts active items`, () => {
        cy.get(".todo-list > li")
          .not(`.completed`)
          .its(`length`)
          .then(length => {
            cy.get(`.todo-count`)
              .children()
              .invoke(`text`)
              .then(p => {
                length !== 1
                  ? expect(p).to.eq(`${length} items left`)
                  : expect(p).to.eq(`${length} item left`);
              });
          });
      });

      it(`All filter shows all items in the list`, () => {
        cy.get(".todo-list > li")
          .its(`length`)
          .then(lengthDefault => {
            cy.get(`.filters > li`)
              .contains(`All`)
              .click();
            cy.get(".todo-list > li")
              .its(`length`)
              .then(lengthAfterClick => {
                expect(lengthDefault).to.eq(lengthAfterClick);
              });
          });
      });

      it(`Active filter shows only active items in the list`, () => {
        cy.get(".todo-list > li")
          .not(`.completed`)
          .its(`length`)
          .then(lengthDefault => {
            cy.get(`.filters > li`)
              .contains(`Active`)
              .click();
            cy.get(".todo-list > li")
              .its(`length`)
              .then(lengthAfterClick => {
                expect(lengthDefault).to.eq(lengthAfterClick);
              });
          });
      });

      it(`Completed filter shows only completed items in the list`, () => {
        cy.get(".todo-list > li.completed")
          .its(`length`)
          .then(lengthDefault => {
            cy.get(`.filters > li`)
              .contains(`Completed`)
              .click();
            cy.get(".todo-list > li")
              .its(`length`)
              .then(lengthAfterClick => {
                expect(lengthDefault).to.eq(lengthAfterClick);
              });
          });
      });
    });

    context("Clear completed items behavior", () => {
      beforeEach(() => {
        cy.viewport(viewport);
        cy.visit(`/`, {
          headers: {
            "user-agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
          }
        });
        cy.addItem(oneText);
        cy.addItem(anotherText);
        cy.completeItem(oneText);
      });

      it(`Clear completed items works`, () => {
        cy.get(".todo-list > li.completed")
          .its(`length`)
          .then(lengthCompleted => {
            cy.get(`.todo-list > li`)
              .its(`length`)
              .then(lenghtAll => {
                cy.clearComplete();
                cy.get(`.todo-list > li`)
                  .its(`length`)
                  .then(lengthAfterClear => {
                    expect(lengthAfterClear).to.eq(lenghtAll - lengthCompleted);
                  });
              });
          });
      });

      it(`Clear completed link is not present when there are no completed items`, () => {
        cy.clearComplete();
        cy.contains(`Clear completed`).should(`not.exist`);
      });
    });
  });
});
