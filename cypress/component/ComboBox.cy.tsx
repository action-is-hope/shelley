import React, { useState } from "react";
import {
  ComboBox,
  ComboBoxProps,
  Select,
  SelectProps,
  Item,
} from "../../src/indexLib";

const comboBox = '[data-id="comboBox"]';
const label = '[data-id="comboBox--label"]';
const trigger = '[data-id="comboBox--trigger"]';
const textInput = '[data-id="comboBox--input"]';
const popup = '[data-id="comboBox--popup"]';
const listBox = '[data-id="comboBox--listBox"]';

// const listbox = '[role="listbox"]';
const itemOne = '[data-key="item-one"]';
const itemTwo = '[data-key="item-two"]';
const itemThree = '[data-key="item-three"]';

const BasicComboBox = function <T extends object>(
  props: Omit<ComboBoxProps<T>, "children">
) {
  return (
    <ComboBox
      data-id="comboBox"
      label="ComboBox label"
      portalSelector="#portal"
      {...props}
    >
      <Item key="item-one">Item One</Item>
      <Item key="item-two">Item Two</Item>
      <Item key="item-three">Item Three</Item>
    </ComboBox>
  );
};

describe("Basic ComboBox", () => {
  it("Renders correct parts.", () => {
    cy.mount(<BasicComboBox />);
    cy.get(label).should("exist").and("have.text", "ComboBox label");
    cy.get(comboBox).should("exist");
    cy.get(trigger).should("exist");
    cy.get(popup).should("not.exist");
  });

  it("Opens and closes", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).realClick();
    cy.get(popup).should("exist");
    cy.get(listBox).should("exist");
    cy.get("body").realClick({ position: "bottomLeft" });
    cy.get(popup).should("not.exist");
  });

  it("Has correct content", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).realClick();
    cy.get('[role="option"]').should("have.length", 3);
    cy.get(itemOne).should("have.text", "Item One");
    cy.get(itemTwo).should("have.text", "Item Two");
    cy.get(itemThree).should("have.text", "Item Three");
  });

  it("Trigger opens and focuses the text input", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).realClick();
    cy.get(popup).should("exist");
    cy.get(textInput).should("be.focused");
  });

  it("Down arrow opens and focuses first item", () => {
    cy.mount(<BasicComboBox />);
    cy.get(textInput).focus();
    cy.realPress("{downarrow}");
    cy.get(popup).should("exist");
    cy.get(itemOne)
      .should("have.attr", "class")
      .and("to.have.string", "isFocused");
  });

  it("Escape key closes and focus goes to input", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).realClick();
    cy.realPress("Escape");
    cy.get(popup).should("not.exist");
    cy.get(textInput).should("be.focused");
  });

  // Autocomplete
  it("Shows items matching string only", () => {
    cy.mount(<BasicComboBox />);
    cy.get(textInput).type("Item O");
    cy.get(itemOne).should("exist");
    cy.get(itemTwo).should("not.exist");
    cy.get(itemThree).should("not.exist");
  });

  it("Partial match", () => {
    cy.mount(<BasicComboBox />);
    cy.get(textInput).type("em ");
    cy.get(itemOne).should("exist");
    cy.get(itemTwo).should("exist");
    cy.get(itemThree).should("exist");
  });
});

// describe("Basic ListBox", () => {
//   it("Should refer it itself if an aria-label and aria-labelledby are provided", () => {
//     cy.mount(
//       <BasicListBox
//         id="example2"
//         aria-labelledby="labelled-by-id"
//         aria-label="I label myself if I have aria-label"
//       />
//     );
//     cy.get(listbox).and(
//       "have.attr",
//       "aria-labelledby",
//       "labelled-by-id example2"
//     );
//   });

//   it("first item is not focused by default", () => {
//     cy.mount(<BasicListBox />);
//     cy.get(itemOne).should("not.be.focused");
//   });

