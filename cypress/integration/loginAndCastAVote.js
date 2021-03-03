const model = {
    loggedInNavBar:'my-login',
    diabloLink: 'tr:first-child td a',
    cardBlockHeading: '.card-block h4',
    voteColumn: '.col-lg-4',
    voteComment:'textarea',
    voteButton:'.btn',
    voteList: '.table',
    voteThankyou: 'p.card-text'
}

describe('User logs in and casts a vote', () => {
    it('logs the user in and votes for their favourite car',() => {
        cy.visit('/');
        cy.login();
        cy.get(model.loggedInNavBar).should('be.visible')
            .and('contain', 'Hi')
            .and('contain','Logout')
        cy.visit('/overall');
        cy.get(model.diabloLink).eq(2).click();
        cy.get(model.cardBlockHeading).eq(1).should('have.text','Specification');
        cy.get(model.voteColumn).then((column) => {
            if(column.length < 0) {
                cy.get(model.voteComment).type('i voted');
                cy.get(model.voteButton).click();
                cy.get(model.voteList).eq(0).should('contain','i voted'); // eq(0) proving it's the most recent one in the voting list
            }else {
            cy.get(model.voteThankyou).should('contain','Thank you for your vote!')
            }
        });
    });
});
