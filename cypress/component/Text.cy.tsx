import React from "react";
import { P, Text } from "../../src/indexLib";

const longText =
  "All people on Earth depend directly or indirectly on the ocean and cryosphere. The global ocean covers 71% of the Earth surface and contains about 97% of the Earth's water.";

describe("P", () => {
  it("P Uppercase.", () => {
    cy.mount(<P uppercase>I am Groot</P>);
    cy.get("p")
      .contains("I am Groot")
      .should("have.css", "text-transform", "uppercase")
      .should("have.attr", "class")
      .and("to.have.string", "uppercase");
  });
  it("P truncate", () => {
    cy.mount(<P truncate>{longText}</P>);
    cy.get("p")
      .contains(longText)
      .should("have.css", "overflow", "hidden")
      .and("have.css", "-webkit-line-clamp", "1")
      .should("have.attr", "class")
      .and("to.have.string", "truncate");
  });
});

describe("Text", () => {
  it("Text Uppercase.", () => {
    cy.mount(
      <Text elementType="div" uppercase>
        I am Groot
      </Text>
    );
    cy.get("div")
      .contains("I am Groot")
      .should("have.css", "text-transform", "uppercase")
      .should("have.attr", "class")
      .and("to.have.string", "uppercase");
  });
  it("Text truncate", () => {
    cy.mount(
      <Text elementType="div" truncate>
        {longText}
      </Text>
    );
    cy.get("div")
      .contains(longText)
      .should("have.css", "overflow", "hidden")
      .and("have.css", "-webkit-line-clamp", "1")
      .should("have.attr", "class")
      .and("to.have.string", "truncate");
  });

  it("Text truncate", () => {
    cy.mount(
      <Text elementType="div" truncate={6} vol={false}>
        <P>{longText}</P>
        <P>
          The cryosphere refers to frozen components of the Earth system. Around
          10% of Earth's land area is covered by glaciers or ice sheets. The
          ocean and cryosphere support unique habitats, and are interconnected
          with other components of the climate system through global exchange of
          water, energy and carbon.
        </P>
      </Text>
    );
    cy.get("div")
      .contains(longText)
      .parents()
      .should("have.css", "-webkit-line-clamp", "6")
      .should("have.attr", "class")
      .and("to.have.string", "truncate");
  });
});
