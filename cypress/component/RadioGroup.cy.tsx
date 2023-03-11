import React from "react";
import { Radio, RadioGroup } from "../../src/indexLib";

const fieldLabel = '[data-id="field--label"]';
const inputEl = '[data-id="radio--input"]';
const fieldDesc = '[data-id="help--description"]';
const fieldError = '[data-id="help--error"]';
const fieldGroup = '[role="radiogroup"]';

describe("RadioGroup", () => {
  it("renders childen, unchecked by default", () => {
    cy.mount(
      <RadioGroup includeDataIds label="Field Label">
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
      </RadioGroup>
    );
    cy.get(inputEl).should("not.be.checked");
  });

  it("renders label and input #a11y related attributes correctly.", () => {
    cy.mount(
      <RadioGroup includeDataIds label="Field Label">
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
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
      <RadioGroup label="Field Label" onChange={onChangeSpy} includeDataIds>
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
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
      <RadioGroup includeDataIds label="Field Label" defaultValue={"rad2"}>
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
        <Radio value="rad3" includeDataIds>
          Radio label 3
        </Radio>
      </RadioGroup>
    );
    cy.get("input[value='rad1']").should("not.be.checked");
    cy.get("input[value='rad2']").should("be.checked");
    cy.get("input[value='rad3']").should("not.be.checked");
  });

  it("value works as expected - controlled", () => {
    cy.mount(
      <RadioGroup includeDataIds label="Field Label" value="rad2">
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
        <Radio value="rad3" includeDataIds>
          Radio label 3
        </Radio>
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
      <RadioGroup includeDataIds label="Field Label" isDisabled>
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
      </RadioGroup>
    );
    cy.get(inputEl).should("be.disabled");
  });

  it("isDisabled - single item", () => {
    cy.mount(
      <RadioGroup includeDataIds label="Field Label">
        <Radio value="rad1" isDisabled includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
      </RadioGroup>
    );
    cy.get("input[value='rad1']").should("be.disabled");
    cy.get("input[value='rad2']").should("not.be.disabled");
  });

  it("isReadOnly - entire group", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <RadioGroup
        includeDataIds
        label="Field Label"
        onChange={onChangeSpy}
        isReadOnly
      >
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
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
      <RadioGroup
        includeDataIds
        label="Field Label"
        description="Number 5 likes input."
      >
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
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
        includeDataIds
        label="Field Label"
        errorMessage="No input!"
        validationState="invalid"
      >
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
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
        includeDataIds
        label="Field Label"
        description="Number 5 likes input."
        errorMessage="No input!"
        validationState="invalid"
      >
        <Radio value="cb1" includeDataIds>
          Radio label 1
        </Radio>
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
      <RadioGroup includeDataIds label="Field Label">
        <Radio value="rad1" includeDataIds>
          Radio label 1
        </Radio>
        <Radio value="rad2" includeDataIds>
          Radio label 2
        </Radio>
      </RadioGroup>
    );
    cy.get(inputEl).should("not.be.checked");
  });
});
