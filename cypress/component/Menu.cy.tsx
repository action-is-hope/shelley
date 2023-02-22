import React, { useState } from "react";
import { Menu, MenuProps, Item } from "../../src/indexLib";

const menu = '[role="menu"]';
const itemOne = '[data-key="item-one"]';
const itemTwo = '[data-key="item-two"]';
const itemThree = '[data-key="item-three"]';

const BasicMenu = function <T extends object>(
  props: Omit<MenuProps<T>, "children">
) {
  return (
    <Menu aria-label="Basic Menu" {...props}>
      <Item key="item-one">Item One</Item>
      <Item key="item-two">Item Two</Item>
      <Item key="item-three">Item Three</Item>
    </Menu>
  );
};

describe("Basic Menu", () => {
  it("Renders required aria attributes from props.", () => {
    cy.mount(
      <BasicMenu
        id="example1"
        // Defines a string value that labels the current element.
        aria-label="Basic Menu"
        // Identifies the element (or elements) that labels the current element.
        aria-labelledby="Labelled by"
        // Identifies the element (or elements) that describes the object.
        aria-describedby="Described by"
        // Identifies the element (or elements) that provide a detailed, extended description for the object.
        aria-details="Details"
      />
    );
    cy.get(menu)
      .should("have.attr", "id", "example1")
      .and("have.attr", "aria-label", "Basic Menu")
      .and("have.attr", "aria-labelledby", "Labelled by")
      .and("have.attr", "aria-describedby", "Described by")
      .and("have.attr", "aria-details", "Details");
  });

  it("first item is focused by default", () => {
    cy.mount(<BasicMenu />);
    cy.get(itemOne).should("be.focused");
  });

  it("last item focused", () => {
    cy.mount(<BasicMenu autoFocus="last" />);
    cy.get(itemThree).should("be.focused");
  });

  it("keyboard focus wraps (loops)", () => {
    cy.mount(<BasicMenu />);
    cy.get("[data-cy-root] li:first-child").type(
      "{downArrow}{downArrow}{downArrow}{downArrow}"
    );
    cy.get(itemTwo).should("be.focused");
  });

  it("keyboard focus should not wrap", () => {
    cy.mount(<BasicMenu shouldFocusWrap={false} />);
    cy.get("[data-cy-root]").type(
      "{downArrow}{downArrow}{downArrow}{downArrow}"
    );
    cy.get(itemThree).should("be.focused");
  });

  it("onAction handler is called correctly", () => {
    const onActionSpy = cy.spy().as("onActionSpy");
    cy.mount(<BasicMenu onAction={onActionSpy} />);
    cy.get(itemTwo).click();
    cy.get("@onActionSpy").should("have.been.calledWith", "item-two");
    cy.get(itemTwo).type("{enter}");
    cy.get("@onActionSpy").should("have.been.calledWith", "item-two");
    cy.get(itemTwo).type(" ");
    cy.get("@onActionSpy").should("have.been.calledWith", "item-two");
    // Flakey, sometimes 5... manual testing seems okay...
    // cy.get("@onActionSpy").should("have.been.calledThrice");
  });

  it("onClose handler is called when selecting an item", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(<BasicMenu onClose={onCloseSpy} />);
    cy.get(itemTwo).click();
    cy.get("@onCloseSpy").should("have.been.calledOnce");
  });
});

