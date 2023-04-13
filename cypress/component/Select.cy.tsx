import React, { useState } from "react";
import {
  ListBox,
  ListBoxProps,
  Select,
  SelectProps,
  Item,
} from "../../src/indexLib";

const select = '[data-id="select"]';
const label = '[data-id="select--label"]';
const trigger = '[data-id="select--trigger"]';
const hiddenSelect = '[data-id="select--hiddenSelect"]';
const popup = '[data-id="select--popup"]';
const listBox = '[data-id="select--listBox"]';

// const listbox = '[role="listbox"]';
const itemOne = '[data-key="item-one"]';
const itemTwo = '[data-key="item-two"]';
const itemThree = '[data-key="item-three"]';

const BasicSelect = function <T extends object>(
  props: Omit<SelectProps<T>, "children">
) {
  return (
    <Select label="Select label" data-id="select" {...props}>
      <Item key="item-one">Item One</Item>
      <Item key="item-two">Item Two</Item>
      <Item key="item-three">Item Three</Item>
    </Select>
  );
};

const DynamicCollection = function <T extends object>(
  props: Omit<SelectProps<T>, "children">
) {
  const options = [
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" },
    { id: 3, name: "Item Three" },
    { id: 4, name: "Item Four" },
    { id: 5, name: "Item Fix" },
    { id: 6, name: "Item Six" },
    { id: 7, name: "Item Seven" },
    { id: 8, name: "Item Eight" },
    { id: 9, name: "Item Nine" },
  ];

  return (
    <>
      <Select label="Select label" data-id="select" {...props} items={options}>
        {(item) => <Item>{item.name}</Item>}
      </Select>
    </>
  );
};

describe("Basic Select", () => {
  it("Renders correct parts.", () => {
    cy.mount(<BasicSelect />);
    cy.get(label).should("exist").and("have.text", "Select label");
    cy.get(select).should("exist");
    cy.get(trigger).should("exist");
    cy.get(popup).should("not.exist");
  });

  it("Opens and closes", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).realClick();
    cy.get(popup).should("exist");
    cy.get(listBox).should("exist");
    cy.get("body").realClick({ position: "bottomLeft" });
    cy.get(popup).should("not.exist");
  });

  it("Has correct content", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).realClick();
    cy.get('[role="option"]').should("have.length", 3);
    cy.get(itemOne).should("have.text", "Item One");
    cy.get(itemTwo).should("have.text", "Item Two");
    cy.get(itemThree).should("have.text", "Item Three");
  });

  it("First item focused by default", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).realClick();
    cy.get(itemOne).should("be.focused");
  });

  it("Focus is returned to trigger", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).focus();
    cy.get(trigger).realPress("Enter");
    cy.get(itemOne).should("be.focused");
    cy.realPress("Escape");
    cy.get(trigger).should("be.focused");
  });

  it("Tabbing off (onBlur) closes and focus returned to trigger", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).focus();
    cy.get(trigger).realPress("Enter");
    cy.get(itemOne).should("be.focused");
    cy.realPress("Tab");
    cy.get(popup).should("not.exist");
    cy.get(trigger).should("be.focused");
  });

  it("Stays open onScroll", () => {
    cy.mount(
      <div>
        <BasicSelect />
        <div style={{ height: "200vh" }}>Content</div>
        <div id="scrollToPoint">Scroll</div>
      </div>
    );
    cy.get(trigger).realClick();
    // Unable to test a realistic scroll
    cy.get("body").realPress("PageDown");
    cy.window().then(($window) => {
      expect($window.scrollY).to.be.eq(0);
    });
  });

  it("Renders a dynamic collection", () => {
    cy.mount(<DynamicCollection />);
    cy.get(trigger).focus();
    cy.get(trigger).realPress("Enter");
    cy.get('[role="option"]').should("have.length", 9);
  });

  // Events
  it("onSelectionChange fires as expected on click", () => {
    const onSelecttionChangeSpy = cy.spy().as("onSelecttionChangeSpy");
    cy.mount(<BasicSelect onSelectionChange={onSelecttionChangeSpy} />);
    cy.get(trigger).focus();
    cy.get(trigger).realPress("Enter");
    cy.get(itemOne).click();
    cy.get("@onSelecttionChangeSpy").should("have.been.calledWith", "item-one");
  });

  it("onSelectionChange fires as expected on keyboard select", () => {
    const onSelecttionChangeSpy = cy.spy().as("onSelecttionChangeSpy");
    cy.mount(<BasicSelect onSelectionChange={onSelecttionChangeSpy} />);
    cy.get(trigger).focus();
    cy.get(trigger).realPress("Enter");
    cy.get(trigger).realPress("{downarrow}");
    cy.get(trigger).realPress("Enter");
    cy.get("@onSelecttionChangeSpy").should("have.been.calledWith", "item-two");
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
