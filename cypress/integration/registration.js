// https://www.npmjs.com/package/cypress-axe
function terminalLog(violations) {
    cy.task(
      'log',
      `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
      ({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length
      })
    )
  
    cy.task('table', violationData)
  }

const model = {
    root: '.form-inline',
    inputFields: '.form-group',
    loginAndRegisterButtons: '.btn',
    registrationFormHeading: 'h2',
    registrationForm: '.container .my-form',
    registrationFormLoginField: '#username',
    registrationFormFirstNameField: '#firstName',
    registrationFormLastNameField: '#lastName',
    registrationFormPasswordField: '#password',
    registrationFormConfirmPasswordField: '#confirmPassword',
    registrationFormRegistrationButton:'.btn-default',
    successfulRegistrationMessage:'.alert-success',
}

describe('registration',() => {
    it('visits the homepage', () => {
        cy.visit('/');
        cy.injectAxe();
    });

    //expected that these will fail - visit the console for details
    it('Logs accessibility violations to the terminal', () => {
        cy.checkA11y(null, null, terminalLog)
    });

    it('displays the input fields and login and register buttons', () => {
        cy.get(model.root).should('be.visible');
    });

    it('clicks on the register button', () => {
        cy.get(model.loginAndRegisterButtons).eq(1).click();
        cy.get(model.registrationFormHeading).should('have.text','Register with Buggy Cars Rating');
        cy.get(model.registrationForm).should('exist');
    });

    it('completes the registration form', () => {
        cy.get(model.registrationFormLoginField).type('testuser');
        cy.get(model.registrationFormFirstNameField).type('testfirstname');
        cy.get(model.registrationFormLastNameField).type('testlastnamefield');
        cy.get(model.registrationFormPasswordField).type('Password!23');
        cy.get(model.registrationFormConfirmPasswordField).type('Password!23');
        cy.get(model.registrationFormRegistrationButton).click();
        cy.get(model.successfulRegistrationMessage).contains('successful')
            .and('have.css','background-color')
            .and('eq', 'rgb(223, 240, 216)');
    });
});