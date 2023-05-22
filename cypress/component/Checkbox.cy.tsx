import { Checkbox } from "../../src/indexLib";

const checkboxWithLabel = '[data-id="checkbox--label"]';
const inputEl = '[data-id="checkbox--input"]';

describe("Checkbox", () => {
  it("renders child as label, unchecked by default", () => {
    cy.mount(<Checkbox data-id="checkbox">Subscribe</Checkbox>);
    cy.get(checkboxWithLabel).contains("Subscribe");
    cy.get(inputEl).should("not.be.checked");
  });

  it("defaultSelected", () => {
    cy.mount(
      <Checkbox defaultSelected data-id="checkbox">
        Subscribe
      </Checkbox>
    );
    cy.get(inputEl).should("be.checked");
  });

  it("fires onChange when clicking label", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Checkbox onChange={onChangeSpy} data-id="checkbox">
        Subscribe
      </Checkbox>
    );
    cy.get(checkboxWithLabel).click();
    cy.get("@onChangeSpy").should("have.been.calledWith", true);
  });

  it("isDisabled", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Checkbox onChange={onChangeSpy} isDisabled data-id="checkbox">
        Subscribe
      </Checkbox>
    );
    cy.get(checkboxWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "isDisabled");
    cy.get(inputEl).should("be.disabled");
  });

  it("isReadOnly", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Checkbox onChange={onChangeSpy} isReadOnly data-id="checkbox">
        Subscribe
      </Checkbox>
    );
    cy.get(inputEl).click();
    cy.get("@onChangeSpy").should("have.not.been.called");
  });

  it("isIndeterminate has class and fires onChange", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(
      <Checkbox onChange={onChangeSpy} isIndeterminate data-id="checkbox">
        Subscribe
      </Checkbox>
    );
    cy.get(checkboxWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "isIndeterminate");
    cy.get(inputEl).click();
    cy.get("@onChangeSpy").should("have.been.calledWith", true);
  });

  it("focus class added", () => {
    cy.mount(<Checkbox data-id="checkbox">Subscribe</Checkbox>);
    cy.get(inputEl).focus();
    cy.get(checkboxWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "isFocusVisible");
  });

  it("renders with custom class name", () => {
    cy.mount(
      <Checkbox className="cypress-test" data-id="checkbox">
        Subscribe
      </Checkbox>
    );

    cy.get(checkboxWithLabel)
      .should("have.attr", "class")
      .and("to.have.string", "cypress-test");
  });
});
