import React, { useState } from "react";
import { Button, Modal, ModalProps } from "../../src/indexLib";

const modal = '[data-id="modal"]';
const backdrop = '[data-id="modal--backdrop"]';
const content = '[data-id="modal--content"]';
const trigger = '[data-id="trigger"]';
const close = '[data-id="close"';
const portal = '[data-id="portal"';

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
        // portalSelector="#portal"
        // initialFocusRef={inputRef}
        // transition={2}
        variant={1}
        // portalSelector={false}
        // focusOnProps={{ shards: shards }}
        // disableBackgroundClick
        // disableEscapeKey
        // disableFocusLock
        // data-testid="modal-window"
        transitionProps={{
          // className: classes.dialogTransition,
          timeout: 190,
        }}
        {...args}
        includeDataIds
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
  it("renders working modal", () => {
    cy.mount(<ModalExample />);
    cy.get(trigger).click();
    cy.get(content).should("contain.text", "Content");
  });

  it("renders inside portal", () => {
    cy.mount(<ModalExample portalSelector="#portal" />);
    cy.get(trigger).click();
    cy.get("#portal").should("contain.text", "Content");
  });

  it("Clicking the backdrop closes by default", () => {
    cy.mount(<ModalExample />);
    cy.get(trigger).click();
    cy.get(backdrop).click("topRight");
    cy.get(content).should("not.exist");
  });

  it("disableBackdropClick", () => {
    cy.mount(<ModalExample disableBackdropClick />);
    cy.get(trigger).click();
    cy.get(backdrop).click("topRight");
    cy.get(content).should("exist");
  });

  it("onBackdropClickSpy do something.", () => {
    const onBackdropClickSpy = cy.spy().as("onBackdropClickSpy");
    cy.mount(<ModalExample onBackdropClick={onBackdropClickSpy} />);
    cy.get(trigger).click();
    cy.get(backdrop).click("topRight");
    cy.get("@onBackdropClickSpy").should("have.been.called");
  });

  it("escape key closes by default", () => {
    cy.mount(<ModalExample />);
    cy.get(trigger).click();
    cy.get("body").trigger("keydown", {
      eventConstructor: "KeyboardEvent",
      keyCode: 27,
    });
    cy.get(content).should("not.exist");
  });

  it("disableEscapeKey", () => {
    cy.mount(<ModalExample disableEscapeKey />);
    cy.get(trigger).click();
    cy.get("body").trigger("keydown", {
      eventConstructor: "KeyboardEvent",
      keyCode: 27,
    });
    cy.get(content).should("exist");
  });

  it("first item focused by default & focus returns to trigger", () => {
    cy.mount(<ModalExample />);
    cy.get(trigger).click();
    cy.get(close).should("be.focused");
    cy.get("body").trigger("keydown", {
      eventConstructor: "KeyboardEvent",
      keyCode: 27,
    });
    cy.get(trigger).should("be.focused");
  });

  it("unmountOnExit enables noIsolation", () => {
    cy.mount(<ModalExample transitionProps={{ timeout: 190 }} />);
    cy.get(trigger).click();
    cy.get(trigger).should("not.have.attr", "aria-hidden");
  });

  it("unmountOnExit", () => {
    cy.mount(
      <ModalExample transitionProps={{ unmountOnExit: false, timeout: 190 }} />
    );
    cy.get(trigger).click();
    cy.get(close).should("be.focused");
    cy.get("body").trigger("keydown", {
      eventConstructor: "KeyboardEvent",
      keyCode: 27,
    });
    cy.get(trigger).should("be.focused");
  });
});

//   it("renders label and input #a11y related attributes correctly.", () => {
//     cy.mount(
//       <CheckboxGroup includeDataIds label="Field Label">
//         <Checkbox value="cb1" includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//         <Checkbox value="cb2" includeDataIds>
//           Checkbox label 2
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get(fieldLabel)
//       .should("have.text", "Field Label")
//       .invoke("attr", "id")
//       .then((id) =>
//         cy.get(fieldGroup).should("have.attr", "aria-labelledby", id)
//       );
//   });

//   it("fires onChange.", () => {
//     const onChangeSpy = cy.spy().as("onChangeSpy");
//     cy.mount(
//       <CheckboxGroup label="Field Label" onChange={onChangeSpy} includeDataIds>
//         <Checkbox value="cb1" includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//         <Checkbox value="cb2" includeDataIds>
//           Checkbox label 2
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get("input[value='cb1']").click();
//     cy.get("@onChangeSpy").should("have.been.calledWith", ["cb1"]);
//     cy.get("input[value='cb2']").click();
//     cy.get("@onChangeSpy").should("have.been.calledWith", ["cb1", "cb2"]);
//     cy.get(inputEl).should("be.checked");
//   });

//   it("defaultValue works as expected - uncontrolled", () => {
//     cy.mount(
//       <CheckboxGroup
//         includeDataIds
//         label="Field Label"
//         defaultValue={["cb1", "cb3"]}
//       >
//         <Checkbox value="cb1" includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//         <Checkbox value="cb2" includeDataIds>
//           Checkbox label 2
//         </Checkbox>
//         <Checkbox value="cb3" includeDataIds>
//           Checkbox label 3
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get("input[value='cb1']").should("be.checked");
//     cy.get("input[value='cb2']").should("not.be.checked");
//     cy.get("input[value='cb3']").should("be.checked");
//   });