//   it("first item focused", () => {
//     cy.mount(<BasicListBox autoFocus="first" />);
//     cy.get(itemOne).should("be.focused");
//   });

//   it("last item focused", () => {
//     cy.mount(<BasicListBox autoFocus="last" />);
//     cy.get(itemThree).should("be.focused");
//   });

//   it("keyboard focus should not wrap by default", () => {
//     cy.mount(<BasicListBox autoFocus="first" />);
//     cy.get("[data-cy-root]").type(
//       "{downArrow}{downArrow}{downArrow}{downArrow}"
//     );
//     cy.get(itemThree).should("be.focused");
//   });

//   it("keyboard focus wraps (loops) via shouldFocusWrap", () => {
//     cy.mount(<BasicListBox autoFocus="first" shouldFocusWrap />);
//     cy.get("[data-cy-root] li:first-child").type(
//       "{downArrow}{downArrow}{downArrow}{downArrow}"
//     );
//     cy.get(itemTwo).should("be.focused");
//   });

//   it("onAction handler is called correctly", () => {
//     const onActionSpy = cy.spy().as("onActionSpy");
//     cy.mount(<BasicListBox onAction={onActionSpy} />);
//     cy.get(itemTwo).click();
//     cy.get("@onActionSpy").should("have.been.calledWith", "item-two");
//     cy.get(itemTwo).type("{enter}");
//     cy.get("@onActionSpy").should("have.been.calledWith", "item-two");
//     cy.get(itemTwo).type(" ");
//     cy.get("@onActionSpy").should("have.been.calledWith", "item-two");
//   });

//   it("onSelectionChange handler is called correctly", () => {
//     const onSelectionChangeSpy = cy.spy().as("onSelectionChangeSpy");

//     cy.mount(
//       <BasicListBox
//         selectionMode="single"
//         onSelectionChange={onSelectionChangeSpy}
//       />
//     );
//     cy.get(itemTwo).click();
//     cy.get("@onSelectionChangeSpy").should("have.been.calledOnce", "item-two");
//     cy.get(itemTwo).type("{enter}");
//     cy.get("@onSelectionChangeSpy").should("have.been.calledTwice", "item-two");
//     cy.get(itemTwo).type(" ");
//     cy.get("@onSelectionChangeSpy").should(
//       "have.been.calledThrice",
//       "item-two"
//     );
//   });
// });
// //   it("onClose handler is called when selecting an item", () => {
// //     const onCloseSpy = cy.spy().as("onCloseSpy");
// //     cy.mount(<BasicMenu onClose={onCloseSpy} />);
// //     cy.get(itemTwo).click();
// //     cy.get("@onCloseSpy").should("have.been.calledOnce");
// //   });
// // });

// describe("Uncontrolled listbox selection", () => {
//   it("uncontrolled: selected item is marked as 'checked' visually and accessibly", () => {
//     cy.mount(<BasicListBox selectionMode="single" />);
//     cy.get(itemThree)
//       .click()
//       .should("have.attr", "aria-selected")
//       .and("equal", "true");
//     cy.get(`${itemThree} [data-id="selected-icon"]`).should("be.visible");
//   });

//   it("uncontrolled: allows for pre-selected keys", () => {
//     cy.mount(
//       <BasicListBox
//         selectionMode="single"
//         defaultSelectedKeys={new Set(["item-two"])}
//       />
//     );
//     cy.get(itemTwo).should("have.attr", "aria-selected").and("equal", "true");
//   });

//   it("uncontrolled: single selection mode allows for 0 or 1 selection", () => {
//     const onSelectionChangeSpy = cy.spy().as("onSelectionChangeSpy");
//     const numSelected = cy.spy().as("numSelected");

