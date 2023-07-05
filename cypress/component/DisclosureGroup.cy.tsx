// Cypress component tests for DisclosureGroup:

import { DisclosureGroup } from "../../src/indexLib";

const disclosureGroup = '[data-id="disclosure-group"]';
const disclosure = '[data-id="disclosure-group--disclosure"]';
const trigger = '[data-id="disclosure-group--disclosure--trigger"]';
const transition = '[data-id="disclosure-group--disclosure--transition"]';
const content = '[data-id="disclosure-group--disclosure--content"]';

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

const DynamicDisclosureGroup = () => (
  <DisclosureGroup
    title="Disclosure Group"
    data-id="disclosure-group"
    items={items}
  />
);

const DynamicSingleView = () => (
  <DisclosureGroup
    title="Disclosure Group"
    data-id="disclosure-group"
    singleView
    items={items}
  />
);

describe("DisclosureGroup", () => {
  it("should render all DisclosureGroup elements", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(disclosureGroup).should("exist");
    cy.get(disclosure).should("exist");
    cy.get(trigger).should("exist");
    cy.get(transition).should("exist");
    cy.get(content).should("exist");
  });

  it("should render title", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(disclosureGroup).should("have.attr", "title", "Disclosure Group");
  });

  it("should render items", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(disclosure).should("have.length", 4);
  });

  it("should render item titles", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(trigger).eq(0).should("have.text", "Disclosure title 1 expand");
    cy.get(trigger).eq(1).should("have.text", "Disclosure title 2 expand");
    cy.get(trigger).eq(2).should("have.text", "Disclosure title 3 expand");
    cy.get(trigger).eq(3).should("have.text", "Disclosure title 4 expand");
  });

  it("should render item content", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(content).eq(0).should("have.text", "Disclosure content 1");
    cy.get(content).eq(1).should("have.text", "Disclosure content 2");
    cy.get(content).eq(2).should("have.text", "Disclosure content 3");
    cy.get(content).eq(3).should("have.text", "Disclosure content 4");
  });

  it("should render item content when clicked as a multi-view (items stay open)", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(trigger).eq(0).click();
    cy.wait(200);
    cy.get(content)
      .eq(0)
      .should("be.visible")
      .and("have.text", "Disclosure content 1");
    cy.get(trigger).eq(1).click();
    cy.wait(200);
    cy.get(content)
      .eq(1)
      .should("be.visible")
      .and("have.text", "Disclosure content 2");
    cy.get(trigger).eq(2).click();
    cy.wait(200);
    cy.get(content)
      .eq(2)
      .should("be.visible")
      .and("have.text", "Disclosure content 3");

    cy.get(content).eq(0).should("be.visible");
    cy.get(content).eq(1).should("be.visible");
    cy.get(content).eq(2).should("be.visible");
  });

  it("singleView - only one should open at a time ", () => {
    cy.mount(<DynamicSingleView />);
    cy.get(trigger).eq(0).click();
    cy.wait(200);
    cy.get(content).eq(0).should("be.visible");
    cy.get(trigger).eq(1).click();
    cy.wait(200);
    cy.get(content).eq(1).should("be.visible");
    cy.get(trigger).eq(2).click();
    cy.wait(200);
    cy.get(content).eq(2).should("be.visible");

    cy.get(content).eq(0).should("not.be.visible");
    cy.get(content).eq(1).should("not.be.visible");
    cy.get(content).eq(2).should("be.visible");

    cy.get(trigger).eq(0).click();
    cy.wait(200);
    cy.get(content).eq(2).should("not.be.visible");
    cy.get(content).eq(0).should("be.visible");
  });

  it("should render correct classnames", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(disclosureGroup)
      .should("have.attr", "class")
      .and("to.have.string", "root");
    cy.get(disclosure)
      .should("have.attr", "class")
      .and("to.have.string", "root");
    cy.get(trigger)
      .should("have.attr", "class")
      .and("to.have.string", "trigger");
    cy.get(transition)
      .should("have.attr", "class")
      .and("to.have.string", "transition");
    cy.get(content)
      .should("have.attr", "class")
      .and("to.have.string", "content");
  });

  it("should render correct classnames when clicked", () => {
    cy.mount(<DynamicDisclosureGroup />);
    cy.get(trigger)
      .eq(0)
      .click()
      .then(() => {
        cy.get(disclosure)
          .eq(0)
          .should("have.attr", "class")
          .and("to.have.string", "isExpanded");
      });
  });

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
        cy.get(disclosure).eq(0).find(transition).should("have.attr", "id", id);
      });
  });
});
