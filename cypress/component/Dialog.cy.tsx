import React, { useRef, useState, createRef } from "react";
import {
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
const closeButton = '[data-id="dialog--closeButton"';
interface DialogTest extends Omit<DialogProps, "children"> {
  refTest?: React.RefObject<HTMLElement>;
}
export const StandaloneDialog = (args: DialogTest) => {
  const { refTest, ...rest } = args;
  return (
    <Dialog data-id="dialog" {...rest} ref={refTest}>
      <H2 vol={4} className={dialogClasses.title} data-title>
        Title
      </H2>
      <Text className={dialogClasses.header} as="header" vol={2}>
        Header
      </Text>
      <P className={dialogClasses.content}>Content</P>
      <ButtonGroup className={dialogClasses.buttonGroup}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" data-autofocus>
          Confirm
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};

// render stand alone, assings icon, onDismiss, isDismissible
describe("Basic Dialog", () => {
  it("renders working modal", () => {
    cy.mount(<StandaloneDialog />);
    cy.get(dialog).should("contain.text", "Content");
  });

  it("allows custom className", () => {
    cy.mount(<StandaloneDialog className="class-test" />);
    cy.get(dialog)
      .should("have.attr", "class")
      .and("to.have.string", "class-test");
  });

  it("renders aria properties correctly via data-title", () => {
    cy.mount(<StandaloneDialog />);
    cy.get(dialog).should("have.attr", "role").and("equal", "dialog");
    cy.get(title)
      .should("have.text", "Title")
      .invoke("attr", "id")
      .then((id) => cy.get(dialog).should("have.attr", "aria-labelledby", id));
  });

  it("supports alertdialog", () => {
    cy.mount(<StandaloneDialog role="alertdialog" />);
    cy.get(dialog).should("have.attr", "role").and("equal", "alertdialog");
  });

  it("forwards ref", () => {
    const dialogRef = createRef<HTMLElement>();
    const onPressSpy = cy.spy().as("onPressSpy");
    cy.mount(
      <>
        <StandaloneDialog refTest={dialogRef} />
        <Button
          data-ref-test
          onPress={() =>
            onPressSpy(dialogRef?.current?.attributes?.["data-id"]?.value)
          }
        />
      </>
    );
    cy.get("[data-ref-test]").click();
    cy.get("@onPressSpy").should("have.been.calledWith", "dialog");
  });
});

describe("Close button and isDismissable", () => {
  it("Renders close buton if isDismissable", () => {
    cy.mount(<StandaloneDialog isDismissable />);
    cy.get(closeButton)
      .should("have.attr", "aria-label")
      .and("equal", "Close dialog");
  });

  it("Renders close buton if Supports custom dismissLabel for close button", () => {
    cy.mount(<StandaloneDialog isDismissable dismissLabel="DISMISS!" />);
    cy.get(closeButton)
      .should("have.attr", "aria-label")
      .and("equal", "DISMISS!");
  });

  it("onDismiss fires as expected on click of the close button", () => {
    const onDismissSpy = cy.spy().as("onDismissSpy");
    cy.mount(<StandaloneDialog onDismiss={onDismissSpy} isDismissable />);
    cy.get(closeButton).click();
    cy.get("@onDismissSpy").should("have.been.called");
  });

  it("supports custom button icon element", () => {
    cy.mount(
      <StandaloneDialog
        isDismissable
        closeIcon={<span data-id-custom-icon />}
      />
    );
    cy.get(closeButton).get("[data-id-custom-icon]").should("exist");
  });
});

describe("Size", () => {
  it("renders as large by default", () => {
    cy.mount(<StandaloneDialog />);
    cy.get(dialog).should("have.attr", "class").and("to.have.string", "large");
  });

  it("renders as medium", () => {
    cy.mount(<StandaloneDialog size="medium" />);
    cy.get(dialog).should("have.attr", "class").and("to.have.string", "medium");
  });

  it("renders as small", () => {
    cy.mount(<StandaloneDialog size="small" />);
    cy.get(dialog).should("have.attr", "class").and("to.have.string", "small");
  });
});

// alert Dialog
