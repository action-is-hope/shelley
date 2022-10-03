/**
 * Definitions for new cy methods
 * https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__add-custom-command
 */

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getDataCy('greeting')
     */
    getDataCy(value: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to select DOM that contains a specified selector data-cy attribute.
     */
    getDataCyLike(value: string): Chainable<JQuery<HTMLElement>>;
  }
}
