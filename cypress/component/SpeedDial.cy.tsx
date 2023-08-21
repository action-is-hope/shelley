import React from "react";
import { SpeedDial, SpeedDialAction } from "../../src/indexLib";
import CheckIcon from "../../src/icons/Check";

const speedDialTooltipTitle = "Speed Dial title";
const speedDialActionTooltipTitle = "Speed Dial Action title";

const speedDialComponent = (
  <SpeedDial tooltipTitle={speedDialTooltipTitle}>
    <SpeedDialAction
      icon={<CheckIcon />}
      onMouseDown={() => {}}
      tooltipTitle={speedDialActionTooltipTitle}
    />
  </SpeedDial>
);

describe("SpeedDial Component", () => {
  it("opens and closes the speed dial on button click", () => {
    cy.mount(speedDialComponent);
    cy.get('[data-id="button-group"]').should("not.be.visible");
    cy.get('[data-id="tooltip-button"]').first().trigger("click");
    cy.get('[data-id="button-group"]').should("be.visible");
    cy.get('[data-id="tooltip-button"]').first().trigger("click");
    cy.get('[data-id="button-group"]').should("not.be.visible");
    cy.wait(3000);
  });
});
