/// <reference types="cypress" />

describe('Test app functionality', () => {
  it('navigation works', () => {
    cy.visit('/');

    cy.get('a[href="/about"]').click();
    cy.url().should('include', '/about');

    cy.get('a[href="/forms"]').click();
    cy.url().should('include', '/forms');

    cy.visit('/bad-url');
    cy.get('h1').should('contain', '404');
  });
});