//   it("value works as expected - controlled", () => {
//     cy.mount(
//       <CheckboxGroup includeDataIds label="Field Label" value={["cb1", "cb3"]}>
//         <Checkbox value="cb1" includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//         <Checkbox value="cb2" includeDataIds>
//           Checkbox label 2
//         </Checkbox>
//         <Checkbox value="cb3" includeDataIds>
//           Checkbox label 3
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get("input[value='cb1']").should("be.checked");
//     cy.get("input[value='cb2']").should("not.be.checked");
//     cy.get("input[value='cb3']").should("be.checked");
//   });
// });

// describe("CheckboxGroup isDisabled and isReadOnly", () => {
//   it("isDisabled - entire group", () => {
//     cy.mount(
//       <CheckboxGroup includeDataIds label="Field Label" isDisabled>
//         <Checkbox value="cb1" includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//         <Checkbox value="cb2" includeDataIds>
//           Checkbox label 2
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get(inputEl).should("be.disabled");
//   });

//   it("isDisabled - single item", () => {
//     cy.mount(
//       <CheckboxGroup includeDataIds label="Field Label">
//         <Checkbox value="cb1" isDisabled includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//         <Checkbox value="cb2" includeDataIds>
//           Checkbox label 2
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get("input[value='cb1']").should("be.disabled");
//     cy.get("input[value='cb2']").should("not.be.disabled");
//   });

//   it("isReadOnly - entire group", () => {
//     const onChangeSpy = cy.spy().as("onChangeSpy");
//     cy.mount(
//       <CheckboxGroup
//         includeDataIds
//         label="Field Label"
//         onChange={onChangeSpy}
//         isReadOnly
//       >
//         <Checkbox value="cb1" includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//         <Checkbox value="cb2" includeDataIds>
//           Checkbox label 2
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get("input[value='cb1']").click().and("not.be.checked");
//     cy.get("input[value='cb2']").click().and("not.be.checked");
//     cy.get("@onChangeSpy").should("not.have.been.called");
//   });

//   it("isReadOnly - single item", () => {
//     const onChangeSpy = cy.spy().as("onChangeSpy");
//     cy.mount(
//       <CheckboxGroup includeDataIds label="Field Label" onChange={onChangeSpy}>
//         <Checkbox value="cb1" isReadOnly includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//         <Checkbox value="cb2" includeDataIds>
//           Checkbox label 2
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get("input[value='cb1']").click().and("not.be.checked");
//     cy.get("input[value='cb2']").click().and("be.checked");
//     cy.get("@onChangeSpy").should("have.been.called", "once");
//   });
// });

// describe("CheckboxGroup Help", () => {
//   it("renders description correctly.", () => {
//     cy.mount(
//       <CheckboxGroup
//         includeDataIds
//         label="Field Label"
//         description="Number 5 likes input."
//       >
//         <Checkbox value="cb1" includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get(fieldDesc)
//       .should("have.text", "Number 5 likes input.")
//       .invoke("attr", "id")
//       .then((id) =>
//         cy.get(fieldGroup).should("have.attr", "aria-describedby", id)
//       );
//   });

//   it("renders errorMessage correctly.", () => {
//     cy.mount(
//       <CheckboxGroup
//         includeDataIds
//         label="Field Label"
//         errorMessage="No input!"
//         validationState="invalid"
//       >
//         <Checkbox value="cb1" includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get(fieldError)
//       .should("have.text", "No input!")
//       .invoke("attr", "id")
//       .then((id) =>
//         cy.get(fieldGroup).should("have.attr", "aria-describedby", id)
//       );
//   });

//   it("renders errorMessage instead of description.", () => {
//     cy.mount(
//       <CheckboxGroup
//         includeDataIds
//         label="Field Label"
//         description="Number 5 likes input."
//         errorMessage="No input!"
//         validationState="invalid"
//       >
//         <Checkbox value="cb1" includeDataIds>
//           Checkbox label 1
//         </Checkbox>
//       </CheckboxGroup>
//     );
//     cy.get(fieldDesc).should("not.exist");
//     cy.get(fieldError)
//       .should("have.text", "No input!")
//       .invoke("attr", "id")
//       .then((id) =>
//         cy.get(fieldGroup).should("have.attr", "aria-describedby", id)
//       );
//   });
// });

// describe("CheckboxGroup custom labels", () => {
//   it("defaultValue and onChange work as expected", () => {
//     const onChangeSpy = cy.spy().as("onChangeSpy");
//     cy.mount(
//       <CheckboxGroup
//         label="Field Label"
//         defaultValue={["cb2"]}
//         onChange={onChangeSpy}
//         includeDataIds
//       >
//         <label htmlFor="cb1">Label1</label>
//         <Checkbox id="cb1" value="cb1" includeDataIds />
//         <label htmlFor="cb2">Label2</label>
//         <Checkbox id="cb2" value="cb2" includeDataIds />
//       </CheckboxGroup>
//     );
//     cy.get("input[value='cb1']").click();
//     cy.get("@onChangeSpy").should("have.been.calledWith", ["cb2", "cb1"]);
//   });
// });
