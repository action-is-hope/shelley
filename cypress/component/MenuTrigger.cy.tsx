import React, { useRef } from "react";

import { Popup, PopupProps, Button } from "../../src/indexLib";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";

const popupElm = "[data-cy-popup]";

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

// Does Flip

describe("MenuTrigger", () => {
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

  it("is not close on blur by default.", () => {
    cy.mount(<SimplePopup />);
    cy.get("#buttonTrigger").click();
    cy.get(popupElm).should("be.visible");
    cy.get("#focusLink").focus();
    cy.get(popupElm).should("be.visible");
  });

  it("close on blur.", () => {
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
});
