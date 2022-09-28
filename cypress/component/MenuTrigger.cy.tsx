import React, { useRef, useState } from "react";

import {
  MenuTrigger,
  Menu,
  Item,
  Button,
  MenuTriggerProps,
} from "../../src/indexLib";

// portalSelector
// controlled
// shouldFlip

const BasicMenuTrigger = (args: Omit<MenuTriggerProps, "children">) => (
  <MenuTrigger data-cy="popup" {...args}>
    <Button data-cy="trigger">View</Button>
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
      <MenuTrigger data-cy="popup" isOpen={open} onOpenChange={setOpen}>
        <Button data-cy="trigger">View</Button>
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

describe("MenuTrigger", () => {
  it("Renders with correct aria attributes on trigger and menu.", () => {
    cy.mount(<BasicMenuTrigger />);
    cy.getDataCy("popup").should("not.exist");
    cy.getDataCy("trigger").should("have.attr", "aria-haspopup").and("equal", "true");
    cy.getDataCy("trigger").should("have.attr", "aria-expanded").and("equal", "false");
    cy.getDataCy("trigger").should("have.attr", "id");

    cy.getDataCy("trigger").click();
    cy.getDataCy("trigger").should("have.attr", "aria-expanded").and("equal", "true");
    cy.getDataCy("trigger").should("have.attr", "aria-controls");

    cy.getDataCy("popup").should("be.visible");

    cy.getDataCy("trigger").then(($Trigger) => {
      // Get ids from the button
      const triggerId = $Trigger.attr("id");
      const triggerAriaControls = $Trigger.attr("aria-controls");
      // Assert that we can find the menu using the id's from button in our selectors.
      cy.getDataCy("popup").get(`[aria-labelledby="${triggerId}"]`).should("exist")
      cy.getDataCy("popup").get(`#${triggerAriaControls}`).should("exist")
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
