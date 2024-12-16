import '@cypress/react';
import '@testing-library/cypress';
import { mount } from '@cypress/react18';
import '../../src/index.css';

Cypress.Commands.add('mount', (component, options) => {
  return mount(component, options);
});

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
