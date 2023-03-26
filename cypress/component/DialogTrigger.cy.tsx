import React, { useRef, useState, createRef } from "react";
import {
  ActionButton,
  DialogTrigger,
  DialogTriggerProps,
  Dialog,
  DialogProps,
  Button,
  H2,
  Text,
  ButtonGroup,
  P,
} from "../../src/indexLib";

// @ts-ignore
import { classes as dialogClasses } from "../../src/components/Dialog/dialog.st.css";

const title = "[data-title";
const dialog = '[data-id="dialog"]';
const closeButton = '[data-id="modal--closeButton"';

const popup = '[data-id="popup"]';
const popupArrow = '[data-id="popup--arrow"]';

const modal = '[data-id="modal"]';
const modalBackdrop = '[data-id="modal--backdrop"]';
const modalContent = '[data-id="modal--content"]';
const trigger = '[data-id="trigger"]';
const close = '[data-id="close"]';
const portal = '[data-id="portal"]';

interface DialogTriggerTest extends Omit<DialogTriggerProps, "children"> {
  refTest?: React.RefObject<HTMLElement>;
}

// throws error if incorrect number of children
// type renders correct type of Dialog
// protal selector

// modal
// hideArrow works

// transition
// transitionProps
// disableModalBackdropBlur

const BasicContentTrigger = (args: DialogTriggerTest) => (
  <div style={{ height: "150vh" }}>
    <DialogTrigger {...args} includeDataIds>
      <ActionButton data-id="trigger">Simple Content</ActionButton>
      <Dialog includeDataIds>
        <H2 vol={4} className={dialogClasses.title} data-title>
          Title
        </H2>
        <hr className={dialogClasses.divider} />
        <P data-content className={dialogClasses.content}>
          Content
        </P>
        {/* <Button data-focus-button>Focus button</Button> */}
      </Dialog>
    </DialogTrigger>
  </div>
);

const DialogWithFocusableContent = (args: DialogTriggerTest) => (
  <div style={{ height: "150vh" }}>
    <DialogTrigger {...args} portalSelector="#portal" includeDataIds>
      <ActionButton data-id="trigger">Focusable Content</ActionButton>
      <Dialog includeDataIds>
        <H2 vol={4} className={dialogClasses.title} data-title>
          Title
        </H2>
        <hr className={dialogClasses.divider} />
        <P data-content className={dialogClasses.content}>
          Content
        </P>
        <Button data-focus-button>Focus button</Button>
      </Dialog>
    </DialogTrigger>
  </div>
);

