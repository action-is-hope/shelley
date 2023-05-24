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

  // Check that the component renders with the correct description.

  it("renders the children correctly", () => {
    cy.mount(<BlockquoteBasic children={childrenText} />);
    cy.get(blockquote).contains(childrenText);
  });

  // Check that the component renders with the correct description.

  it("renders the description correctly", () => {
    cy.mount(<BlockquoteBasic children={childrenText} />);
    cy.get(blockquote).contains(descriptionText);
  });

  // Renders the component with the correct variant.

  it("applies the 'variant informal' class correctly", () => {
    cy.mount(<BlockquoteBasic children={childrenText} variant="informal" />);
    cy.get(blockquote)
      .should("have.attr", "class")
      .and("to.have.string", "informal");
  });

  it("applies the 'variant academic' class correctly", () => {
    cy.mount(<BlockquoteBasic children={childrenText} variant="academic" />);
    cy.get(blockquote)
      .should("have.attr", "class")
      .and("to.have.string", "academic");
  });
});
