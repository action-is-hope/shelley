import React from "react";
import { Checkbox } from "../../src/indexLib";

const checkboxTest = '[data-id="checkbox"]';
const inputTest = '[data-id="checkbox--input"]';

describe("Basic Checkbox", () => {
  it("renders with children, child renders correctly.", () => {
    cy.mount(<Checkbox includeDataIds>Subscribe</Checkbox>);
    cy.get(checkboxTest).contains("Subscribe").should("not.be.checked");
  });
});
