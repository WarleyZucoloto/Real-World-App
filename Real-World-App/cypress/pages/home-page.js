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


}
export default new HomePage ()