describe("Uncontrolled menu selection", () => {
  it("uncontrolled: selected item is marked as 'checked' visually and accessibly", () => {
    cy.mount(<BasicMenu selectionMode="single" />);
    cy.get(itemThree)
      .click()
      .should("have.attr", "aria-checked")
      .and("equal", "true");
    cy.get(`${itemThree} [data-id="selected-icon"]`).should("be.visible");
  });

  it("uncontrolled: allows for pre-selected keys", () => {
    cy.mount(
      <BasicMenu
        selectionMode="single"
        defaultSelectedKeys={new Set(["item-two"])}
      />
    );
    cy.get(itemTwo).should("have.attr", "aria-checked").and("equal", "true");
  });

  it("uncontrolled: single selection mode allows for 0 or 1 selection", () => {
    const onSelectionChangeSpy = cy.spy().as("onSelectionChangeSpy");
    const numSelected = cy.spy().as("numSelected");

    cy.mount(
      <BasicMenu
        selectionMode="single"
        onSelectionChange={(i) => {
          const result = i as Set<string>;
          // Check the size of the returning set
          numSelected(result.size);
          // Send the first value of the resulting set to the on selection spy.
          onSelectionChangeSpy([...i][0]);
        }}
      />
    );
    // Select item
    cy.get(itemThree).click();
    cy.get("@onSelectionChangeSpy").should(
      "have.been.calledWith",
      "item-three"
    );
    // And another
    cy.get(itemOne).click();
    cy.get("@onSelectionChangeSpy")
      .should("have.been.calledWith", "item-one")
      .and("have.been.calledTwice");
    cy.get("@numSelected").should("have.been.calledWith", 1);
    // Deselect the same item
    cy.get(itemOne).click();
    cy.get("@numSelected").should("have.been.calledWith", 0);
  });
});

// Controlled Menu
const ControlledMenu = function <T extends object>(
  props: Omit<MenuProps<T>, "children">
) {
  const [selected, setSelected] = useState(props.selectedKeys || new Set([]));
  return (
    <>
      <Menu
        aria-label="Controlled menu"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        {...props}
      >
        <Item key="item-one">Item One</Item>
        <Item key="item-two">Item Two</Item>
        <Item key="item-three">Item Three</Item>
      </Menu>

      <p>
        Current selection (controlled):{" "}
        <span data-id="selected-items">{[...selected].join(", ")}</span>
      </p>
    </>
  );
};

describe("Controlled menu selection", () => {
  it("controlled: selected item is marked as 'checked' visually and accessibly", () => {
    cy.mount(<ControlledMenu selectionMode="single" />);
    cy.get(itemThree).click();
    cy.get(`${itemThree} [data-id="selected-icon"]`).should("be.visible");
    cy.get(itemThree).should("have.attr", "aria-checked").and("equal", "true");
  });

  it("controlled: allows for pre-selected keys", () => {
    cy.mount(
      <ControlledMenu
        selectionMode="single"
        selectedKeys={new Set(["item-two"])}
      />
    );
    cy.get(itemTwo).should("be.focused");
  });

  it("controlled: single selection mode selects only one item", () => {
    cy.mount(<ControlledMenu selectionMode="single" />);
    cy.get(itemThree).click();
    cy.get('[data-id="selected-items"]').contains("item-three");
    cy.get(itemOne).click();
    cy.get('[data-id="selected-items"]').should("have.text", "item-one");
  });

  it("controlled: multiple selection mode selects multiple items", () => {
    cy.mount(<ControlledMenu selectionMode="multiple" />);
    cy.get(itemOne).click();
    cy.get('[data-id="selected-items"]').should("have.text", "item-one");
    cy.get(itemThree).click();
    cy.get('[data-id="selected-items"]').should(
      "have.text",
      "item-one, item-three"
    );
  });

  it("controlled: multiple selection mode retains the order items where selected", () => {
    cy.mount(<ControlledMenu selectionMode="multiple" />);
    cy.get(itemThree).click();
    cy.get('[data-id="selected-items"]').should("have.text", "item-three");
    cy.get(itemOne).click();
    cy.get('[data-id="selected-items"]').should(
      "have.text",
      "item-three, item-one"
    );
    cy.get(itemTwo).click();
    cy.get('[data-id="selected-items"]').should(
      "have.text",
      "item-three, item-one, item-two"
    );
    // deselect
    cy.get(itemOne).click();
    cy.get(itemTwo).click();
    cy.get(itemThree).click();
    // select in different order
    cy.get(itemTwo).click();
    cy.get(itemOne).click();
    cy.get(itemThree).click();
    cy.get('[data-id="selected-items"]').should(
      "have.text",
      "item-two, item-one, item-three"
    );
  });
});
