import React, { useState } from "react";
import { Tabs, Item, Button } from "../../src/indexLib";

const tabs = '[data-id="tabs"]';
const tabPanel = '[data-id="tabs-tab-panel"]';
const tabList = '[data-id="tabs-tab-list"]';
const tabItem = '[data-id="tabs-tab-item"]';

export const TabsExample = (args) => {
  return (
    <Tabs aria-label="Dynamic tabs" data-id="tabs" {...args}>
      <Item key="tab1" title="Tab title 1">
        Tab description 1
      </Item>
      <Item key="tab2" title="Tab title 2">
        Tab description 2
      </Item>
      <Item key="tab3" title="Tab title 3">
        Tab description 3
      </Item>
    </Tabs>
  );
};

// Basic test to see if tabs render correctly

describe("Basic Tabs", () => {
  it("renders working tabs, tabPanel, tabList and tabItem.", () => {
    cy.mount(<TabsExample />);
    cy.get(tabs).should("exist");
    cy.get(tabPanel).should("exist");
    cy.get(tabList).should("exist");
    cy.get(tabItem).should("exist");
  });

  // Role check

  it("renders correct role attributes", () => {
    cy.mount(<TabsExample />);
    cy.get(tabItem).should("have.attr", "role").and("to.have.string", "tab");
    cy.get(tabList)
      .should("have.attr", "role")
      .and("to.have.string", "tablist");
    cy.get(tabPanel)
      .should("have.attr", "role")
      .and("to.have.string", "tabpanel");
  });

  // Disabled tabs

  it("renders disabled tabs", () => {
    cy.mount(<TabsExample isDisabled />);
    cy.get(tabItem)
      .should("have.attr", "aria-disabled")
      .and("to.have.string", "true");
    cy.get(tabItem)
      .should("have.attr", "class")
      .and("to.have.string", "isDisabled");
  });

  it("renders disabled item", () => {
    const disabledItem = '[data-key="tab2"]';
    cy.mount(<TabsExample disabledKeys={["tab2"]} />);
    cy.get(disabledItem)
      .should("have.attr", "aria-disabled")
      .and("to.have.string", "true");
    cy.get(disabledItem)
      .should("have.attr", "aria-selected")
      .and("to.have.string", "false");
    cy.get(disabledItem)
      .should("have.attr", "class")
      .and("to.have.string", "isDisabled");
  });

  // Selected tab

  it("selected tab renders aria-selected, isSelected class and tabindex 0", () => {
    cy.mount(<TabsExample />);
    cy.get(tabItem).realClick();
    cy.get(tabItem)
      .should("have.attr", "aria-selected")
      .and("to.have.string", "true");
    cy.get(tabItem)
      .should("have.attr", "class")
      .and("to.have.string", "isSelected");
    cy.get(tabItem).should("have.attr", "tabindex").and("to.have.string", "0");
    cy.get(`${tabItem}:nth-child(2)`)
      .should("have.attr", "tabindex")
      .and("to.have.string", "-1");
  });

  // it("selected tab renders isPressed class while pressed", () => {
  //   cy.mount(<TabsExample />);
  //   cy.get(tabItem)
  //     .eq(1)
  //     // .click({ force: true, release: false })
  //     .trigger("mousedown");
  //   cy.wait(5000);
  //   cy.get(tabItem)
  //     .eq(1)
  //     .should("have.attr", "class")
  //     .and("to.have.string", "isPressed")
  //     .trigger("mouseup");
  // });

  // Selected tab title and description match

  it("tab description should render correctly", () => {
    cy.mount(<TabsExample />);
    // Tab 1
    cy.get(tabItem).eq(0).click();
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 1");
    // Tab 2
    cy.get(tabItem).eq(1).click();
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 2");
    // Tab 3
    cy.get(tabItem).eq(2).click();
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 3");
  });

  // Orientation horizontal by default

  it("orientation is horizontal by default", () => {
    cy.mount(<TabsExample />);
    cy.get(tabs)
      .should("have.attr", "class")
      .and("to.have.string", "horizontal");
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
    cy.get(tabs)
      .should("have.attr", "class")
      .and("to.have.string", "horizontal");
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
    cy.get(tabList)
      .should("have.attr", "class")
      .and("to.have.string", "tabList");
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

  // Keyboard and focus check

  it("user can navigate with arrow keys", () => {
    cy.mount(<TabsExample />);

    cy.get(tabItem).eq(0).focus().type("{rightarrow}");
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 2");

    cy.get(tabItem).eq(1).focus().type("{rightarrow}");
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 3");

    cy.get(tabItem).eq(2).focus().type("{leftarrow}");
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 2");

    cy.get(tabItem).eq(1).focus().type("{leftarrow}");
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 1");
  });

  // Keyboard activation, enter key press required for tabPanel to work

  it("user can navigate with arrow keys and tab selection only on enter", () => {
    cy.mount(<TabsExample keyboardActivation="manual" />);

    cy.get(tabItem).eq(0).focus().type("{rightarrow}{enter}");
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 2");

    cy.get(tabItem).eq(0).focus().type("{rightarrow}{rightarrow}{enter}");
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 3");

    cy.get(tabItem).eq(2).focus().type("{leftarrow}{leftarrow}{enter}");
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 1");
  });
});

// Adding tabs dynamically

export const DynamicTabs = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Tab title 1", content: "Tab description 1" },
    { id: 2, title: "Tab title 2", content: "Tab description 2" },
  ]);

  const addTab = () => {
    setTabs((tabs) => [
      ...tabs,
      {
        id: tabs.length + 1,
        title: `Tab title ${tabs.length + 1}`,
        content: `Tab description ${tabs.length + 1}`,
      },
    ]);
  };
  const removeTab = () => {
    if (tabs.length > 1) {
      setTabs((tabs) => tabs.slice(0, -1));
    }
  };
  return (
    <div>
      <Button data-id="cy-add-tab" onPress={addTab}>
        Add tab
      </Button>
      <Button data-id="cy-remove-tab" onPress={removeTab}>
        Remove tab
      </Button>
      <Tabs aria-label="Dynamic tabs" data-id="tabs" items={tabs}>
        {(item) => <Item title={item.title}>{item.content}</Item>}
      </Tabs>
    </div>
  );
};

// Add remove tab buttons
const addTabButton = `[data-id="cy-add-tab"]`;
const removeTabButton = `[data-id="cy-remove-tab"]`;

describe("Dynamically Added Tabs", () => {
  it("tabs can be added dynamically", () => {
    // Mount the Dynamic Tabs this time
    cy.mount(<DynamicTabs />);
    // Check the first two tabs exist
    cy.get(tabItem).eq(0).click();
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 1");
    cy.get(tabItem).eq(1).click();
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 2");
    // Add new tabs
    cy.get(addTabButton).click();
    // Select dynamically added tab
    cy.get(tabItem).eq(2).click();
    // Tab description 3 added dynamically
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 3");
    // Add one more tab
    cy.get(addTabButton).click();
    cy.get(tabItem).eq(3).click();
    // Tab description 4 added dynamically
    cy.get(tabPanel).should("be.visible").and("have.text", "Tab description 4");
    // Remove tabs
    cy.get(removeTabButton).realClick();
    cy.get(tabItem).eq(3).should("not.exist");
    cy.get(removeTabButton).realClick();
    cy.get(tabItem).eq(2).should("not.exist");
  });
});
