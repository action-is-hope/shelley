import React, { useState } from "react";
import { Tabs, Item } from "../../src/indexLib";

const tabs = '[data-id="tabs"]';
const tabPanel = '[data-id="tabs-tab-panel"]';
const tabItem = '[data-id="tabs-tab-item"]';

const tabData = [
  { id: 1, title: "Tab 1", content: "Tab body 1" },
  { id: 2, title: "Tab 2", content: "Tab body 2" },
  { id: 3, title: "Tab 3", content: "Tab body 3" },
];

export const TabsExample = () => {
  return (
    <Tabs aria-label="Dynamic tabs" items={tabData} data-id="tabs">
      {(item) => <Item title={item.title}>{item.content}</Item>}
    </Tabs>
  );
};

// Test

describe("Basic Tabs", () => {
  it("renders working tabs, tabPanel and tabItem.", () => {
    cy.mount(<TabsExample />);
    cy.get(tabs).should("exist");
    cy.get(tabPanel).should("exist");
    cy.get(tabItem).should("exist");
  });
});
