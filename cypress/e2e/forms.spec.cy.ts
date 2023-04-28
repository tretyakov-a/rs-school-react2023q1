/// <reference types="cypress" />

describe('Test forms pages', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  const fillForm = () => {
    cy.contains('Fill with test values').click();
    cy.get('label[for="javascript-checkbox-input"]').click();
    cy.get('label[for="male-radio-input"]').click();
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg', { force: true });
  };

  const submit = () => {
    cy.contains('Submit').click();
  };

  it('should create form card on form submit', () => {
    fillForm();
    submit();
    cy.contains('Cancel').click();
    cy.get('.registration-list__item').should('have.length', 1);
    submit();
    cy.contains('Cancel').click();
    cy.get('.registration-list__item').should('have.length', 2);
  });

  it('should show modal on form submit and handle modal buttons properly', () => {
    const testName = 'Testname';
    fillForm();
    cy.get('input[name="name"]').clear().type(testName);
    submit();
    cy.get('.modal').should('have.class', 'open');
    cy.get('.confirm-modal').should('exist');

    cy.contains('Cancel').click();
    cy.get('input[name="name"]').should('have.value', testName);

    submit();
    cy.contains('OK').click();
    cy.get('input[name="name"]').should('have.value', '');
  });

  it('should hightlight form field on incorrect input', () => {
    fillForm();
    let nameInput = cy.get('input[name="name"]');
    nameInput.clear();
    submit();
    nameInput.parent().should('have.class', 'invalid');
  });

  it('should show validation messages on incorrect name input', () => {
    fillForm();
    const nameInput = cy.get('input[name="name"]');
    nameInput.clear();
    submit();
    cy.contains('field is required').should('exist');

    nameInput.type('testname{enter}');
    cy.contains('should be capitalized').should('exist');

    nameInput.clear().type('t{enter}');
    cy.contains('length should be more or equal then 3').should('exist');

    nameInput.clear().type('veryLongTestname{enter}');
    cy.contains('length should be less or equal then 12').should('exist');

    nameInput.clear().type('Testname@@{enter}');
    cy.contains(`should consist of english letters, numbers and '_'`).should('exist');
  });

  it('should show validation messages on incorrect email input', () => {
    fillForm();
    const emailInput = cy.get('input[name="email"]');

    emailInput.clear().type('incorrect@email{enter}');
    cy.contains('should be valid email address').should('exist');
  });

  it('should show validation messages on incorrect birthday input', () => {
    fillForm();
    const dateInput = cy.get('input[name="birthday"]');

    dateInput.clear().type('2010-01-01');
    submit();
    cy.contains('age should be more or equal then 16').should('exist');
  });

  it('should show validation messages on incorrect file input', () => {
    fillForm();
    const fileInput = cy.get('input[name="avatar"]');

    fileInput.selectFile('cypress/fixtures/over100kb-test-image.png', { force: true });
    submit();
    cy.contains('file size should be less or equal then 100 KB').should('exist');

    fileInput.selectFile('cypress/fixtures/test-text-file.txt', { force: true });
    submit();
    cy.contains('should be image file').should('exist');
  });
});
