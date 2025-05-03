class HomePage {
    
    get allTransactions () {
        return cy.get("[data-test='nav-public-tab']")
    }

    get friendsTransactions () {
        return cy.get("[data-test='nav-contacts-tab']")
    }

    get myTransactions () {
        return cy.get("[data-test='nav-personal-tab']")
    }

    get notifications () {
        return cy.get("[data-test='nav-top-notifications-link']")
    }

    get newTransaction () {
        return cy.get("[data-test='nav-top-new-transaction']")
    }

    get searchPeople () {
        return cy.get("[data-test='user-list-search-input']")
    }

    get userList () {
        return cy.get ("[data-test='users-list']")
    }

    get userListMarge () {
        return cy.get ("[data-test='user-list-item-onH9neaRl']")
    }

    get amount () {
        return cy.get ("[id='amount']")
    }

    get amountAlert () {
        return cy.get ("[id='transaction-create-amount-input-helper-text']")
    }

    get description () {
        return cy.get ("[id='transaction-create-description-input']")
    }

    get descriptionAlert () {
        return cy.get ("[id='transaction-create-description-input-helper-text']")
    }

    get requestButton () {
        return cy.get("[data-test='transaction-create-submit-request']")
    }

    get payButton () {
        return cy.get("[data-test='transaction-create-submit-payment']")
    }

    get dissmissButton () {
        return cy.get("[data-test^='notification-mark-read']",  { timeout: 0, log: false})
    }

    get notNotifcatoins () {
        return cy.get('h2.MuiTypography-root.MuiTypography-h6.MuiTypography-gutterBottom')
    }

    get accountBalance () {
        return cy.get("[data-test='sidenav-user-balance']")
    }

    waitForNotifications() {
        // Espera pela lista de notificações, ajustando o tempo para garantir que as notificações apareçam
        cy.get('[data-test="notification-list"]', { timeout: 10000 }).should('exist').and('be.visible')
    }
}
export default new HomePage ()