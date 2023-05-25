import React from "react";
import { ProgressCircle } from "../../src/ProgressCircle/ProgressCircle";

const testProps = {
  "aria-label": "Loading…",
  "data-id": "progressCircle",
};

const progressCircle = '[data-id="progressCircle"]';

describe("ProgressCircle", () => {
  it("renders as indeterminate", () => {
    cy.mount(<ProgressCircle isIndeterminate {...testProps} />);
    cy.get(progressCircle)
      .should("have.attr", "class")
      .and("to.have.string", "isIndeterminate");
  });

  it("renders class with custom class name", () => {
    cy.mount(
      <ProgressCircle className="cypress-test" value={50} {...testProps} />
    );

    cy.get(progressCircle)
      .should("have.attr", "class")
      .and("to.have.string", "ProgressCircle")
      .and("to.have.string", "cypress-test");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    const onPressSpy = cy.spy().as("onPressSpy");

    cy.mount(
      <>
        <button
          onClick={() =>
            onPressSpy(ref?.current?.attributes?.["data-id"]?.value)
          }
        >
          Click
        </button>
        <ProgressCircle
          className="cypress-test"
          value={50}
          ref={ref}
          {...testProps}
        />
      </>
    );
    cy.get(":button").click();
    cy.get("@onPressSpy").should("have.been.calledWith", "progressCircle");
  });
});
