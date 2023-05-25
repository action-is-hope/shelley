import { createRef } from "react";
import { Button, ButtonGroup, ButtonGroupProps } from "../../src/indexLib";

const buttonGroup = '[data-id="buttonGroup"]';
const button = "[data-button]";

const ButtonGroupBasic = (args: ButtonGroupProps) => (
  <ButtonGroup data-id="buttonGroup" {...args} />
);

describe("ButtonGroup", () => {
  describe("Basics", () => {
    it("renders with children", () => {
      cy.mount(
        <ButtonGroupBasic>
          <Button data-button>One</Button>
          <Button data-button>Two</Button>
        </ButtonGroupBasic>
      );
      cy.get(button).should("exist").and("have.length", 2);
      cy.get(`${button}:first-child`).should("exist").and("have.text", "One");
      cy.get(`${button}:last-child`).should("exist").and("have.text", "Two");
    });

    it("renders with custom class name", () => {
      cy.mount(
        <ButtonGroupBasic className="custom-class">
          <Button data-button>One</Button>
          <Button data-button>Two</Button>
        </ButtonGroupBasic>
      );
      cy.get(buttonGroup)
        .should("have.attr", "class")
        .and("to.have.string", "custom-class");
    });

    it("renders with splitButton class name", () => {
      cy.mount(
        <ButtonGroupBasic splitButton>
          <Button data-button>One</Button>
          <Button data-button>Two</Button>
        </ButtonGroupBasic>
      );
      cy.get(buttonGroup)
        .should("have.attr", "class")
        .and("to.have.string", "splitButton");
    });

    it("orientation is horizontal by default", () => {
      cy.mount(
        <ButtonGroupBasic>
          <Button data-button>One</Button>
          <Button data-button>Two</Button>
        </ButtonGroupBasic>
      );
      cy.get(buttonGroup)
        .should("have.attr", "class")
        .and("to.have.string", "horizontal");
    });

    it("orientation supports 'vertical'", () => {
      cy.mount(
        <ButtonGroupBasic orientation="vertical">
          <Button data-button>One</Button>
          <Button data-button>Two</Button>
        </ButtonGroupBasic>
      );
      cy.get(buttonGroup)
        .should("have.attr", "class")
        .and("to.have.string", "vertical");
    });

    it("forwards refs", () => {
      const buttonGroupRef = createRef<HTMLDivElement>();
      const onPressSpy = cy.spy().as("onPressSpy");
      cy.mount(
        <>
          <Button
            data-id="cy-button-trigger"
            onPress={() =>
              onPressSpy(
                buttonGroupRef?.current?.attributes?.["data-id"]?.value
              )
            }
          >
            Click me
          </Button>
          <ButtonGroup data-id="testRef" ref={buttonGroupRef}>
            <Button data-button>One</Button>
            <Button data-button>Two</Button>
          </ButtonGroup>
        </>
      );
      cy.get(`[data-id="cy-button-trigger"]`).realClick();
      cy.get("@onPressSpy").should("have.been.calledWith", "testRef");
    });
  });
  describe("Children", () => {
    it("Can unset child button visual props", () => {
      cy.mount(
        <ButtonGroupBasic variant={false} vol={false} tone={false}>
          <Button data-button>One</Button>
          <Button data-button>Two</Button>
        </ButtonGroupBasic>
      );
      const buttonOneClass = cy.get(button).should("have.attr", "class");
      buttonOneClass.and("to.not.have.string", "variant");
      buttonOneClass.and("to.not.have.string", "vol");
      buttonOneClass.and("to.not.have.string", "tone");
    });
    it("Only spreads props to children that are Shelley Buttons", () => {
      cy.mount(
        <ButtonGroup>
          <span data-span>one</span>
          <span data-span>one</span>
        </ButtonGroup>
      );
      cy.get("[data-span]").should("not.have.attr", "class");
      cy.get("[data-span]").should("not.have.attr", "variant");
      cy.get("[data-span]").should("not.have.attr", "vol");
      cy.get("[data-span]").should("not.have.attr", "tone");
    });
    it("Can override specific button variants", () => {
      cy.mount(
        <ButtonGroupBasic variant="primary" tone={1}>
          <Button data-button>One</Button>
          <Button data-button-two variant="secondary" tone={3}>
            Two
          </Button>
          <Button data-button>Three</Button>
        </ButtonGroupBasic>
      );
      cy.get(button)
        .should("have.attr", "class")
        .and("to.have.string", "primary");
      cy.get("[data-button-two]")
        .should("have.attr", "class")
        .and("to.have.string", "secondary");
    });
    it("isDisabled disables the group and applies isDisabled class", () => {
      cy.mount(
        <ButtonGroupBasic isDisabled>
          <Button data-button>One</Button>
          <Button data-button>Two</Button>
        </ButtonGroupBasic>
      );
      cy.get(button)
        .should("be.disabled")
        .and("have.attr", "class")
        .and("to.have.string", "isDisabled");
      cy.get(buttonGroup)
        .should("have.attr", "class")
        .and("to.have.string", "isDisabled");
    });
    it("Can override isDisabled for specific buttons", () => {
      cy.mount(
        <ButtonGroupBasic isDisabled>
          <Button data-button>One</Button>
          <Button data-button-two isDisabled={false}>
            Two
          </Button>
          <Button data-button>Three</Button>
        </ButtonGroupBasic>
      );
      cy.get(button).should("be.disabled");
      cy.get("[data-button-two]").should("not.be.disabled");
    });
  });
});
