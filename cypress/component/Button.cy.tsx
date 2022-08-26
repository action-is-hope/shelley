// import { Button } from "../../src/indexLib";
import { createRef } from "react";
import Button from "../../src/components/Button/ButtonARIA";
// import button from "../fixtures/example.json";

describe("Button", () => {
  it("mounts as button with onPress called via click", () => {
    const onPressSpy = cy.spy().as("onPressSpy");

    cy.mount(<Button onPress={onPressSpy}>Save changes</Button>);
    cy.get(":button").click();
    cy.get("@onPressSpy").should("have.been.called");
  });

  it("mounts as disabled button", () => {
    cy.mount(<Button disabled>Save changes</Button>);
    cy.get(":button").should("be.disabled");
  });

  it("forwards refs ", () => {
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
    cy.get(`[data-id="cy-button-trigger"]`).click();
    cy.get(`[data-id="cy-button"]`).should("be.focused");
  });

  it("mounts as anchor with href", () => {
    cy.mount(
      <Button as={"a"} variant="quiet" href="https://google.com">
        Link to Google
      </Button>
    );

    // cy.get("a").should("have.class", "Button224607090---variant-5-quiet");
    // cy.get("a").should("have.attr", "class").and("match" /*quiet*/);
    cy.get("a").should("have.attr", "class").and("to.have.string", "quiet");

    // cy.get("a").should("have.class", /<([\w]+)[^>]*>variant-5-quiet<\/\1>/);
  });
});
