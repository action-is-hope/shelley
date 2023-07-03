import React from "react";

import { ProgressBar } from "../../src/ProgressBar/ProgressBar";


const testProps = {
  "aria-label": "Loading…",
  "data-id": "progressBar",
  "aria-valuenow": "50"
};
const progressBar = '[data-id="progressBar"]';

describe("ProgressBar", () => {
  it("renders  with value and accesibility label", () => {
    cy.mount(<ProgressBar isIndeterminate {...testProps} />);
    cy.get('[data-id="progressBar"]')
      .should("have.attr", "aria-label", testProps["aria-label"])
      .should("have.attr", "aria-valuenow").and("to.have.string", testProps["aria-valuenow"])
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
              (ref?.current?.attributes as DataIdDOMAttribute)?.["data-id"]
                ?.value
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
    cy.mount(<ProgressBar size={size} {...testProps} />)

  });

  it("renders as indeterminate", () => {
    cy.mount(<ProgressBar isIndeterminate {...testProps} />);
    cy.get(progressBar)
      .should("have.attr", "class")
      .and("to.have.string", "isIndeterminate");
  });

  it("renders multi-step ProgressBar", () => {

    const multiSteProps = {
      "aria-label": "Loading…",
      "aria-valuenow": "50",
      "totalSteps": 5,
      "currentStep": 3,
      "stepProgress": "50",
      "data-id": "progressBar",
    };

    cy.mount(<ProgressBar {...multiSteProps} />);

    cy.get(progressBar)
      .should("have.attr", "class")
      .and("to.have.string", "ProgressBar")
      .should("to.have.string", "multistep")

    cy.get('[data-id="stepIndicator"]').should("have.length", multiSteProps["totalSteps"]);
    // cy.get('[data-id="stepIndicatorFill"]').eq(multiSteProps["currentStep"]).should("have.attr", "class")
    //   .and("to.have.string", "isActive")
    // cy.get('[data-id="stepIndicatorFill"]').eq(multiSteProps["currentStep"]).should("have.css", "width", `${multiSteProps["stepProgress"]}%`);
  });




});
