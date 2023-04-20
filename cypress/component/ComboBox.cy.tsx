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
const loader = '[data-id="comboBox--progressCircle"]';

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

  it("loadingState: filtering - renders ProgressCircle", () => {
    cy.mount(<BasicComboBox loadingState="filtering" />);
    cy.get(loader).should("exist");
  });

  it("loadingState: loading - renders ProgressCircle", () => {
    cy.mount(<BasicComboBox loadingState="loading" />);
    cy.get(loader).should("exist");
  });

  it("loadingState: sorting - renders ProgressCircle", () => {
    cy.mount(<BasicComboBox loadingState="sorting" />);
    cy.get(loader).should("exist");
  });

  it("loadingState: loadingMore - does NOT render ProgressCircle", () => {
    cy.mount(<BasicComboBox loadingState="loadingMore" />);
    cy.get(loader).should("not.exist");
  });
});
