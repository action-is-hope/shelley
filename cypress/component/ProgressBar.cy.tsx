import React from "react";

import { ProgressBar } from "../../src/ProgressBar/ProgressBar";

describe("ProgressBar", () => {
  it("renders with value and label", () => {
    const value = 50;
    const label = "Progress";
    cy.mount(<ProgressBar value={value} label={label} />);
    cy.get('[data-testid="progress-bar"]').should("exist");
    cy.get('[data-testid="progress-bar"]').should("have.attr", "aria-valuenow", value.toString());
    cy.get('[data-testid="progress-bar"]').should("contain", label);
  });

  it("renders with custom size", () => {
    const size = "large";
    cy.mount(<ProgressBar size={size} />);
    cy.get('[data-testid="progress-bar"]').should("have.class", `size-${size}`);
  });

  it("renders as indeterminate", () => {
    cy.mount(<ProgressBar isIndeterminate={true} />);
    cy.get('[data-testid="progress-bar"]').should("have.attr", "aria-valuenow", "0");
    cy.get('[data-testid="progress-bar"]').should("have.class", "indeterminate");
  });

  it("renders multi-step ProgressBar", () => {
    const totalSteps = 5;
    const currentStep = 3;
    const stepProgress = 50;
    cy.mount(<ProgressBar totalSteps={totalSteps} currentStep={currentStep} stepProgress={stepProgress} />);
    cy.get('[data-testid="progress-bar"]').should("have.class", "multi-step");
    cy.get('[data-testid="step-indicator"]').should("have.length", totalSteps);
    cy.get('[data-testid="step-indicator"]').eq(currentStep - 1).should("have.class", "active");
    cy.get('[data-testid="step-indicator-fill"]').eq(currentStep - 1).should("have.css", "width", `${stepProgress}%`);
  });

  it("has correct accessibility attributes", () => {
    const ariaLabel = "Loading";
    cy.mount(<ProgressBar aria-label={ariaLabel} />);
    cy.get('[data-testid="progress-bar"]').should("have.attr", "aria-label", ariaLabel);
  });

  it("supports internationalization", () => {
    const locale = "es-ES";
    const value = 50;
    const label = "Progreso";
    cy.mount(<ProgressBar value={value} aria-label={label} />, {
      preMountHook: (win) => {
        win.navigator.language = locale;
      }
    });
    cy.get('[data-testid="progress-bar"]').should("contain", `${value}%`);
  });
});
