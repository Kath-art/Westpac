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
    usernameAndPasswordFields: '.form-control',
    loginAndRegisterButtons: '.btn',
    loggedInNavBar:'my-login',
    logoutLink: '.nav-link',
}

// -- This is a parent command --
Cypress.Commands.add('login', () => { 
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.get(model.usernameAndPasswordFields).eq(0).type(username);
    cy.get(model.usernameAndPasswordFields).eq(1).type(password);
    cy.get(model.loginAndRegisterButtons).eq(0).click();
});

Cypress.Commands.add('logout', () => {
    cy.get(model.loggedInNavBar).should('be.visible');
    cy.get(model.logoutLink).eq(2).click();
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
