import React from "react";
import { createRef } from "react";
import Button from "../../src/components/Button/Button";

describe("Button", () => {
  it("renders as button with onPress called via click", () => {
    const onPressSpy = cy.spy().as("onPressSpy");

    cy.mount(<Button onPress={onPressSpy}>Save changes</Button>);
    cy.get(":button").realClick();
    cy.get("@onPressSpy").should("have.been.called");
  });

  it("renders as disabled button", () => {
    cy.mount(<Button disabled>Save changes</Button>);
    cy.get(":button").should("be.disabled");
  });

  it("renders with custom class name", () => {
    cy.mount(<Button className="cypress-test">Custom classname</Button>);

    cy.get(":button")
      .should("have.attr", "class")
      .and("to.have.string", "cypress-test");
  });

  it("forwards refs", () => {
    const buttonRef = createRef<HTMLButtonElement>();
    cy.mount(
      <>
        <button
          data-id="cy-button-trigger"
          onClick={() => buttonRef?.current?.focus()}
        >
          Click me
        </button>
        <Button data-id="cy-button" ref={buttonRef}>
          Save changes
        </Button>
      </>
    );
    cy.get(`[data-id="cy-button-trigger"]`).realClick();
    cy.get(`[data-id="cy-button"]`).should("be.focused");
  });

  it("renders as anchor with href and the link works as expected", () => {
    cy.mount(
      <Button as={"a"} href="https://google.com">
        Link to Google
      </Button>
    );

    cy.get("a")
      .invoke("attr", "href")
      .should("equal", "https://google.com")
      .then((href) => {
        href && cy.request(href).its("status").should("eq", 200);
      });
  });
});
