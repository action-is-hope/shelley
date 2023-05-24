import React from "react";
import { Switch } from "../../src/indexLib";

const fieldPropsTest = {
  "data-id": "switch",
  children: "Switch label",
};

const switchWithLabel = '[data-id="switch--label"]';
const switchWithoutLabel = '[data-id="switch--noLabel"]';
const inputEl = '[data-id="switch--input"]';

describe("Switch", () => {
  it("renders child as label, unchecked by default", () => {
    cy.mount(<Switch {...fieldPropsTest} />);
    cy.get(switchWithLabel).contains("Switch label");
    cy.get(inputEl).should("not.be.checked");
  });

  it("defaultSelected", () => {
    cy.mount(<Switch defaultSelected {...fieldPropsTest} />);
    cy.get(inputEl).should("be.checked");
  });

  it("fires onChange when clicking label", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Switch onChange={onChangeSpy} {...fieldPropsTest} />);
    cy.get(switchWithLabel).click();
    cy.get("@onChangeSpy").should("have.been.calledWith", true);
  });

  it("isDisabled", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Switch onChange={onChangeSpy} isDisabled {...fieldPropsTest} />);
    cy.get(switchWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "isDisabled");
    cy.get(inputEl).should("be.disabled");
  });

  it("isReadOnly", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Switch onChange={onChangeSpy} isReadOnly {...fieldPropsTest} />);
    cy.get(inputEl).click();
    cy.get("@onChangeSpy").should("have.not.been.called");
  });

  it("focus class added", () => {
    cy.mount(<Switch {...fieldPropsTest} />);
    cy.get(inputEl).focus();
    cy.get(switchWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "isFocusVisible");
  });

  it("renders with custom class name", () => {
    cy.mount(<Switch className="cypress-test" {...fieldPropsTest} />);

    cy.get(switchWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "cypress-test");
  });
});
