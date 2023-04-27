/// <reference types="cypress" />
import mockSearchData from '../../src/api/images/data/dummy-image-search.json';
import mockImageInfoData from '../../src/api/images/data/dummy-image-info.json';

describe('Test homepage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo*', {
      statusCode: 200,
      body: mockImageInfoData,
    }).as('getImageInfo');

    cy.intercept('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search*', {
      statusCode: 200,
      body: mockSearchData,
    }).as('search');
  });

  it('should load data on search submit', () => {
    cy.get('input[name="search"]').type(`test{enter}`);
    cy.wait('@search');
    cy.get('.card').should('have.length', 10);
  });

  it('should load data and show modal on card click', () => {
    cy.get('.card').first().click();
    cy.wait('@getImageInfo');
    cy.get('.modal').should('have.class', 'open');
    cy.get('.info-modal').should('exist');
  });

  it('should properly handle modal buttons', () => {
    cy.get('.card').first().click();
    cy.wait('@getImageInfo');

    cy.get('.modal__window').click();
    cy.get('.modal').should('have.class', 'open');
    cy.get('.info-modal__close-btn').click();
    cy.get('.modal').should('have.class', 'close');
  });
});
