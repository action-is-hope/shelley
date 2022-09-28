import React, { useRef } from "react";

import { Popup, PopupProps, Button } from "../../src/indexLib";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";

const popupElm = "[data-cy-popup]";

// @todo:
// shouldFlip

export const SimplePopup = (args: Omit<PopupProps, "triggerRef">) => {
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);
  const state = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  return (
    <div style={{ padding: "120px" }}>
      {/* Whatever you use as a trigger will need an onPress prop... */}
      <Button
        {...triggerProps}
        id="buttonTrigger"
        ref={triggerRef}
        disabled={state.isOpen}
        style={{ width: "40px", height: "40px" }}
      >
        40px
      </Button>
      {state.isOpen && (
        <Popup
          // Focus
          data-cy-popup
          {...overlayProps}
          isOpen={state.isOpen}
          onClose={() => state.close()}
          {...args}
          ref={overlayRef}
          triggerRef={triggerRef}
        >
          <div style={{ height: "80px", width: "80px", background: "grey" }}>
            80px
          </div>
        </Popup>
      )}
      <a id="focusLink" href="#">
        Focus me
      </a>
    </div>
  );
};

describe("Basic Popup", () => {
  it("Renders required aria attributes.", () => {
    cy.mount(<SimplePopup />);
    cy.get(popupElm).should("not.exist");
    cy.get("#buttonTrigger").click();
    cy.get(popupElm).should("be.visible").should("have.attr", "id");
  });

  it("is dismissable by default.", () => {
    cy.mount(<SimplePopup />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm).should("be.visible");
    cy.get("body").click();
    cy.get(popupElm).should("not.exist");
    cy.get("#focusLink").click();
  });

  it("does not close onBlur by default.", () => {
    cy.mount(<SimplePopup />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm).should("be.visible");
    cy.get("#focusLink").focus();
    cy.get(popupElm).should("be.visible");
  });

  it("closes on blur when set.", () => {
    cy.mount(<SimplePopup shouldCloseOnBlur />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm).should("be.visible");
    cy.get("#focusLink").focus();
    cy.get(popupElm).should("not.exist");
  });

  it("is keyboard dismissable by default.", () => {
    cy.mount(<SimplePopup />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm).should("be.visible");
    // keyboard dismiss
    cy.get(popupElm).trigger("keydown", { keyCode: 27 });
    cy.get(popupElm).should("not.exist");
  });

  it("is not dismissable but is keyboard dismissable", () => {
    cy.mount(<SimplePopup isDismissable={false} />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm).should("be.visible");
    // dismiss - .type('{esc}') not working, using tigger() instead.
    cy.get(popupElm).trigger("keydown", { keyCode: 27 });
    cy.get(popupElm).should("not.exist");
  });

  it("is not dismissable or keyboard dismissable", () => {
    cy.mount(
      <SimplePopup isDismissable={false} isKeyboardDismissDisabled={true} />
    );
    cy.get("#buttonTrigger").click();
    cy.get(popupElm).should("be.visible");
    // dismiss - .type('{esc}') not working, using tigger() instead.
    cy.get(popupElm).trigger("keydown", { keyCode: 27 });
    cy.get(popupElm).should("exist");
  });
});

describe("Popup offsets", () => {
  it("offset is set for positive numbers", () => {
    cy.mount(<SimplePopup offset={10} />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "170px");
  });

  it("offset is set for negative numbers", () => {
    cy.mount(<SimplePopup offset={-10} />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "150px");
  });

  it("crossOffset is set for positive numbers", () => {
    cy.mount(<SimplePopup crossOffset={10} />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "left", "110px");
  });

  it("crossoffset is set for negative numbers", () => {
    cy.mount(<SimplePopup crossOffset={-10} />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "left", "90px");
  });
});

describe("Popup placement", () => {
  /* 'bottom' */
  it("'bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="bottom" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "100px");
  });

  it("'bottom left' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="bottom left" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "120px");
  });

  it("'bottom right' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="bottom right" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "80px");
  });

  it("'bottom start' is positioned as expected (as 'bottom left' in ltr)", () => {
    cy.mount(<SimplePopup placement="bottom start" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "120px");
  });

  it("'bottom end' is positioned as expected (as 'bottom right' in ltr)", () => {
    cy.mount(<SimplePopup placement="bottom end" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "80px");
  });

  /* 'top' */
  it("'top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="top" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "100px");
  });

  it("'top left' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="top left" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "120px");
  });

  it("'top right' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="top right" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "80px");
  });

  it("'top start' is positioned as expected (as 'top left' in ltr)", () => {
    cy.mount(<SimplePopup placement="top start" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "120px");
  });

  it("'top end' is positioned as expected (as 'top right' in ltr)", () => {
    cy.mount(<SimplePopup placement="top end" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "80px");
  });

  /* 'left' */
  it("'left' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="left" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "40px");
  });

  it("'left top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="left top" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "40px");
  });

  it("'left bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="left bottom" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "40px");
  });

  /* 'start' (same as 'left' in ltr) */
  it("'start' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="start" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "40px");
  });

  it("'start top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="start top" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "40px");
  });

  it("'start bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="start bottom" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "40px");
  });

  /* 'right' */
  it("'right' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="right" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "160px");
  });

  it("'right top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="right top" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "160px");
  });

  it("'right bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="right bottom" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "160px");
  });

  /* 'end' (same as 'right' in ltr) */
  it("'end' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="end" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "160px");
  });

  it("'end top' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="end top" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "160px");
  });

  it("'end bottom' is positioned as expected", () => {
    cy.mount(<SimplePopup placement="end bottom" />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "160px");
  });
});
