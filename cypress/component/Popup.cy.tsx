import React, { useRef } from "react";

import { Popup, PopupProps, Button } from "../../src/indexLib";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";

const popup = '[data-id="popup"]';
const popupArrow = '[data-id="popup--arrow"]';

const modal = '[data-id="modal"]';
const backdrop = '[data-id="modal--backdrop"]';
const content = '[data-id="modal--content"]';
const trigger = '[data-id="trigger"]';
const close = '[data-id="close"]';
const portal = '[data-id="portal"]';

// @todo:
// shouldFlip

export const SimplePopup = (args: Omit<PopupProps, "triggerRef">) => {
  const triggerRef = useRef(null);
  const state = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  console.log(triggerProps, overlayProps);
  return (
    <div style={{ padding: "120px" }}>
      {/* Whatever you use as a trigger will need an onPress prop... */}
      <Button
        {...triggerProps}
        // id="buttonTrigger"
        data-id="trigger"
        ref={triggerRef}
        // disabled={state.isOpen}
        style={{ width: "40px", height: "40px" }}
      >
        40px
      </Button>
      {/* {state.isOpen && ( */}
      <Popup
        // Focus
        {...overlayProps}
        isOpen={state.isOpen}
        onClose={() => state.close()}
        {...args}
        triggerRef={triggerRef}
        includeDataIds
      >
        <div style={{ height: "80px", width: "80px", background: "grey" }}>
          80px <Button data-focus-test>Focusable button</Button>
        </div>
      </Popup>
      {/* )} */}
      <a id="focusLink" href="#">
        Focus me
      </a>
    </div>
  );
};
// hideArrow
// classname
// data-id
describe("Focusing", () => {
  it("first item focused by default & focus returns to trigger", () => {
    cy.mount(<SimplePopup />);
    cy.get(trigger).click();
    cy.get("[data-focus-test]").should("be.focused");
    cy.get(popup).trigger("keydown", {
      eventConstructor: "KeyboardEvent",
      keyCode: 27,
    });
    cy.get(trigger).should("be.focused");
  });
});

describe("Basic Popup", () => {
  it("Renders required aria attributes.", () => {
    cy.mount(<SimplePopup />);
    cy.get(popup).should("not.exist");
    cy.get(trigger).click();
    cy.get(popup).should("be.visible").should("have.attr", "id");
  });

  it("is dismissable by default.", () => {
    cy.mount(<SimplePopup />);
    cy.get(trigger).click();
    cy.get(popup).should("be.visible");
    cy.get("body").click();
    cy.get(popup).should("not.exist");
    cy.get("#focusLink").click();
  });

  it("does not close onBlur by default.", () => {
    cy.mount(<SimplePopup />);
    cy.get(trigger).click();
    cy.get(popup).should("be.visible");
    cy.get("#focusLink").focus();
    cy.get(popup).should("be.visible");
  });

  it("closes on blur when specified.", () => {
    cy.mount(<SimplePopup shouldCloseOnBlur />);
    cy.get(trigger).click();
    cy.get(popup).should("be.visible");
    cy.get("#focusLink").focus();
    cy.get(popup).should("not.exist");
  });

  it("is keyboard dismissable by default.", () => {
    cy.mount(<SimplePopup />);
    cy.get(trigger).click();
    cy.get(popup).should("be.visible");
    // keyboard dismiss
    cy.get(popup).trigger("keydown", { keyCode: 27 });
    cy.get(popup).should("not.exist");
  });

  it("is not dismissable but is keyboard dismissable", () => {
    cy.mount(<SimplePopup isDismissable={false} />);
    cy.get(trigger).click();
    cy.get(popup).should("be.visible");
    // dismiss - .type('{esc}') not working, using tigger() instead.
    cy.get(popup).trigger("keydown", { keyCode: 27 });
    cy.get(popup).should("not.exist");
  });

  it("is not dismissable or keyboard dismissable", () => {
    cy.mount(
      <SimplePopup isDismissable={false} isKeyboardDismissDisabled={true} />
    );
    cy.get(trigger).click();
    cy.get(popup).should("be.visible");
    // dismiss - .type('{esc}') not working, using tigger() instead.
    cy.get(popup).trigger("keydown", { keyCode: 27 });
    cy.get(popup).should("exist");
  });
});

describe("Popup offsets", () => {
  it("offset is set for positive numbers", () => {
    cy.mount(<SimplePopup offset={10} />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "170px");
  });

  it("offset is set for negative numbers", () => {
    cy.mount(<SimplePopup offset={-10} />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "150px");
  });

  it("crossOffset is set for positive numbers", () => {
    cy.mount(<SimplePopup crossOffset={10} />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "left", "110px");
  });

  it("crossoffset is set for negative numbers", () => {
    cy.mount(<SimplePopup crossOffset={-10} />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "left", "90px");
  });
});

describe("Popup placement", () => {
  /* 'bottom' */
  it("'bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="bottom" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "100px");
  });

  it("'bottom left' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="bottom left" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "120px");
  });

  it("'bottom right' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="bottom right" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "80px");
  });

  it("'bottom start' is positioned as expected (as 'bottom left' in ltr)", () => {
    cy.mount(<SimplePopup placement="bottom start" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "120px");
  });

  it("'bottom end' is positioned as expected (as 'bottom right' in ltr)", () => {
    cy.mount(<SimplePopup placement="bottom end" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "80px");
  });

  /* 'top' */
  it("'top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="top" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "100px");
  });

  it("'top left' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="top left" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "120px");
  });

  it("'top right' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="top right" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "80px");
  });

  it("'top start' is positioned as expected (as 'top left' in ltr)", () => {
    cy.mount(<SimplePopup placement="top start" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "120px");
  });

  it("'top end' is positioned as expected (as 'top right' in ltr)", () => {
    cy.mount(<SimplePopup placement="top end" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "80px");
  });

  /* 'left' */
  it("'left' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="left" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "40px");
  });

  it("'left top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="left top" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "40px");
  });

  it("'left bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="left bottom" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "40px");
  });

  /* 'start' (same as 'left' in ltr) */
  it("'start' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="start" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "40px");
  });

  it("'start top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="start top" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "40px");
  });

  it("'start bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="start bottom" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "40px");
  });

  /* 'right' */
  it("'right' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="right" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "160px");
  });

  it("'right top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="right top" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "160px");
  });

  it("'right bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="right bottom" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "160px");
  });

  /* 'end' (same as 'right' in ltr) */
  it("'end' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="end" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "160px");
  });

  it("'end top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="end top" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "160px");
  });

  it("'end bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="end bottom" />);
    cy.get(trigger).click();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "160px");
  });
});