describe("Dialog Trigger", () => {
  describe("Type", () => {
    describe("Popup", () => {
      it("renders type: popup - opens on trigger press, renders content", () => {
        cy.mount(<BasicContentTrigger type="popup" />);
        cy.get(popup).should("not.exist");
        cy.get(trigger).realClick();
        cy.get(popup).should("exist");
        cy.get("[data-content]").should("contain.text", "Content");
      });
      // targetRef
      // hideArrow
    });
    describe("Modal", () => {
      it("renders type: modal - opens on trigger press, renders content", () => {
        cy.mount(<BasicContentTrigger />);
        cy.get(modal).should("not.exist");
        cy.get(trigger).realClick();
        cy.get(modal).should("exist");
        cy.get("[data-content]").should("contain.text", "Content");
      });
    });
  });

  describe("Portals", () => {
    describe("Popup", () => {
      const focusGuardSelector =
        "[data-focus-guard] + [data-focus-lock-disabled]";
      it("portals into body by default", () => {
        cy.mount(<BasicContentTrigger type="popup" />);
        cy.get(trigger).realClick();
        /**
         * We have a portal container ready as the last thing
         * in the DOM so it should render directly adjacent
         * to that.
         */
        cy.get(`${portal} + ${focusGuardSelector} ${popup}`)
          .should("exist")
          .and("contain.text", "Content");
      });
      it("portals into defined #portal container", () => {
        cy.mount(<BasicContentTrigger type="popup" portalSelector="#portal" />);
        cy.get(trigger).realClick();
        cy.get("#portal").should("exist").and("contain.text", "Content");
      });
      it("renders adjacent to trigger if portalSelector is false", () => {
        cy.mount(<BasicContentTrigger type="popup" portalSelector={false} />);
        cy.get(trigger).realClick();
        cy.get(`${trigger} + ${focusGuardSelector} ${popup}`)
          .should("exist")
          .and("contain.text", "Content");
      });
    });

    describe("Modal", () => {
      it("portals into body by default", () => {
        cy.mount(<BasicContentTrigger />);
        cy.get(trigger).realClick();
        /**
         * We have a portal container ready as the last thing
         * in the DOM so it should render directly adjacent
         * to that.
         */
        cy.get(`${portal} + ${modal}`)
          .should("exist")
          .and("contain.text", "Content");
      });
      it("portals into defined #portal container", () => {
        cy.mount(<BasicContentTrigger portalSelector="#portal" />);
        cy.get(trigger).realClick();
        cy.get("#portal").should("exist").and("contain.text", "Content");
      });
      it("renders adjacent to trigger if portalSelector is false", () => {
        cy.mount(<BasicContentTrigger portalSelector={false} />);
        cy.get(trigger).realClick();
        cy.get(`${trigger} + ${modal}`)
          .should("exist")
          .and("contain.text", "Content");
      });
    });
  });

  describe("Dismissing", () => {
    // popup shouldCloseOnBlur

    describe("Popup", () => {
      it("Closes (via escape) by default", () => {
        cy.mount(<BasicContentTrigger type="popup" />);
        cy.get(trigger).realClick();
        cy.get(popup).should("exist");
        cy.realPress("Escape");
        cy.get(popup).should("not.exist");
      });
      it("isKeyboardDismissDisabled", () => {
        cy.mount(
          <BasicContentTrigger type="popup" isKeyboardDismissDisabled />
        );
        cy.get(trigger).realClick();
        cy.get(popup).should("exist");
        cy.realPress("Escape");
        cy.get(popup).should("exist");
      });
      it("click outside closes by default", () => {
        cy.mount(<BasicContentTrigger type="popup" />);
        cy.get(trigger).realClick();
        cy.get(popup).should("exist");
        cy.get("body").realClick({ position: "topRight" });
        // Wait for any future transition to run.
        cy.wait(500);
        cy.get(popup).should("not.exist");
      });
      // Popups are always dismissable on clicking outside/
      it("click outside closes with isDismissable set to false", () => {
        cy.mount(<BasicContentTrigger type="popup" isDismissable={false} />);
        cy.get(trigger).realClick();
        cy.get(popup).should("exist");
        cy.get("body").realClick({ position: "topRight" });
        // Wait for any future transition to run.
        cy.wait(500);
        cy.get(popup).should("not.exist");
      });
    });

    describe("Modal", () => {
      it("closes (via escape) by default", () => {
        cy.mount(<BasicContentTrigger />);
        cy.get(trigger).realClick();
        cy.get(modal).should("exist");
        cy.realPress("Escape");
        cy.get(modal).should("not.exist");
      });
      it("isKeyboardDismissDisabled", () => {
        cy.mount(<BasicContentTrigger isKeyboardDismissDisabled />);
        cy.get(trigger).realClick();
        cy.get(modal).should("exist");
        cy.realPress("Escape");
        cy.get(modal).should("exist");
      });
      it("on backdrop click does not close by default", () => {
        cy.mount(<BasicContentTrigger />);
        cy.get(trigger).realClick();
        cy.get(modal).should("exist");
        cy.get(modalBackdrop).realClick({ position: "topRight" });
        // Wait for transition to run.
        cy.wait(500);
        cy.get(modal).should("exist");
      });
      it("isDismissable enables close on backdrop click", () => {
        cy.mount(<BasicContentTrigger isDismissable />);
        cy.get(trigger).realClick();
        cy.get(modal).should("exist");
        cy.get(modalBackdrop).realClick({ position: "topRight" });
        // Wait for transition to run.
        cy.wait(500);
        cy.get(modal).should("not.exist");
      });
    });
  });

  describe("FocusOn works as expected", () => {
    /**
     * Smoke tests of what we most care about from FocusOn.
     */
    describe("Popup", () => {
      it("first item focuses by default and returns focus", () => {
        cy.mount(<DialogWithFocusableContent type="popup" />);
        cy.get(trigger).realClick();
        cy.get("[data-focus-button]").should("be.focused");
        cy.realPress("Escape");
        cy.get(trigger).should("be.focused");
      });
      it("autoFocus set to false works as expected", () => {
        cy.mount(
          <DialogWithFocusableContent
            type="popup"
            focusOnProps={{ autoFocus: false }}
          />
        );
        cy.get(trigger).realClick();
        cy.get("[data-focus-button]").should("not.be.focused");
        // We would need to tab into the lock as autoFocus is off.
        cy.realPress("Tab").realPress("Tab");
        cy.realPress("Escape");
        cy.get(trigger).should("be.focused");
      });
      it("focus-on events (only activation and deactivation are supported within the DialogTrigger.)", () => {
        const onActivationSpy = cy.spy().as("onActivationSpy");
        const onDeactivationSpy = cy.spy().as("onDeactivationSpy");
        cy.mount(
          <BasicContentTrigger
            type="popup"
            focusOnProps={{
              onActivation: onActivationSpy,
              onDeactivation: onDeactivationSpy,
            }}
          />
        );
        cy.get(trigger).realClick();
        cy.realPress("Escape");
        cy.get("@onActivationSpy").should("have.been.called");
        cy.get("@onDeactivationSpy").should("have.been.called");
      });
      it("scroll lock is enabled by default; scrolling does not dismiss popup", () => {
        cy.mount(<DialogWithFocusableContent type="popup" />);
        cy.get(trigger).realClick();
        cy.realPress("PageDown");
        cy.get(popup).should("exist");
      });
      it("when scrollLock is disabled; scrolling dismisses popup", () => {
        cy.mount(
          <DialogWithFocusableContent
            type="popup"
            focusOnProps={{ scrollLock: false }}
          />
        );
        cy.get(trigger).realClick();
        cy.realPress("PageDown");
        cy.get(popup).should("not.exist");
      });
    });

    // popup isKeyboardDismissDisabled={true} - working isDismissable always on
    // popup shouldCloseOnBlur

    //modalprops

    // DialogWithFocusableContent
    // modal isKeyboardDismissDisabled={true} - working - requires isDismissable

    // Modal does work but it doesn't dismiss
    // it("modal: onEscapeKey", () => {
    //   const onEscapeSpy = cy.spy().as("onEscapeSpy");
    //   cy.mount(<BasicContentTrigger focusOnProps={{ onEscapeKey: onEscapeSpy }} />);
    //   cy.get(trigger).realClick();
    //   cy.realPress("Escape");
    //   cy.get("@onEscapeSpy").should("have.been.called");
    // });
    /**
     * onClickOutside & onEscapeKey unsupported as it seems
     * preventDefault is enacted by react-aria.
     * Use Modal directly if this is required. Tests for Popup and Modal... */
    // Unsupported for popup
    // it("popup onEscapeKey", () => {
    //   const onEscapeSpy = cy.spy().as("onEscapeSpy");
    //   cy.mount(
    //     <BasicContentTrigger
    //       type="popup"
    //       focusOnProps={{ onEscapeKey: onEscapeSpy }}
    //     />
    //   );
    //   cy.get(trigger).realClick();
    //   cy.realPress("Escape");
    //   cy.get("@onEscapeSpy").should("have.been.called");
    // });
  });
});
