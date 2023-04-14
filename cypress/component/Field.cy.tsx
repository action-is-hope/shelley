import React from "react";
import { Field } from "../../src/indexLib";

const field = '[data-id="field"]';
const fieldLabel = '[data-id="field--label"]';
const fieldDescription = '[data-id="help--description"]';
const fieldError = '[data-id="help--error"]';

const fieldPropsTest = {
  "data-id": "field",
  label: "My field",
  labelProps: {
    id: "label-id",
    htmlFor: "testField",
    data: "random",
  },
  includeDataIds: true,
};

describe("Basic Field", () => {
  it("renders with children, child renders correctly.", () => {
    cy.mount(
      <Field {...fieldPropsTest}>
        <input id="testField" type="text" aria-labelledby="label-id" />
      </Field>
    );
    cy.get("#testField")
      .should("be.visible")
      .and("have.attr", "id", "testField")
      .and("have.attr", "type", "text")
      .and("have.attr", "aria-labelledby", "label-id");
  });

  it("renders a label and spreads labelProps to it.", () => {
    cy.mount(
      <Field {...fieldPropsTest}>
        <input id="testField" type="text" aria-labelledby="label-id" />
      </Field>
    );
    cy.get(fieldLabel)
      .should("have.attr", "id", "label-id")
      .and("have.attr", "for", "testField")
      .and("have.attr", "data", "random")
      .and("have.text", "My field");
  });

  it("renders isDisabled class.", () => {
    cy.mount(
      <Field {...fieldPropsTest} isDisabled>
        <input id="testField" type="text" aria-labelledby="label-id" disabled />
      </Field>
    );
    cy.get(field)
      .should("have.attr", "class")
      .and("to.have.string", "isDisabled");
  });
});

describe("Field Help", () => {
  it("renders a description and spreads descriptionProps to it.", () => {
    cy.mount(
      <Field
        {...fieldPropsTest}
        description="Chocolate teapot"
        descriptionProps={{ id: "description-id" }}
      >
        <input
          id="testField"
          type="text"
          aria-labelledby="label-id"
          aria-describedby="description-id"
        />
      </Field>
    );
    cy.get(fieldDescription)
      .should("have.attr", "id", "description-id")
      .and("have.text", "Chocolate teapot");
  });

  it("renders an error message and spreads errorProps to it.", () => {
    cy.mount(
      <Field
        {...fieldPropsTest}
        validationState="invalid"
        errorMessage="Teapot fail!"
        errorMessageProps={{ id: "error-id" }}
      >
        <input
          id="testField"
          type="text"
          aria-labelledby="label-id"
          aria-invalid="true"
          aria-describedby="error-id"
        />
      </Field>
    );
    cy.get(fieldError)
      .should("have.attr", "id", "error-id")
      .and("have.text", "Teapot fail!");
  });

  it("error takes precidence replacing help description.", () => {
    cy.mount(
      <Field
        {...fieldPropsTest}
        description="Chocolate teapot"
        descriptionProps={{ id: "description-id" }}
        validationState="invalid"
        errorMessage="Teapot fail!"
        errorMessageProps={{ id: "error-id" }}
      >
        <input
          id="testField"
          type="text"
          aria-labelledby="label-id"
          aria-invalid="true"
          aria-describedby="error-id"
        />
      </Field>
    );
    cy.get(fieldDescription).should("not.exist");
    cy.get(fieldError).should("be.visible");
  });
});

describe("Adornments", () => {
  it("renders start adornment", () => {
    cy.mount(
      <Field {...fieldPropsTest} startAdornment="£">
        <input id="testField" type="text" aria-labelledby="label-id" />
      </Field>
    );
    cy.get('[data-id="field--start-adornment"]')
      .should("exist")
      .and("have.text", "£");
  });

  it("renders end adornment", () => {
    cy.mount(
      <Field {...fieldPropsTest} endAdornment=".00">
        <input id="testField" type="text" aria-labelledby="label-id" />
      </Field>
    );
    cy.get('[data-id="field--end-adornment"]')
      .should("exist")
      .and("have.text", ".00");
  });
});
