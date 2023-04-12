import React from "react";
import { Radio, RadioGroup } from "../../src/indexLib";

const fieldPropsTest = {
  "data-id": "radioGroup",
  label: "Field Label",
};

const fieldLabel = '[data-id="radioGroup--label"]';
const inputEl = '[data-id="radioGroup"] input';
const fieldDesc = '[data-id="radioGroup--helpText--description"]';
const fieldError = '[data-id="radioGroup--helpText--error"]';
const fieldGroup = '[role="radiogroup"]';

describe("RadioGroup", () => {
  it("renders childen, unchecked by default", () => {
    cy.mount(
      <RadioGroup {...fieldPropsTest}>
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
      </RadioGroup>
    );
    cy.get(inputEl).should("not.be.checked");
  });

  it("renders label and input #a11y related attributes correctly.", () => {
    cy.mount(
      <RadioGroup {...fieldPropsTest}>
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
      </RadioGroup>
    );
    cy.get(fieldLabel)
      .should("have.text", "Field Label")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldGroup).should("have.attr", "aria-labelledby", id)
      );
  });

  it("fires onChange.", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <RadioGroup {...fieldPropsTest} onChange={onChangeSpy}>
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
      </RadioGroup>
    );
    cy.get("input[value='rad1']").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", "rad1");
    cy.get("input[value='rad2']").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", "rad2");
    cy.get(inputEl).should("be.checked");
  });

  it("defaultValue works as expected - uncontrolled", () => {
    cy.mount(
      <RadioGroup {...fieldPropsTest} defaultValue={"rad2"}>
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
        <Radio value="rad3">Radio label 3</Radio>
      </RadioGroup>
    );
    cy.get("input[value='rad1']").should("not.be.checked");
    cy.get("input[value='rad2']").should("be.checked");
    cy.get("input[value='rad3']").should("not.be.checked");
  });

  it("value works as expected - controlled", () => {
    cy.mount(
      <RadioGroup {...fieldPropsTest} value="rad2">
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
        <Radio value="rad3">Radio label 3</Radio>
      </RadioGroup>
    );
    cy.get("input[value='rad1']").should("not.be.checked");
    cy.get("input[value='rad2']").should("be.checked");
    cy.get("input[value='rad3']").should("not.be.checked");
  });
});

describe("RadioGroup isDisabled and isReadOnly", () => {
  it("isDisabled - entire group", () => {
    cy.mount(
      <RadioGroup {...fieldPropsTest} isDisabled>
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
      </RadioGroup>
    );
    cy.get(inputEl).should("be.disabled");
  });

  it("isDisabled - single item", () => {
    cy.mount(
      <RadioGroup {...fieldPropsTest}>
        <Radio value="rad1" isDisabled>
          Radio label 1
        </Radio>
        <Radio value="rad2">Radio label 2</Radio>
      </RadioGroup>
    );
    cy.get("input[value='rad1']").should("be.disabled");
    cy.get("input[value='rad2']").should("not.be.disabled");
  });

  it("isReadOnly - entire group", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <RadioGroup {...fieldPropsTest} onChange={onChangeSpy} isReadOnly>
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
      </RadioGroup>
    );
    cy.get("input[value='rad1']").click().and("not.be.checked");
    cy.get("input[value='rad2']").click().and("not.be.checked");
    cy.get("@onChangeSpy").should("not.have.been.called");
  });
});

describe("RadioGroup Help", () => {
  it("renders description correctly.", () => {
    cy.mount(
      <RadioGroup {...fieldPropsTest} description="Number 5 likes input.">
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
      </RadioGroup>
    );
    cy.get(fieldDesc)
      .should("have.text", "Number 5 likes input.")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldGroup).should("have.attr", "aria-describedby", id)
      );
  });

  it("renders errorMessage correctly.", () => {
    cy.mount(
      <RadioGroup
        {...fieldPropsTest}
        errorMessage="No input!"
        validationState="invalid"
      >
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
      </RadioGroup>
    );
    cy.get(fieldError)
      .should("have.text", "No input!")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldGroup).should("have.attr", "aria-describedby", id)
      );
  });

  it("renders errorMessage instead of description.", () => {
    cy.mount(
      <RadioGroup
        {...fieldPropsTest}
        description="Number 5 likes input."
        errorMessage="No input!"
        validationState="invalid"
      >
        <Radio value="cb1">Radio label 1</Radio>
      </RadioGroup>
    );
    cy.get(fieldDesc).should("not.exist");
    cy.get(fieldError)
      .should("have.text", "No input!")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldGroup).should("have.attr", "aria-describedby", id)
      );
  });
});

describe("Radio", () => {
  it("renders childen, unchecked by default", () => {
    cy.mount(
      <RadioGroup {...fieldPropsTest}>
        <Radio value="rad1">Radio label 1</Radio>
        <Radio value="rad2">Radio label 2</Radio>
      </RadioGroup>
    );
    cy.get(inputEl).should("not.be.checked");
  });
});
