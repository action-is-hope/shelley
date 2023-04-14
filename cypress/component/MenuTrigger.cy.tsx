import React, { useState } from "react";

import {
  MenuTrigger,
  Menu,
  Item,
  Button,
  MenuTriggerProps,
} from "../../src/indexLib";

const popup = '[data-id="popup"]';
const popupArrow = '[data-id="popup-arrow"]';
const trigger = '[data-id="trigger"]';

const BasicMenuTrigger = (args: Omit<MenuTriggerProps, "children">) => (
  <>
    <MenuTrigger data-id="popup" {...args}>
      <Button data-id="trigger">View</Button>
      <Menu>
        <Item key="item-one">Item One</Item>
        <Item key="item-two">Item Two</Item>
        <Item key="item-three">Item Three</Item>
      </Menu>
    </MenuTrigger>
    <button data-focusable-element>Focusable element</button>
    <div id="popupContainer" />
  </>
);

const ControlledMenuTrigger = (args: Omit<MenuTriggerProps, "children">) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuTrigger
        data-id="popup"
        isOpen={open}
        onOpenChange={setOpen}
        {...args}
      >
        <Button data-id="trigger">View</Button>
        <Menu>
          <Item key="item-one">Item One</Item>
          <Item key="item-two">Item Two</Item>
          <Item key="item-three">Item Three</Item>
        </Menu>
      </MenuTrigger>
      <Button data-external-trigger onPress={() => setOpen(!open)}>
        Set Open
      </Button>
    </>
  );
};

describe("MenuTrigger", () => {
  it("Renders and functions with correct aria attributes on trigger and menu.", () => {
    cy.mount(<BasicMenuTrigger />);
    cy.get(popup).should("not.exist");

    // Trigger Aria
    cy.get(trigger).should("have.attr", "aria-haspopup").and("equal", "true");
    cy.get(trigger).should("have.attr", "aria-expanded").and("equal", "false");
    cy.get(trigger).should("have.attr", "id");

    // Initialise the overlay
    cy.get(trigger).click();

    // Trigger Aria is updated
    cy.get(trigger).should("have.attr", "aria-expanded").and("equal", "true");
    cy.get(trigger).should("have.attr", "aria-controls");

    // Popup
    cy.get(popup).should("be.visible");

    // Popup Aria
    cy.get(trigger).then(($Trigger) => {
      // Get ids from the button
      const triggerId = $Trigger.attr("id");
      const triggerAriaControls = $Trigger.attr("aria-controls");
      // Assert that we can find the menu using the id's from button in our selectors.
      cy.get(popup).get(`[aria-labelledby="${triggerId}"]`).should("exist");
      cy.get(popup).get(`#${triggerAriaControls}`).should("exist");
    });
    // Close
    cy.realPress("Escape");
    cy.get(popup).should("not.exist");
  });

  it("Popup arrow is visible by default", () => {
    cy.mount(<BasicMenuTrigger />);
    cy.get(trigger).click();
    cy.get(popupArrow).should("exist");
  });

  it("hideArrow", () => {
    cy.mount(<BasicMenuTrigger hideArrow />);
    cy.get(trigger).click();
    cy.get(popupArrow).should("not.exist");
  });

  it("Renders into a choosen element via portal", () => {
    cy.mount(<BasicMenuTrigger portalSelector="#popupContainer" />);
    cy.get(trigger).click();
    cy.get("#popupContainer [data-id=popup]").should("exist");
  });

  it("onOpenChange", () => {
    const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");
    cy.mount(<BasicMenuTrigger onOpenChange={onOpenChangeSpy} />);
    cy.get(trigger).click();
    cy.get("@onOpenChangeSpy").should("have.been.calledWith", true);
    cy.realPress("Escape");
    cy.get("@onOpenChangeSpy").should("have.been.calledWith", false);
  });

  it("Closes onBlur", () => {
    cy.mount(<BasicMenuTrigger />);
    cy.get(trigger).click();
    cy.get(popup).should("exist");
    cy.realPress("Tab");
    cy.get(popup).should("not.exist");
  });

  it("allows for controlled state via open props", () => {
    cy.mount(<ControlledMenuTrigger />);
    cy.get(popup).should("not.exist");
    cy.get("[data-external-trigger]").click();
    cy.get(popup).should("exist");
    cy.get(trigger).realClick();
    cy.get(popup).should("not.exist");
  });
});
