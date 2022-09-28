import React, { useState } from "react";

import {
  MenuTrigger,
  Menu,
  Item,
  Button,
  MenuTriggerProps,
} from "../../src/indexLib";

const BasicMenuTrigger = (args: Omit<MenuTriggerProps, "children">) => (
  <>
    <MenuTrigger data-cy="popup" {...args}>
      <Button data-cy="trigger">View</Button>
      <Menu>
        <Item key="item-one">Item One</Item>
        <Item key="item-two">Item Two</Item>
        <Item key="item-three">Item Three</Item>
      </Menu>
    </MenuTrigger>
    <button data-cy="focusable-element">Focusable element</button>
    <div id="popupContainer" />
  </>
);

const ControlledMenuTrigger = (args: Omit<MenuTriggerProps, "children">) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuTrigger
        data-cy="popup"
        isOpen={open}
        onOpenChange={setOpen}
        {...args}
      >
        <Button data-cy="trigger">View</Button>
        <Menu>
          <Item key="item-one">Item One</Item>
          <Item key="item-two">Item Two</Item>
          <Item key="item-three">Item Three</Item>
        </Menu>
      </MenuTrigger>
      <Button data-cy="external-trigger" onPress={() => setOpen(!open)}>
        Set Open
      </Button>
    </>
  );
};

describe("MenuTrigger", () => {
  it("Renders and functions with correct aria attributes on trigger and menu.", () => {
    cy.mount(<BasicMenuTrigger />);
    cy.getDataCy("popup").should("not.exist");
    cy.getDataCy("trigger")
      .should("have.attr", "aria-haspopup")
      .and("equal", "true");
    cy.getDataCy("trigger")
      .should("have.attr", "aria-expanded")
      .and("equal", "false");
    cy.getDataCy("trigger").should("have.attr", "id");

    cy.getDataCy("trigger").click();

    cy.getDataCy("trigger")
      .should("have.attr", "aria-expanded")
      .and("equal", "true");
    cy.getDataCy("trigger").should("have.attr", "aria-controls");

    cy.getDataCy("popup").should("be.visible");

    cy.getDataCy("trigger").then(($Trigger) => {
      // Get ids from the button
      const triggerId = $Trigger.attr("id");
      const triggerAriaControls = $Trigger.attr("aria-controls");
      // Assert that we can find the menu using the id's from button in our selectors.
      cy.getDataCy("popup")
        .get(`[aria-labelledby="${triggerId}"]`)
        .should("exist");
      cy.getDataCy("popup").get(`#${triggerAriaControls}`).should("exist");
    });

    cy.getDataCy("popup").trigger("keydown", { keyCode: 27 });
    cy.getDataCy("popup").should("not.exist");
  });

  it("Renders into a choosen element via portal", () => {
    cy.mount(<BasicMenuTrigger portalSelector="#popupContainer" />);
    cy.getDataCy("trigger").click();
    cy.get("#popupContainer > [data-cy=popup]").should("exist");
  });

  it("Closes onBlur", () => {
    cy.mount(<BasicMenuTrigger />);
    cy.getDataCy("trigger").click();
    cy.getDataCy("popup").should("exist");
    cy.getDataCy("focusable-element").focus();
    cy.getDataCy("popup").should("not.exist");
  });

  it("allows for controlled state via open props", () => {
    cy.mount(<ControlledMenuTrigger />);
    cy.getDataCy("popup").should("not.exist");
    cy.getDataCy("external-trigger").click();
    cy.getDataCy("popup").should("exist");
    cy.getDataCy("trigger").click();
    cy.getDataCy("popup").should("not.exist");
  });
});
