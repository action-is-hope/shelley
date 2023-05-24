import { Blockquote, BlockquoteProps } from "../../src/indexLib";

// Blockquote component selectors.
const blockquote = '[data-id="blockquote"]';
const descriptionText = "This is the description";
const childrenText = "This is the quote text";
// Basic usage.
const BlockquoteBasic = (args: BlockquoteProps) => (
  <Blockquote data-id="blockquote" desc={descriptionText} {...args} />
);

describe("Blockquote Component", () => {
  // Check that the component renders.

  it("renders the Blockquote component correctly", () => {
    cy.mount(<BlockquoteBasic children={childrenText} />);
    cy.get("blockquote").should("exist");
    cy.get(blockquote).should("exist");
    cy.get(blockquote).should("have.attr", "data-id", "blockquote");
  });

  // Check that the component renders with the correct classes.

  it("renders the classes correctly", () => {
    cy.mount(<BlockquoteBasic children={childrenText} />);
    cy.get(blockquote)
      .find("div")
      .should("have.attr", "class")
      .and("to.have.string", "content");
    cy.get(blockquote)
      .find("footer")
      .should("have.attr", "class")
      .and("to.have.string", "desc");
    cy.get(blockquote)
      .should("have.attr", "class")
      .and("not.to.have.string", "informal");
    cy.get(blockquote)
      .should("have.attr", "class")
      .and("not.to.have.string", "academic");
  });

  // Check that the component renders with the correct children text.

  it("renders the children correctly", () => {
    cy.mount(<BlockquoteBasic children={childrenText} />);
    cy.get(blockquote)
      .contains(childrenText)
      .should("have.attr", "class")
      .and("to.have.string", "content");
  });

  // Check that the component renders with the correct description text.

  it("renders the description correctly", () => {
    cy.mount(<BlockquoteBasic children={childrenText} />);
    cy.get(blockquote).find("footer").and("have.text", descriptionText);
  });

  // Renders the component with the correct variant.

  it("applies variant classes correctly", () => {
    const variants = ["informal", "academic"] as const;

    variants.map((variant) => {
      cy.mount(<BlockquoteBasic children={childrenText} variant={variant} />);

      cy.get(blockquote)
        .should("have.attr", "class")
        .and("to.have.string", variant);
    });
  });

  // Renders the component with correct description volume class.

  it("applies the 'descVolume' class correctly", () => {
    cy.mount(<BlockquoteBasic children={childrenText} descVol={5} />);
    cy.get(blockquote)
      .find("footer")
      .should("have.attr", "class")
      .and("to.have.string", "vol-1-5");
  });
});
