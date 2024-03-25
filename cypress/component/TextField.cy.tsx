import React from "react";
import { TextField } from "../../src/indexLib";

const fieldPropsTest = {
  "data-id": "textfield",
  label: "My field",
};
// data-id's are based on above data-id.
const textField = `[data-id="textfield"]`;
const fieldLabel = '[data-id="textfield--label"]';
const fieldInput = `[data-id="textfield--input"]`;
const fieldTextArea = `[data-id="textfield--textarea"]`;
const fieldDesc = '[data-id="textfield--helpText--description"]';
const fieldError = '[data-id="textfield--helpText--error"]';

describe("Basic TextField", () => {
  it("renders input correctly.", () => {
    cy.mount(<TextField {...fieldPropsTest} />);
    cy.get(fieldLabel).should("be.visible");
    cy.get(fieldInput).should("be.visible");
  });

  it("renders with custom class name", () => {
    cy.mount(<TextField {...fieldPropsTest} className="cypress-test" />);

    cy.get(textField)
      .should("have.attr", "class")
      .and("to.have.string", "textField")
      .and("to.have.string", "cypress-test");
  });

  it("renders label and input #a11y related attributes correctly.", () => {
    cy.mount(<TextField {...fieldPropsTest} />);
    cy.get(fieldInput)
      .invoke("attr", "id")
      .then((id) => cy.get(fieldLabel).should("have.attr", "for", id));
    cy.get(fieldLabel)
      .should("have.text", "My field")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldInput).should("have.attr", "aria-labelledby", id)
      );
  });

  it("takes input and fires onChange.", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<TextField {...fieldPropsTest} onChange={onChangeSpy} />);
    cy.get(fieldInput).type("More input! More input!");
    cy.get(fieldInput).should("have.value", "More input! More input!");
    cy.get("@onChangeSpy").should("have.been.called");
  });

  it("isDisabled.", () => {
    cy.mount(<TextField {...fieldPropsTest} isDisabled />);
    cy.get(fieldInput).should("be.disabled");
  });

  it("isReadOnly.", () => {
    cy.mount(
      <TextField {...fieldPropsTest} value="Delete me if you can!" isReadOnly />
    );
    cy.get(textField)
      .should("have.attr", "class")
      .and("to.have.string", "isReadOnly");
    cy.get(fieldInput)
      .should("have.value", "Delete me if you can!")
      .and("have.attr", "readonly");
  });
});

describe("TextField Help", () => {
  it("renders description correctly.", () => {
    cy.mount(
      <TextField {...fieldPropsTest} description="Number 5 likes input." />
    );
    cy.get(fieldDesc)
      .should("have.text", "Number 5 likes input.")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(fieldInput).should("have.attr", "aria-describedby", id)
      );
  });

  it("renders as invalid.", () => {
    cy.mount(<TextField {...fieldPropsTest} isInvalid />);
    cy.get(fieldInput).should("have.attr", "aria-invalid", "true");
  });

  it("renders errorMessage correctly.", () => {
    cy.mount(
      <TextField {...fieldPropsTest} errorMessage="No input!" isInvalid />
    );
    cy.get(fieldError)
      .should("have.text", "No input!")
      .invoke("attr", "id")
      .then((id) =>
        cy
          .get(fieldInput)
          .should("have.attr", "aria-describedby", id)
          .should("have.attr", "aria-invalid", "true")
      );
  });

  it("renders errorMessage instead of description.", () => {
    cy.mount(
      <TextField
        {...fieldPropsTest}
        description="Number 5 likes input."
        errorMessage="No input!"
        isInvalid
      />
    );
    cy.get(fieldDesc).should("not.exist");
    cy.get(fieldError)
      .should("have.text", "No input!")
      .invoke("attr", "id")
      .then((id) =>
        cy
          .get(fieldInput)
          .should("have.attr", "aria-describedby", id)
          .should("have.attr", "aria-invalid", "true")
      );
  });
});

describe("TextField Types", () => {
  it("renders as type password.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="password" />);
    cy.get(fieldInput).should("have.attr", "type", "password");
  });

  it("renders as type email.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="email" />);
    cy.get(fieldInput).should("have.attr", "type", "email");
  });

  it("renders as type number.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="number" />);
    cy.get(fieldInput).should("have.attr", "type", "number");
  });

  it("renders as type tel.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="tel" />);
    cy.get(fieldInput).should("have.attr", "type", "tel");
  });

  it("renders as type time.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="time" />);
    cy.get(fieldInput).should("have.attr", "type", "time");
  });

  it("renders as type url.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="url" />);
    cy.get(fieldInput).should("have.attr", "type", "url");
  });

  it("renders as type search.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="search" />);
    cy.get(fieldInput).should("have.attr", "type", "search");
  });
});

describe("TextField as textarea", () => {
  it("renders correctly.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="textarea" />);
    cy.get(`${textField} textarea`).should("exist");
  });

  it("renders with rows.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="textarea" rows={2} />);
    cy.get(fieldTextArea).should("have.attr", "rows", "2");
  });

  it("renders with value as data attribute for styling purposes.", () => {
    cy.mount(<TextField {...fieldPropsTest} type="textarea" rows={2} />);
    cy.get(fieldTextArea).type("Expanding textarea...");
    cy.get(`[data-value="Expanding textarea..."]`).should("exist");
  });
});
