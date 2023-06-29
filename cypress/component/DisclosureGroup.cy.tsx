// Cypress component tests for DisclosureGroup:

import { DisclosureGroup } from "../../src/indexLib";

const items = [
  {
    id: `1-storybook-showHide`,
    title: "Disclosure title 1",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<p>Disclosure content 1</p>`,
        }}
      />
    ),
  },
  {
    id: `2-storybook-showHide`,
    title: "Disclosure title 2",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<p>Disclosure content 2</p>`,
        }}
      />
    ),
  },
  {
    id: `3-storybook-showHide`,
    title: "Disclosure title 3",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<p>Disclosure content 3</p>`,
        }}
      />
    ),
  },
  {
    id: `4-storybook-showHide`,
    title: "Disclosure title 4",
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: `<p>Disclosure content 4</p>`,
        }}
      />
    ),
  },
];

const disclosureGroup = '[data-id="disclosure-group"]';
const accordion = '[data-id="disclosure-group--accordion"]';
const accordionItem = '[data-id="disclosure-group--accordionItem"]';
const disclosure = '[data-id="disclosure-group--disclosure"]';
const trigger = '[data-id="disclosure-group--trigger"]';
const hiddenContent = '[data-id="disclosure-group--hidden-content"]';
const content = '[data-id="disclosure-group--content"]';

const DynamicDisclosureGroup = function () {
  return (
    <div>
      <DisclosureGroup
        title="Disclosure Group"
        data-id="disclosure-group"
        items={items}
      />
    </div>
  );
};

describe("DisclosureGroup", () => {
  // Should render all DisclosureGroup elements

  it("should render all DisclosureGroup elements", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(disclosureGroup).should("exist");
    cy.get(accordion).should("exist");
    cy.get(accordionItem).should("exist");
    cy.get(disclosure).should("exist");
    cy.get(trigger).should("exist");
    cy.get(hiddenContent).should("exist");
    cy.get(content).should("exist");
  });

  // Should render DisclosureGroup title

  it("should render DisclosureGroup title", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(disclosureGroup).should("have.attr", "title", "Disclosure Group");
  });

  // Should render DisclosureGroup items

  it("should render DisclosureGroup items", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(accordionItem).should("have.length", 4);
  });

  // Should render correct item titles

  it("should render DisclosureGroup item titles", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(trigger).eq(0).should("have.text", "Disclosure title 1");
    cy.get(trigger).eq(1).should("have.text", "Disclosure title 2");
    cy.get(trigger).eq(2).should("have.text", "Disclosure title 3");
    cy.get(trigger).eq(3).should("have.text", "Disclosure title 4");
  });

  // Should render correct item content

  it("should render DisclosureGroup item content", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(content).eq(0).should("have.text", "Disclosure content 1");
    cy.get(content).eq(1).should("have.text", "Disclosure content 2");
    cy.get(content).eq(2).should("have.text", "Disclosure content 3");
    cy.get(content).eq(3).should("have.text", "Disclosure content 4");
  });

  // Should render correct item content when clicked

  it("should render DisclosureGroup item content when clicked", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(trigger).eq(0).click();
    cy.get(content)
      .eq(0)
      .should("be.visible")
      .and("have.text", "Disclosure content 1");
    cy.get(trigger).eq(1).click();
    cy.get(content)
      .eq(1)
      .should("be.visible")
      .and("have.text", "Disclosure content 2");
    cy.get(trigger).eq(2).click();
    cy.get(content)
      .eq(2)
      .should("be.visible")
      .and("have.text", "Disclosure content 3");
    cy.get(trigger).eq(3).click();
    cy.get(content)
      .eq(3)
      .should("be.visible")
      .and("have.text", "Disclosure content 4");
  });

  // Should render correct classnames

  it("should render correct classnames", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(disclosureGroup)
      .should("have.attr", "class")
      .and("to.have.string", "root");
    cy.get(accordion)
      .should("have.attr", "class")
      .and("to.have.string", "accordion");
    cy.get(accordionItem)
      .should("have.attr", "class")
      .and("to.have.string", "accordionItem");
    cy.get(disclosure)
      .should("have.attr", "class")
      .and("to.have.string", "root");
    cy.get(trigger)
      .should("have.attr", "class")
      .and("to.have.string", "trigger");
    cy.get(hiddenContent)
      .should("have.attr", "class")
      .and("to.have.string", "hiddenContent");
    cy.get(content)
      .should("have.attr", "class")
      .and("to.have.string", "content");
  });

  // Should render correct classnames when clicked

  it("should render correct classnames when clicked", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(trigger)
      .eq(0)
      .click()
      .parent()
      .should("have.attr", "class")
      .and("to.have.string", "isExpanded");
  });

  // Should render correct aria attributes

  it("should render correct aria attributes", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(trigger).eq(0).should("have.attr", "aria-expanded", "false");
    cy.get(trigger).eq(0).click().should("have.attr", "aria-expanded", "true");
    cy.get(trigger).eq(0).click().should("have.attr", "aria-expanded", "false");

    cy.get(trigger)
      .eq(0)
      .click()
      .invoke("attr", "aria-controls")
      .then((id) => {
        cy.get(accordionItem)
          .eq(0)
          .find(hiddenContent)
          .should("have.attr", "id", id);
      });
  });
});
