/// <reference types="cypress" />

describe('Test homepage', () => {
  it('load data on search submit', () => {
    cy.visit('/');
    cy.get('input[name="search"]').type(`nature{enter}`);
  });
});
