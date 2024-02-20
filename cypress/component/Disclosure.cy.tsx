// Cypress component tests for DisclosureGroup:
import { Disclosure, DisclosureProps } from "../../src/indexLib";

const disclosure = '[data-id="disclosure"]';
const trigger = '[data-id="disclosure--trigger"]';
const transition = '[data-id="disclosure--transition"]';
const content = '[data-id="disclosure--content"]';

const BasicDisclosure = function (props: Partial<DisclosureProps>) {
  return (
    <Disclosure
      title="Single Disclosure"
      data-id="disclosure"
      id="test-id"
      {...props}
    >
      <p>Some content inside of the Disclosure.</p>
    </Disclosure>
  );
};

describe("Disclosure", () => {
  it("should render all Disclosure elements", () => {
    cy.mount(<BasicDisclosure />);
    cy.get(disclosure).should("exist");
    cy.get(trigger).should("exist");
    cy.get(transition).should("exist");
    cy.get(content).should("exist");
  });

  it("should render correct classnames", () => {
    cy.mount(<BasicDisclosure />);
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

  it("open and close with keyboard and mouse, height is set", () => {
    cy.mount(<BasicDisclosure />);
    cy.get(content).should("not.be.visible");
    cy.get(trigger).focus();
    cy.realPress("Space");
    cy.wait(200);
    cy.get(content).should("be.visible");
    cy.realPress("Enter");
    cy.wait(200);
    cy.get(content).should("not.be.visible");
    cy.get(trigger).click();
    cy.wait(200);
    cy.get(content).should("be.visible");
    cy.get(disclosure)
      .eq(0)
      .should("have.attr", "class")
      .and("to.have.string", "isExpanded");
    cy.get(transition).should("have.css", "height");
  });

  it("height is set correctly", () => {
    cy.mount(<BasicDisclosure />);
    cy.get(trigger).click();
    cy.wait(200);
    cy.get(content).should("be.visible");
    cy.get(transition)
      .invoke("attr", "style")
      .then((styles) => {
        const height = styles ? styles.split(":") : false;
        expect(height).to.not.be.false;
        height && expect(height[0] === "height").to.be.true;
        /* height can be a few px out this is purposely fuzzy, we most care that it is not 0 or "auto". */
        height && expect(parseInt(height[1] as string)).to.be.greaterThan(41);
        height && expect(parseInt(height[1] as string)).to.be.lessThan(44);
      });
  });

  it("should render correct aria attributes", () => {
    cy.mount(<BasicDisclosure />);
    cy.get(trigger).should("have.attr", "aria-expanded", "false");
    cy.get(transition).should("have.attr", "aria-hidden", "true");
    cy.get(trigger)
      .click()
      .invoke("attr", "aria-controls")
      .then((id) => {
        cy.get(transition)
          .should("have.attr", "id", id)
          .and("have.attr", "aria-hidden", "false")
          .and("have.attr", "aria-labelledby", "test-id-trigger")
          .and("have.attr", "role", "region");
      });
    cy.get(trigger).should("have.attr", "aria-expanded", "true");
  });

  it("allows role='region' to be removed for cases where there are a large number of disclosures", () => {
    cy.mount(<BasicDisclosure disableRegion />);
    cy.get(transition).should("not.have.attr", "role", "region");
  });

  it("Icons render alt text", () => {
    cy.mount(<BasicDisclosure />);
    cy.get(trigger).should("have.text", "Single Disclosure expand");
    cy.get(trigger).click().should("have.text", "Single Disclosure collapse");
  });

  it("alt text can be overriden", () => {
    cy.mount(<BasicDisclosure expandString="grow" collapseString="shrink" />);
    cy.get(trigger).should("have.text", "Single Disclosure grow");
    cy.get(trigger).click().should("have.text", "Single Disclosure shrink");
  });

  it("tigger props are applied to trigger button", () => {
    cy.mount(
      <BasicDisclosure
        triggerProps={{
          vol: 3,
          tone: "lead",
          variant: "primary",
          iconPos: "start",
        }}
      />
    );
    cy.get(trigger)
      .should("have.attr", "class")
      .and("to.have.string", "iconPos")
      .and("to.have.string", "start")
      .and("to.have.string", "vol")
      .and("to.have.string", "tone")
      .and("to.have.string", "variant")
      .and("to.have.string", "lead");
  });
});
