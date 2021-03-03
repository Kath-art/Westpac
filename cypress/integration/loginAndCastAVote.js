const model = {
    loggedInNavBar:'my-login',
    diabloLink: 'tr:first-child td a',
    cardBlockHeading: '.card-block h4',
    voteComment:'textarea',
    voteButton:'.btn-success',
    voteList: 'tr',
    voteThankyou: '.card-text'
}

describe('User logs in and casts a vote', () => {
    it('logs the user in and votes for the Lamborghini Diablo',() => {
        cy.visit('/');
        cy.login();
        cy.get(model.loggedInNavBar).should('be.visible')
            .and('contain', 'Hi')
            .and('contain','Logout')
        cy.visit('/overall');
        cy.get(model.diabloLink).should('exist')
            .and('have.attr', 'href', '/model/c0bm09bgagshpkqbsuag|c0bm09bgagshpkqbsuh0');
        cy.get(model.diabloLink).eq(2).click();
        cy.get(model.cardBlockHeading).eq(1).should('have.text','Specification');
        cy.get(model.voteComment).type('i voted');
        cy.get(model.voteButton).click();
        cy.get(model.voteList).eq(0).should('contain','i voted'); // eq(0) proving it's the most recent one in the voting list
        cy.get(model.voteThankyou).should('contain','Thank you for your vote!')
    });
})