//     cy.mount(
//       <BasicListBox
//         selectionMode="single"
//         onSelectionChange={(i) => {
//           const result = i as Set<string>;
//           // Check the size of the returning set
//           numSelected(result.size);
//           // Send the first value of the resulting set to the on selection spy.
//           onSelectionChangeSpy([...i][0]);
//         }}
//       />
//     );
//     // Select item
//     cy.get(itemThree).click();
//     cy.get("@onSelectionChangeSpy").should(
//       "have.been.calledWith",
//       "item-three"
//     );
//     // And another
//     cy.get(itemOne).click();
//     cy.get("@onSelectionChangeSpy")
//       .should("have.been.calledWith", "item-one")
//       .and("have.been.calledTwice");
//     cy.get("@numSelected").should("have.been.calledWith", 1);
//     // Deselect the same item
//     cy.get(itemOne).click();
//     cy.get("@numSelected").should("have.been.calledWith", 0);
//   });
// });

// // Controlled ListBox
// const ControlledListBox = function <T extends object>(
//   props: Omit<ListBoxProps<T>, "children">
// ) {
//   const [selected, setSelected] = useState(props.selectedKeys || new Set([]));
//   return (
//     <>
//       <ListBox
//         aria-label="Controlled listbox"
//         selectedKeys={selected}
//         onSelectionChange={setSelected}
//         {...props}
//       >
//         <Item key="item-one">Item One</Item>
//         <Item key="item-two">Item Two</Item>
//         <Item key="item-three">Item Three</Item>
//       </ListBox>

//       <p>
//         Current selection (controlled):{" "}
//         <span data-id="selected-items">{[...selected].join(", ")}</span>
//       </p>
//     </>
//   );
// };

// describe("Controlled listbox selection", () => {
//   it("controlled: selected item is marked as 'checked' visually and accessibly", () => {
//     cy.mount(<ControlledListBox selectionMode="single" />);
//     cy.get(itemThree).click();
//     cy.get(`${itemThree} [data-id="selected-icon"]`).should("be.visible");
//     cy.get(itemThree).should("have.attr", "aria-selected").and("equal", "true");
//   });

//   it("controlled: allows for pre-selected keys", () => {
//     cy.mount(
//       <ControlledListBox
//         selectionMode="single"
//         selectedKeys={new Set(["item-two"])}
//       />
//     );
//     cy.get(itemTwo).should("have.attr", "aria-selected").and("equal", "true");
//   });

//   it("controlled: single selection mode selects only one item", () => {
//     cy.mount(<ControlledListBox selectionMode="single" />);
//     cy.get(itemThree).click();
//     cy.get('[data-id="selected-items"]').contains("item-three");
//     cy.get(itemOne).click();
//     cy.get('[data-id="selected-items"]').should("have.text", "item-one");
//   });

//   it("controlled: multiple selection mode selects multiple items", () => {
//     cy.mount(<ControlledListBox selectionMode="multiple" />);
//     cy.get(itemOne).click();
//     cy.get('[data-id="selected-items"]').should("have.text", "item-one");
//     cy.get(itemThree).click();
//     cy.get('[data-id="selected-items"]').should(
//       "have.text",
//       "item-one, item-three"
//     );
//   });

//   it("controlled: multiple selection mode retains the order items where selected", () => {
//     cy.mount(<ControlledListBox selectionMode="multiple" />);
//     cy.get(itemThree).click();
//     cy.get('[data-id="selected-items"]').should("have.text", "item-three");
//     cy.get(itemOne).click();
//     cy.get('[data-id="selected-items"]').should(
//       "have.text",
//       "item-three, item-one"
//     );
//     cy.get(itemTwo).click();
//     cy.get('[data-id="selected-items"]').should(
//       "have.text",
//       "item-three, item-one, item-two"
//     );
//     // deselect
//     cy.get(itemOne).click();
//     cy.get(itemTwo).click();
//     cy.get(itemThree).click();
//     // select in different order
//     cy.get(itemTwo).click();
//     cy.get(itemOne).click();
//     cy.get(itemThree).click();
//     cy.get('[data-id="selected-items"]').should(
//       "have.text",
//       "item-two, item-one, item-three"
//     );
//   });
// });
