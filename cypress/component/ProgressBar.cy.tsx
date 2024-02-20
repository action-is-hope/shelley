import React from "react";
import { ProgressBar } from "../../src/Progress/ProgressBar";

const testProps = {
  "aria-label": "Loading…",
  "data-id": "progressBar",
};
const progressBar = '[data-id="progressBar"]';
const track = '[data-id="progressBar-track"]';
const fill = '[data-id="progressBar-fill"]';
const label = '[data-id="progressBar-label"]';
const valueLabel = '[data-id="progressBar-valueLabel"]';

describe("ProgressBar", () => {
  it("renders with value and accesibility label", () => {
    const value = 50;
    cy.mount(<ProgressBar value={value} {...testProps} />);
    cy.get('[data-id="progressBar"]')
      .should("have.attr", "aria-label", testProps["aria-label"])
      .should("have.attr", "aria-valuenow")
      .and("to.have.string", value);
    cy.get(fill)
      .should("have.attr", "style")
      .and("include", `width: ${value}%`);
  });

  it("renders visible label", () => {
    cy.mount(<ProgressBar label="Visible label" value={50} {...testProps} />);
    cy.get(label).should("exist").and("have.text", "Visible label");
  });

  it("renders value label", () => {
    cy.mount(
      <ProgressBar valueLabel="Value label" value={50} {...testProps} />
    );
    cy.get(valueLabel).should("exist").and("have.text", "Value label");
  });

  it("renders class with custom class name", () => {
    cy.mount(
      <ProgressBar className="cypress-test" value={50} {...testProps} />
    );

    cy.get(progressBar)
      .should("have.attr", "class")
      .and("to.have.string", "ProgressBar")
      .and("to.have.string", "cypress-test");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    const onPressSpy = cy.spy().as("onPressSpy");

    cy.mount(
      <>
        <button
          onClick={() =>
            onPressSpy(
              (
                ref?.current?.attributes as {
                  "data-id"?: { value: string };
                }
              )?.["data-id"]?.value
            )
          }
        >
          Click
        </button>
        <ProgressBar
          className="cypress-test"
          value={50}
          ref={ref}
          {...testProps}
        />
      </>
    );
    cy.get(":button").click();
    cy.get("@onPressSpy").should("have.been.calledWith", "progressBar");
  });

  it("renders with custom size", () => {
    const size = "large";
    cy.mount(<ProgressBar size={size} {...testProps} />);
  });

  it("renders as indeterminate", () => {
    cy.mount(<ProgressBar isIndeterminate {...testProps} />);
    cy.get(progressBar)
      .should("have.attr", "class")
      .and("to.have.string", "isIndeterminate");
  });

  it("renders multi-step ProgressBar", () => {
    const multiStepProps = {
      "aria-label": "Loading…",
      totalSteps: 5,
      value: 50,
      "data-id": "progressBar",
    };

    cy.mount(<ProgressBar {...multiStepProps} />);

    cy.get(progressBar)
      .should("have.attr", "class")
      .and("to.have.string", "ProgressBar")
      .should("to.have.string", "multistep");

    cy.get(track).should("have.length", multiStepProps["totalSteps"]);

    cy.get(fill)
      .eq(2)
      .should("have.attr", "class")
      .and("to.have.string", "ProgressBar")
      .and("to.have.string", "isActive");

    cy.get(fill)
      .eq(2)
      .should("have.attr", "style")
      .and("include", `width: ${multiStepProps["value"]}%`);
  });

  it("renders multi-step with custom scale", () => {
    const multiStepProps = {
      "aria-label": "Loading…",
      totalSteps: 5,
      value: 2.5,
      maxValue: 5,
      "data-id": "progressBar",
    };

    cy.mount(<ProgressBar {...multiStepProps} />);

    cy.get(progressBar)
      .should("have.attr", "class")
      .and("to.have.string", "ProgressBar")
      .should("to.have.string", "multistep");

    cy.get(track).should("have.length", multiStepProps["totalSteps"]);

    cy.get(fill)
      .eq(2)
      .should("have.attr", "class")
      .and("to.have.string", "ProgressBar")
      .and("to.have.string", "isActive");

    cy.get(fill)
      .eq(2)
      .should("have.attr", "style")
      .and("include", `width: 50%`);
  });
});
