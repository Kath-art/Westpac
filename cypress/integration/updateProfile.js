const model = {
    loggedInNavBar:'my-login',
    profileLinks: 'a.nav-link',
    profileForm: '.container .my-form',
    firstNameField: '#firstName',
    lastNameField: '#lastName',
    genderField: '#gender',
    ageField: '#age',
    addressField: '#address',
    phoneField: '#phone',
    hobbyField: '#hobby',
    saveButton: '.btn.btn-default',
    navItems: '.nav-item',
}

describe('updates the users first and last name and adds additional information to gender, age, address, phone and hobby, fields', () => {
    it('updates the users first and last name', () => {
        cy.visit('/');
        cy.login();
        cy.get(model.loggedInNavBar).should('be.visible')
            .and('contain', 'Hi')
            .and('contain','Logout');
        cy.get(model.profileLinks).eq(0).click();
        cy.get(model.profileForm).should('exist')
            .and('contain','Basic').and('contain','Additional Info');
        cy.get(model.firstNameField).should('have.value','firstName').clear().type('firstName');
        cy.get(model.lastNameField).should('have.value','lastName').clear().type('lastName');
        cy.get(model.saveButton).click();

    });
    it('adds the gender, age, address, phone and hobby, fields', () => {
        cy.get(model.genderField).clear().type('Female');
        cy.get(model.ageField).clear().type('21');
        cy.get(model.addressField).clear().type('some text');
        cy.get(model.phoneField).clear().type('099999999');
        cy.get(model.hobbyField).select('Working');
        cy.get(model.saveButton).click();
    })
});