import { CYCLIC_KEY } from "@storybook/addon-actions";
import { equal } from "assert";
import React, { useRef, useState } from "react";

import {
  MenuTrigger,
  Menu,
  Item,
  Button,
  MenuTriggerProps,
} from "../../src/indexLib";

const popover = "[data-cy-popover]";
const trigger = "[data-cy-trigger]";
// portalSelector

const BasicMenuTrigger = (args: Omit<MenuTriggerProps, "children">) => (
  <MenuTrigger data-cy-popover="" {...args}>
    <Button data-cy-trigger="">View</Button>
    <Menu>
      <Item key="item-one">Item One</Item>
      <Item key="item-two">Item Two</Item>
      <Item key="item-three">Item Three</Item>
    </Menu>
  </MenuTrigger>
);

const ControlledMenuTrigger = (args: MenuTriggerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuTrigger data-cy-popover="" isOpen={open} onOpenChange={setOpen}>
        <Button data-cy-trigger="">View</Button>
        <Menu>
          <Item key="item-one">Item One</Item>
          <Item key="item-two">Item Two</Item>
          <Item key="item-three">Item Three</Item>
        </Menu>
      </MenuTrigger>
      <Button onPress={() => setOpen(!open)}></Button>
    </>
  );
};

// Does Flip

describe("MenuTrigger", () => {
  it("Renders with correct aria attributes on trigger and menu.", () => {
    cy.mount(<BasicMenuTrigger />);
    cy.get(popover).should("not.exist");
    cy.get(trigger).should("have.attr", "aria-haspopup").and("equal", "true");
    cy.get(trigger).should("have.attr", "aria-expanded").and("equal", "false");
    cy.get(trigger).should("have.attr", "id");

    cy.get(trigger).click();
    cy.get(trigger).should("have.attr", "aria-expanded").and("equal", "true");
    cy.get(trigger).should("have.attr", "aria-controls");

    cy.get(popover).should("be.visible");

    cy.get(trigger).then(($Trigger) => {
      // Get ids from the button
      const triggerId = $Trigger.attr("id");
      const triggerAriaControls = $Trigger.attr("aria-controls");
      // Assert that we can find the menu using the id's from button
      cy.get(`${popover} [aria-labelledby="${triggerId}"]`).should("exist");
      cy.get(`${popover} #${triggerAriaControls}`).should("exist");
    });
  });

  // it("is dismissable by default.", () => {
  //   cy.mount(<SimplePopup />);
  //   cy.get("#buttonTrigger").click();
  //   cy.get(popupElm).should("be.visible");
  //   cy.get("body").click();
  //   cy.get(popupElm).should("not.exist");
  //   cy.get("#focusLink").click();
  // });

  // it("is not close on blur by default.", () => {
  //   cy.mount(<SimplePopup />);
  //   cy.get("#buttonTrigger").click();
  //   cy.get(popupElm).should("be.visible");
  //   cy.get("#focusLink").focus();
  //   cy.get(popupElm).should("be.visible");
  // });

  // it("close on blur.", () => {
  //   cy.mount(<SimplePopup shouldCloseOnBlur />);
  //   cy.get("#buttonTrigger").click();
  //   cy.get(popupElm).should("be.visible");
  //   cy.get("#focusLink").focus();
  //   cy.get(popupElm).should("not.exist");
  // });

  // it("is keyboard dismissable by default.", () => {
  //   cy.mount(<SimplePopup />);
  //   cy.get("#buttonTrigger").click();
  //   cy.get(popupElm).should("be.visible");
  //   cy.get(popupElm).trigger("keydown", { keyCode: 27 });
  //   cy.get(popupElm).should("not.exist");
  // });

  // it("is not dismissable but is keyboard dismissable", () => {
  //   cy.mount(<SimplePopup isDismissable={false} />);
  //   cy.get("#buttonTrigger").click();
  //   cy.get(popupElm).should("be.visible");
  //   cy.get(popupElm).trigger("keydown", { keyCode: 27 });
  //   cy.get(popupElm).should("not.exist");
  // });

  // it("is not dismissable or keyboard dismissable", () => {
  //   cy.mount(
  //     <SimplePopup isDismissable={false} isKeyboardDismissDisabled={true} />
  //   );
  //   cy.get("#buttonTrigger").click();
  //   cy.get(popupElm).should("be.visible");
  //   cy.get(popupElm).trigger("keydown", { keyCode: 27 });
  //   cy.get(popupElm).should("exist");
  // });
});

describe("Popup placement", () => {
  /* 'bottom' */
  // it("'bottom' is positioned as expected", () => {
  //   cy.mount(<SimplePopup placement="bottom" />);
  //   cy.get("#buttonTrigger").click();
  //   cy.get(popupElm)
  //     .should("have.css", "position", "absolute")
  //     .and("have.css", "top", "160px")
  //     .and("have.css", "left", "100px");
  // });
});
