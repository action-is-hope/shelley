import React from "react";
import { Field } from "../../src/indexLib";

const labelTest = '[data-id="field--label"]';
const descriptionTest = '[data-id="help--description"]';
const errorTest = '[data-id="help--error"]';

const fieldPropsTest = {
  "data-id": "field",
  label: "My field",
  labelProps: {
    id: "label-id",
    htmlFor: "test",
    data: "random",
  },
  includeDataIds: true,
};

// Add Fieldset test

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
    cy.get(labelTest)
      .should("have.attr", "id", "label-id")
      .and("have.attr", "for", "test")
      .and("have.attr", "data", "random")
      .and("have.text", "My field");
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
    cy.get(descriptionTest)
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
    cy.get(errorTest)
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
    cy.get(descriptionTest).should("not.exist");
    cy.get(errorTest).should("be.visible");
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
