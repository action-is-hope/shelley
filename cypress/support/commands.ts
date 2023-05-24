/// <reference types="cypress" />
import "cypress-real-events";
import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", (component, options) => {
  return mount(component, options);
});
