// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

const model = {
    usernameAndPasswordfields: '.form-group',
    loginAndRegisterButtons: '.btn',
}

// const username = Cypress.env('username');
// const password = Cypress.env('password');

// -- This is a parent command --
Cypress.Commands.add("login", (username, password) => { 
    cy.get(model.usernameAndPasswordfields).eq(0).type(Cypress.env('username'));
    cy.get(model.usernameAndPasswordfields).eq(1).type(Cypress.env('password'));
    cy.get(model.loginAndRegisterButtons).eq(0).click();
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
