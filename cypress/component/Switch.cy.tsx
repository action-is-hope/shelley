import React from "react";
import { Switch } from "../../src/indexLib";

const switchWithLabel = '[data-id="switch--label"]';
const switchWithoutLabel = '[data-id="switch--no-label"]';
const inputEl = '[data-id="switch--input"]';

describe("Switch", () => {
  it("renders child as label, unchecked by default", () => {
    cy.mount(<Switch includeDataIds>Switch label</Switch>);
    cy.get(switchWithLabel).contains("Switch label");
    cy.get(inputEl).should("not.be.checked");
  });

  it("defaultSelected", () => {
    cy.mount(
      <Switch defaultSelected includeDataIds>
        Switch label
      </Switch>
    );
    cy.get(inputEl).should("be.checked");
  });

  it("fires onChange when clicking label", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Switch onChange={onChangeSpy} includeDataIds>
        Switch label
      </Switch>
    );
    cy.get(switchWithLabel).click();
    cy.get("@onChangeSpy").should("have.been.calledWith", true);
  });

  it("isDisabled", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Switch onChange={onChangeSpy} isDisabled includeDataIds>
        Switch label
      </Switch>
    );
    cy.get(switchWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "isDisabled");
    cy.get(inputEl).should("be.disabled");
  });

  it("isReadOnly", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Switch onChange={onChangeSpy} isReadOnly includeDataIds>
        Switch label
      </Switch>
    );
    cy.get(inputEl).click();
    cy.get("@onChangeSpy").should("have.not.been.called");
  });

  it("focus class added", () => {
    cy.mount(<Switch includeDataIds>Switch label</Switch>);
    cy.get(inputEl).focus();
    cy.get(switchWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "isFocusVisible");
  });

  it("renders with custom class name", () => {
    cy.mount(
      <Switch className="cypress-test" includeDataIds>
        Switch label
      </Switch>
    );

    cy.get(switchWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "cypress-test");
  });

  it("custom label", () => {
    cy.mount(
      <>
        <label htmlFor="test123">Custom label</label>
        <Switch id="test123" includeDataIds />
      </>
    );
    cy.get(switchWithoutLabel).should("exist");
    cy.get(inputEl).should("have.attr", "id").and("equal", "test123");
  });
});
