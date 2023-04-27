// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
// import "@testing-library/cypress/add-commands";
// Alternatively you can use CommonJS syntax:
// require('./commands')

import { Project as Default } from "../../src/styles/default";
import { Project as Shelley, Light, Dark } from "../../src/styles/shelley";

// Example use:
// cy.mount(<MyComponent />)

const ShelleyDark = `${Default} ${Shelley}`;
// const ShelleyLight = `${Default} ${Shelley} ${Light}`;
document.body.className = ShelleyDark;
