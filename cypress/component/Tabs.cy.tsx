import React, { useState } from "react";
import { Tabs, Item, TabsProps } from "../../src/indexLib";

const tabs = '[data-id="tabs"]';
const tabPanel = '[data-id="tabs-tab-panel"]';
const tabItem = '[data-id="tabs-tab-item"]';

export const TabsExample = (args) => {
  return (
    <Tabs aria-label="Dynamic tabs" data-id="tabs" {...args}>
      <Item title="Tab title 1">Tab description 1</Item>
      <Item title="Tab title 2">Tab description 2</Item>
      <Item title="Tab title 3">Tab description 3</Item>
    </Tabs>
  );
};

// Basic test to see if tabs render correctly

describe("Basic Tabs", () => {
  it("renders working tabs, tabPanel and tabItem.", () => {
    cy.mount(<TabsExample />);
    cy.get(tabs).should("exist");
    cy.get(tabPanel).should("exist");
    cy.get(tabItem).should("exist");
  });
});

// Disabled tabs

it("tabs are disabled", () => {
  cy.mount(<TabsExample isDisabled />);
  cy.get(tabItem).should("have.attr", "aria-disabled");
});

// Click check

it("tab can be selected", () => {
  cy.mount(<TabsExample />);
  cy.get(tabItem).realClick();
  cy.get(tabItem).should("have.attr", "aria-selected");
});

// Tab selection and tab description match

it("tab description should render correctly", () => {
  cy.mount(<TabsExample />);
  cy.get(`${tabItem}:first-child`).realClick();
  cy.get(tabPanel).should("exist").and("have.text", "Tab description 1");
  cy.get(`${tabItem}:last-child`).realClick();
  cy.get(tabPanel).should("exist").and("have.text", "Tab description 3");
});

// Orientation
// it("", () => {

// })
