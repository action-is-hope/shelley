import { mount } from "cypress/react";
import "cypress-real-events";
// declare namespace Cypress {
//   interface Chainable<Subject> {
//     mount: (component: JSX.Element, alias?: string) => Chainable<void>;
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
