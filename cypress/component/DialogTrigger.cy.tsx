import React, { createRef } from "react";
import {
  DialogTrigger,
  DialogTriggerProps,
  Dialog,
  Button,
  H2,
  P,
} from "../../src/indexLib";

// @ts-ignore
import { classes as dialogClasses } from "../../src/Dialog/dialog.st.css";

const popup = '[data-id="dialogTiggerTest--popup"]';
const popupArrow = '[data-id="dialogTiggerTest--popup-arrow"]';

const modal = '[data-id="dialogTiggerTest--modal"]';
const modalBackdrop = '[data-id="dialogTiggerTest--modal-backdrop"]';

const trigger = '[data-id="trigger"]';
const portal = '[data-id="portal"]';

interface DialogTriggerTest extends Omit<DialogTriggerProps, "children"> {
  refTest?: React.RefObject<HTMLElement>;
}

// incorrect number of children

// modal
// transition
// transitionProps
// disableModalBackdropBlur

const BasicContentTrigger = (args: DialogTriggerTest) => (
  <div style={{ height: "150vh" }}>
    <DialogTrigger {...args} data-id="dialogTiggerTest">
      <Button data-id="trigger">Simple Content</Button>
      <Dialog>
        <H2 vol={4} className={dialogClasses.title} data-title>
          Title
        </H2>
        <hr className={dialogClasses.divider} />
        <P data-content className={dialogClasses.content}>
          Content
        </P>
      </Dialog>
    </DialogTrigger>
  </div>
);

const DialogWithFocusableContent = (args: DialogTriggerTest) => (
  <div style={{ height: "150vh" }}>
    <DialogTrigger
      {...args}
      portalSelector="#portal"
      data-id="dialogTiggerTest"
    >
      <Button data-id="trigger">Focusable Content</Button>
      <Dialog>
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
  describe("Events", () => {
    it("onOpenChange - popup", () => {
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");
      cy.mount(
        <BasicContentTrigger onOpenChange={onOpenChangeSpy} type="popup" />
      );
      cy.get(trigger).realClick();
      cy.get("@onOpenChangeSpy").should("have.been.called");
      cy.get("@onOpenChangeSpy").should("have.been.calledWith", true);
      cy.realPress("Escape");
      cy.get("@onOpenChangeSpy").should("have.been.calledWith", false);
    });

    it("onOpenChange - modal", () => {
      const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");
      cy.mount(<BasicContentTrigger onOpenChange={onOpenChangeSpy} />);
      cy.get(trigger).realClick();
      cy.get("@onOpenChangeSpy").should("have.been.called");
      cy.get("@onOpenChangeSpy").should("have.been.calledWith", true);
      cy.realPress("Escape");
      cy.get("@onOpenChangeSpy").should("have.been.calledWith", false);
    });
  });

  describe("Type", () => {
    describe("Popup", () => {
      it("renders type: popup - opens on trigger press, renders content", () => {
        cy.mount(<BasicContentTrigger type="popup" />);
        cy.get(popup).should("not.exist");
        cy.get(trigger).realClick();
        cy.get(popup).should("exist");
        cy.get("[data-content]").should("contain.text", "Content");
      });
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

    describe("Modal", () => {
      it("shards", () => {
        const preview = createRef<HTMLDivElement>();
        cy.mount(
          <div>
            <DialogTrigger
              data-id="dialogTiggerTest"
              focusOnProps={{ shards: [preview] }}
            >
              <Button data-id="trigger">Triger</Button>
              <Dialog>
                <Button data-action-button-dialog>Dialog button</Button>
              </Dialog>
            </DialogTrigger>

            <div ref={preview}>
              <Button data-action-button-inside>Inside shard</Button>
            </div>
            <Button data-action-button-outside>Outside shard</Button>
          </div>
        );
        cy.get(trigger).realClick();
        cy.realPress("Tab");
        // First tab to button inside the modal
        cy.get("[data-action-button-dialog]").should("be.focused");
        cy.realPress("Tab");
        // Second tab to button out the modal but inside the shard
        cy.get("[data-action-button-inside]").should("be.focused");
        cy.realPress("Tab");
        // Thrid tab to button out the modal AND outside the shard
        cy.get("[data-action-button-outside]").should("not.be.focused");
        cy.get("[data-action-button-dialog]").should("be.focused");
      });
    });
  });

  describe("Popup specific", () => {
    // shouldCloseOnBlur
    // targetRef

    it("isOpen renders Popup with arrow", () => {
      cy.mount(<BasicContentTrigger type="popup" isOpen />);
      cy.get(popup).should("exist").and("include.text", "Content");
      cy.get(popupArrow).should("exist");
    });
    it("isOpen renders Popup without arrow", () => {
      cy.mount(<BasicContentTrigger type="popup" isOpen hideArrow />);
      cy.get(popup).should("exist").and("include.text", "Content");
      cy.get(popupArrow).should("not.exist");
    });
  });
});
