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

    cy.get('input[name="search"]').clear().type(`{enter}`);
    cy.wait('@search');
    cy.get('.card').should('have.length', 10);
  });

  it('should correctly handle incorrect responses', () => {
    cy.intercept('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search*', {
      statusCode: 200,
      body: { ...mockSearchData, stat: 'fail', message: 'test-error-message' },
    }).as('search');

    cy.get('input[name="search"]').type(`test{enter}`);
    cy.wait('@search');
    cy.contains('test-error-message').should('exist');

    cy.intercept('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search*', {
      statusCode: 500,
      ok: false,
      body: mockSearchData,
    }).as('search');

    cy.get('input[name="search"]').type(`test{enter}`);
    cy.wait('@search');
    cy.contains('Loading error occured (code: 500)').should('exist');
  });

  it('should load data and show modal on card click', () => {
    cy.get('.card').first().click();
    cy.wait('@getImageInfo');
    cy.get('.modal').should('have.class', 'open');
    cy.get('.info-modal').should('exist');
  });

  it('should properly handle modal', () => {
    cy.get('.card').first().click();
    cy.wait('@getImageInfo');

    cy.get('.modal__window').click();
    cy.get('.modal').should('have.class', 'open');
    cy.get('.info-modal__close-btn').click();
    cy.get('.modal').should('have.class', 'close');
    cy.wait(400);

    cy.get('.card').last().click();
    cy.wait('@getImageInfo');
    cy.get('body').click(0, 0);
    cy.get('.modal').should('have.class', 'close');
  });
});
