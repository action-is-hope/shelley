import React from "react";
import { P } from "../../src/indexLib";

describe("Basic Text", () => {
  it("P Uppercase.", () => {
    cy.mount(<P uppercase>I am Groot</P>);
    cy.get('p')
      .contains('I am Groot')
      .should('have.css', 'text-transform', 'uppercase')
      .should("have.attr", "class")
      .and("to.have.string", "uppercase");
  });
});
