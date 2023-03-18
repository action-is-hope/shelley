import React, { useRef, useState } from "react";
import { Button, Modal, ModalProps, Dialog } from "../../src/indexLib";

const modal = '[data-id="modal"]';
const backdrop = '[data-id="modal--backdrop"]';
const content = '[data-id="modal--content"]';
const trigger = '[data-id="trigger"]';
const close = '[data-id="close"';
const portal = '[data-id="portal"';

export const DialogExample = (args: ModalProps) => {
  const refTest = useRef(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOverlayOpen(!overlayOpen)} data-id="trigger">
        Toggle
      </Button>
      <Modal
        isOpen={overlayOpen !== false}
        onDismiss={() => setOverlayOpen(false)}
        portalSelector="#portal"
        variant={1}
        transitionProps={{
          // className: classes.dialogTransition,
          timeout: 190,
        }}
        {...args}
        includeDataIds
      >
        <Dialog ref={refTest}>
          <span>Content</span>
          <Button
            onPress={() => setOverlayOpen(false)}
            data-id="close"
            autoFocus
          >
            Close
          </Button>

          <Button onPress={() => console.log(refTest)} data-id="close">
            REF
          </Button>
        </Dialog>
      </Modal>
      {/* The following exists in component-index.html */}
      {/* <div id="portal" data-id="portal"></div> */}
    </>
  );
};

describe("Basic Dialog", () => {
  it("renders working modal", () => {
    cy.mount(<DialogExample />);
    cy.get(trigger).click();
    cy.get(content).should("contain.text", "Content");
  });

  it("first item focused by default & focus returns to trigger", () => {
    cy.mount(<DialogExample />);
    cy.get(trigger).click();
    cy.get(close).should("be.focused");
    cy.get("body").trigger("keydown", {
      eventConstructor: "KeyboardEvent",
      keyCode: 27,
    });
    cy.get(trigger).should("be.focused");
  });
});
