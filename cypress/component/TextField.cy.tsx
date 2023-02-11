import React, { RefObject } from "react";
import { createRef } from "react";
import type { AriaTextFieldProps } from "@react-types/textfield";
import { Field, FieldProps, HelpText } from "../../src/indexLib";
import { useTextField } from "react-aria";

const fieldTest = '[data-id="field"]';
const labelTest = '[data-id="field--label"]';
const descriptionTest = '[data-id="help--description"]';
const errorTest = '[data-id="help--error"]';

const itemTwo = '[data-key="item-two"]';
const itemThree = '[data-key="item-three"]';

interface BasicFieldProps extends FieldProps {
  testingProps?: React.HTMLAttributes<HTMLInputElement>;
}

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

// const BasicField = function (props: FieldProps) {
//   const inputRef = React.useRef() as RefObject<HTMLInputElement>;

//   return (
//     <Field {...props}>
//       <input id="test" aria-labelledby="label-id" type="text" />
//     </Field>
//   );
// };

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

  // it("renders a label and spreads labelProps to it.", () => {
  //   cy.mount(
  //     <Field {...fieldPropsTest}>
  //       <input id="testField" type="text" aria-labelledby="label-id" />
  //     </Field>
  //   );
  //   cy.get(labelTest)
  //     .should("have.attr", "id", "label-id")
  //     .and("have.attr", "for", "test")
  //     .and("have.attr", "data", "random")
  //     .and("have.text", "My field");
  // });
});

// Renders a fieldset when variant is added
// Renders classes...? See snapshots...
// Changes label position

// it("renders as button with onPress called via click", () => {
//   const onPressSpy = cy.spy().as("onPressSpy");
//   cy.mount(<Button onPress={onPressSpy}>Save changes</Button>);
//   cy.get(":button").click();
//   cy.get("@onPressSpy").should("have.been.called");
// });
// it("renders as disabled button", () => {
//   cy.mount(<Button disabled>Save changes</Button>);
//   cy.get(":button").should("be.disabled");
// });
// it("renders with custom class name", () => {
//   cy.mount(<Button className="cypress-test">Custom classname</Button>);
//   cy.get(":button")
//     .should("have.attr", "class")
//     .and("to.have.string", "cypress-test");
// });
// it("forwards refs", () => {
//   const buttonRef = createRef<HTMLButtonElement>();
//   cy.mount(
//     <>
//       <button
//         data-id="cy-button-trigger"
//         onClick={() => buttonRef?.current?.focus()}
//       >
//         Click me
//       </button>
//       <Button data-id="cy-button" ref={buttonRef}>
//         Save changes
//       </Button>
//     </>
//   );
//   cy.get(`[data-id="cy-button-trigger"]`).click();
//   cy.get(`[data-id="cy-button"]`).should("be.focused");
// });
// it("renders as anchor with href and the link works as expected", () => {
//   cy.mount(
//     <Button as={"a"} href="https://google.com">
//       Link to Google
//     </Button>
//   );
//   cy.get("a")
//     .invoke("attr", "href")
//     .should("equal", "https://google.com")
//     .then((href) => {
//       href && cy.request(href).its("status").should("eq", 200);
//     });
// });
