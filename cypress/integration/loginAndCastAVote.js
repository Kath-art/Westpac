const username = Cypress.env('username');
const password = Cypress.env('password');

describe('User logs in and casts a vote', () => {
    it('logs the user in',() => {
        cy.visit('/');
        cy.login(username,password);
        cy.visit('/overall');
    })

})