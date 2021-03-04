import { times } from 'lodash';

const model = {
    profileLinks: 'a.nav-link',
    profileForm: '.container .my-form',
    currentPassword: '#currentPassword',
    newPassword: '#newPassword',
    confirmPassword: '#newPasswordConfirmation',
    errorMessages: '.alert',
    invalidPasswordException: '.result.hidden-md-down',
    limitExceededException: '.result.hidden-md-down',
    saveButton: '.btn.btn-default',
    cancelButton: 'a.btn',
}

describe('tests the password validation rules and logs out',() => {
    before(() => {
        cy.visit('/');
        cy.login();
    });   
    after(() => {
        cy.logout();
    })    
    it('updates password where new and confirmed password dont match', () => {
        cy.get(model.profileLinks).eq(0).click();
        cy.get(model.currentPassword).type(`${Cypress.env('password')}`);
        cy.get(model.errorMessages).eq(3).should('not.be.visible')
        cy.get(model.newPassword).type('11');
        cy.get(model.errorMessages).eq(3).should('be.visible')
            .contains('Passwords do not match')
            .and('have.css','background-color')
            .and('eq', 'rgb(242, 222, 222)');
        cy.get(model.invalidPasswordException).should('not.exist');
        cy.get(model.currentPassword).type(`${Cypress.env('password')}`);
        cy.get(model.newPassword).clear().type('password');
        cy.get(model.confirmPassword).clear().type('password');
        cy.get(model.saveButton).click();
        cy.get(model.invalidPasswordException).should('be.visible')
            .contains('Password must have uppercase characters')

    });

     it('displays the  limit exceeded alert box', () => {
        times(5,() => {
            cy.get(model.currentPassword).clear().type(`${Cypress.env('password')}`);
            cy.get(model.newPassword).clear().type('password');
            cy.get(model.confirmPassword).clear().type('password');
            cy.get(model.saveButton).click();
        })
            cy.get(model.limitExceededException).then(($e) => {
                cy.wrap($e).should('be.visible')
                .contains('Password must have uppercase characters')
                .and('have.css','background-color')
                .and('eq', 'rgb(242, 222, 222)');
            });   
      })
    })
