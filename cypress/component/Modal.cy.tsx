import React, { useState } from "react";
import { Button, Modal, ModalProps } from "../../src/indexLib";

const modal = '[data-id="modal"]';
const backdrop = '[data-id="modal-backdrop"]';
const content = '[data-id="modal-content"]';
const trigger = '[data-id="trigger"]';
const close = '[data-id="close"]';
const portal = '[data-id="portal"]';

export const ModalExample = (args: ModalProps) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOverlayOpen(!overlayOpen)} data-id="trigger">
        Toggle
      </Button>
      <Modal
        isOpen={overlayOpen !== false}
        onDismiss={() => setOverlayOpen(false)}
        {...args}
        data-id="modal"
      >
        <div>
          <span>Content</span>
          <Button onPress={() => setOverlayOpen(false)} data-id="close">
            Close
          </Button>
        </div>
      </Modal>
      {/* The following exists in component-index.html */}
      {/* <div id="portal" data-id="portal"></div> */}
    </>
  );
};

describe("Basic Modal", () => {
  it("renders working modal, isOpen and onDismiss working as expected.", () => {
    cy.mount(<ModalExample />);
    cy.get(content).should("not.exist");
    cy.get(trigger).realClick();
    cy.get(backdrop).should("exist");
    cy.get(content).should("contain.text", "Content");
  });
});

// CSS Transitions
// transition added and transition classes
// timeout...
//
describe("Isolation mode", () => {
  it("isolation is enabled", () => {
    cy.mount(
      <ModalExample
        portalSelector="#portal"
        transitionProps={{ timeout: 190 }}
      />
    );
    cy.get(trigger).realClick();
    cy.get("[data-cy-root]").should("have.attr", "aria-hidden");
  });

  it("isolation is disabled", () => {
    cy.mount(
      <ModalExample
        portalSelector="#portal"
        focusOnProps={{ noIsolation: true }}
        transitionProps={{ timeout: 190 }}
      />
    );
    cy.get(trigger).realClick();
    cy.get(trigger).should("not.have.attr", "aria-hidden");
    cy.get("[data-cy-root]").should("not.have.attr", "aria-hidden");
  });

  // If for whatever reason we need to keep our transition mounted we won't want isolation on else it would always be on.
  it("unmountOnExit enables noIsolation", () => {
    cy.mount(
      <ModalExample
        portalSelector="#portal"
        transitionProps={{ timeout: 190, unmountOnExit: false }}
      />
    );
    cy.get(content).should("exist");
    cy.get("[data-cy-root]").should("not.have.attr", "aria-hidden");
    cy.get(trigger).should("not.have.attr", "aria-hidden");
  });
});

describe("Render placement", () => {
  it("portals into body by default", () => {
    cy.mount(<ModalExample />);
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
    cy.mount(<ModalExample portalSelector="#portal" />);
    cy.get(trigger).realClick();
    cy.get("#portal").should("exist").and("contain.text", "Content");
  });

  it("renders adjacent to trigger if portalSelector is false", () => {
    cy.mount(<ModalExample portalSelector={false} />);
    cy.get(trigger).realClick();
    cy.get(`${trigger} + ${modal}`)
      .should("exist")
      .and("contain.text", "Content");
  });
});

describe("Dismissing the Modal", () => {
  it("Clicking the backdrop closes by default", () => {
    cy.mount(<ModalExample />);
    cy.get(trigger).realClick();
    cy.get(modal).click("topRight");
    cy.get(content).should("not.exist");
  });
  it("disableBackdropClick", () => {
    cy.mount(<ModalExample disableBackdropClick />);
    cy.get(trigger).realClick();
    cy.get(modal).click("topRight");
    cy.get(content).should("exist");
  });
  it("onBackdropClickSpy do something.", () => {
    const onBackdropClickSpy = cy.spy().as("onBackdropClickSpy");
    cy.mount(<ModalExample onBackdropClick={onBackdropClickSpy} />);
    cy.get(trigger).realClick();
    cy.get(modal).click("topRight");
    cy.get("@onBackdropClickSpy").should("have.been.called");
  });
  it("escape key closes by default", () => {
    cy.mount(<ModalExample />);
    cy.get(trigger).realClick();
    cy.realPress("Escape");
    cy.get(content).should("not.exist");
  });
  it("disableEscapeKey", () => {
    cy.mount(<ModalExample disableEscapeKey />);
    cy.get(trigger).realClick();
    cy.realPress("Escape");
    cy.get(content).should("exist");
  });
});

describe("Focusing", () => {
  it("first item focused by default & focus returns to trigger", () => {
    cy.mount(<ModalExample />);
    cy.get(trigger).realClick();
    cy.get(close).should("be.focused");
    cy.realPress("Escape");
    cy.get(trigger).should("be.focused");
  });
});
