import React from "react";
import { Checkbox, CheckboxGroup } from "../../src/indexLib";

const fieldPropsTest = {
  "data-id": "checkboxGroup",
  label: "Field Label",
};

const fieldLabel = '[data-id="checkboxGroup--label"]';
const inputEl = '[data-id="checkboxGroup"] input';
const fieldDesc = '[data-id="checkboxGroup--helpText--description"]';
const fieldError = '[data-id="checkboxGroup--helpText--error"]';
const fieldGroup = '[role="group"]';

describe("Basic CheckboxGroup", () => {
  it("renders childen, unchecked by default", () => {
    cy.mount(
      <CheckboxGroup {...fieldPropsTest}>
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
        <Checkbox value="cb2">Checkbox label 2</Checkbox>
      </CheckboxGroup>
    );
    cy.get(inputEl).should("not.be.checked");
  });

  it("renders label and input #a11y related attributes correctly.", () => {
    cy.mount(
      <CheckboxGroup {...fieldPropsTest}>
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
        <Checkbox value="cb2">Checkbox label 2</Checkbox>
      </CheckboxGroup>
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
      <CheckboxGroup {...fieldPropsTest} onChange={onChangeSpy}>
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
        <Checkbox value="cb2">Checkbox label 2</Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", ["cb1"]);
    cy.get("input[value='cb2']").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", ["cb1", "cb2"]);
    cy.get(inputEl).should("be.checked");
  });

  it("defaultValue works as expected - uncontrolled", () => {
    cy.mount(
      <CheckboxGroup {...fieldPropsTest} defaultValue={["cb1", "cb3"]}>
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
        <Checkbox value="cb2">Checkbox label 2</Checkbox>
        <Checkbox value="cb3">Checkbox label 3</Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").should("be.checked");
    cy.get("input[value='cb2']").should("not.be.checked");
    cy.get("input[value='cb3']").should("be.checked");
  });

  it("value works as expected - controlled", () => {
    cy.mount(
      <CheckboxGroup {...fieldPropsTest} value={["cb1", "cb3"]}>
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
        <Checkbox value="cb2">Checkbox label 2</Checkbox>
        <Checkbox value="cb3">Checkbox label 3</Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").should("be.checked");
    cy.get("input[value='cb2']").should("not.be.checked");
    cy.get("input[value='cb3']").should("be.checked");
  });
});

describe("CheckboxGroup isDisabled and isReadOnly", () => {
  it("isDisabled - entire group", () => {
    cy.mount(
      <CheckboxGroup {...fieldPropsTest} isDisabled>
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
        <Checkbox value="cb2">Checkbox label 2</Checkbox>
      </CheckboxGroup>
    );
    cy.get(inputEl).should("be.disabled");
  });

  it("isDisabled - single item", () => {
    cy.mount(
      <CheckboxGroup {...fieldPropsTest}>
        <Checkbox value="cb1" isDisabled>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2">Checkbox label 2</Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").should("be.disabled");
    cy.get("input[value='cb2']").should("not.be.disabled");
  });

  it("isReadOnly - entire group", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <CheckboxGroup {...fieldPropsTest} onChange={onChangeSpy} isReadOnly>
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
        <Checkbox value="cb2">Checkbox label 2</Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").click().and("not.be.checked");
    cy.get("input[value='cb2']").click().and("not.be.checked");
    cy.get("@onChangeSpy").should("not.have.been.called");
  });

  it("isReadOnly - single item", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <CheckboxGroup {...fieldPropsTest} onChange={onChangeSpy}>
        <Checkbox value="cb1" isReadOnly>
          Checkbox label 1
        </Checkbox>
        <Checkbox value="cb2">Checkbox label 2</Checkbox>
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").click().and("not.be.checked");
    cy.get("input[value='cb2']").click().and("be.checked");
    cy.get("@onChangeSpy").should("have.been.called", "once");
  });
});

describe("CheckboxGroup Help", () => {
  it("renders description correctly.", () => {
    cy.mount(
      <CheckboxGroup {...fieldPropsTest} description="Number 5 likes input.">
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
      </CheckboxGroup>
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
      <CheckboxGroup
        {...fieldPropsTest}
        errorMessage="No input!"
        validationState="invalid"
      >
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
      </CheckboxGroup>
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
      <CheckboxGroup
        {...fieldPropsTest}
        description="Number 5 likes input."
        errorMessage="No input!"
        validationState="invalid"
      >
        <Checkbox value="cb1">Checkbox label 1</Checkbox>
      </CheckboxGroup>
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

describe("CheckboxGroup custom labels", () => {
  it("defaultValue and onChange work as expected", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <CheckboxGroup
        {...fieldPropsTest}
        defaultValue={["cb2"]}
        onChange={onChangeSpy}
      >
        <label htmlFor="cb1">Label1</label>
        <Checkbox id="cb1" value="cb1" />
        <label htmlFor="cb2">Label2</label>
        <Checkbox id="cb2" value="cb2" />
      </CheckboxGroup>
    );
    cy.get("input[value='cb1']").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", ["cb2", "cb1"]);
  });
});
