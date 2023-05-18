import React, { useState } from "react";
import { Tabs, Item } from "../../src/indexLib";

const tabs = '[data-id="tabs"]';
const tabPanel = '[data-id="tabs-tab-panel"]';
const tabList = '[data-id="tabs-tab-list"]';
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
  cy.get(tabItem)
    .should("have.attr", "class")
    .and("to.have.string", "isDisabled");
});

// Selected tab

it("selected tab renders aria-selected and isSelected class", () => {
  cy.mount(<TabsExample />);
  cy.get(tabItem).realClick();
  cy.get(tabItem).should("have.attr", "aria-selected");
  cy.get(tabItem)
    .should("have.attr", "class")
    .and("to.have.string", "isSelected");
});

// it("selected tab renders isPressed class while pressed", () => {
//   cy.mount(<TabsExample />);
//   cy.get(`${tabItem}:first-child`).click({ release: false });
//   cy.get(`${tabItem}:first-child`)
//     .should("have.attr", "class")
//     .and("to.have.string", "isPressed");
// });

// Selected tab title and description match

it("tab description should render correctly", () => {
  cy.mount(<TabsExample />);
  cy.get(`${tabItem}:first-child`).realClick();
  cy.get(tabPanel).should("exist").and("have.text", "Tab description 1");
  cy.get(`${tabItem}:last-child`).realClick();
  cy.get(tabPanel).should("exist").and("have.text", "Tab description 3");
});

// Orientation horizontal by default

it("orientation is horizontal by default", () => {
  cy.mount(<TabsExample />);
  cy.get(tabs).should("have.attr", "class").and("to.have.string", "horizontal");
  cy.get(tabList)
    .should("have.attr", "aria-orientation")
    .and("to.have.string", "horizontal");
});

// Orientation check

it("renders orientation correctly", () => {
  cy.mount(<TabsExample orientation="vertical" />);
  cy.get(tabs).should("have.attr", "class").and("to.have.string", "vertical");
  cy.get(tabList)
    .should("have.attr", "aria-orientation")
    .and("to.have.string", "vertical");
  cy.mount(<TabsExample orientation="horizontal" />);
  cy.get(tabs).should("have.attr", "class").and("to.have.string", "horizontal");
  cy.get(tabList)
    .should("have.attr", "aria-orientation")
    .and("to.have.string", "horizontal");
});

// Class name checks

it("renders with correct class names", () => {
  cy.mount(<TabsExample />);
  cy.get(tabs).should("have.attr", "class").and("to.have.string", "tabs");
  cy.get(tabPanel)
    .should("have.attr", "class")
    .and("to.have.string", "tabPanel");
  cy.get(tabList).should("have.attr", "class").and("to.have.string", "tabList");
  cy.get(tabItem).should("have.attr", "class").and("to.have.string", "tab");
});

// Volume check

it("renders volume 1 class by default", () => {
  cy.mount(<TabsExample />);
  cy.get(tabs).should("have.attr", "class").and("to.have.string", "vol-1-1");
});

it("renders correct volume class", () => {
  cy.mount(<TabsExample vol={2} />);
  cy.get(tabs).should("have.attr", "class").and("to.have.string", "vol-1-2");
  cy.mount(<TabsExample vol={3} />);
  cy.get(tabs).should("have.attr", "class").and("to.have.string", "vol-1-3");
});
