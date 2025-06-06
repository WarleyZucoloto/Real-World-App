class MenuPage {

    get homeMenu () {
        return cy.get("[data-test='sidenav-home']").should('be.visible')
    }

    get myAccountMenu () {
        return cy.get("[data-test='sidenav-user-settings']").should('be.visible')
    }

    get bankAccountsMenu () {
        return cy.get("[data-test='sidenav-bankaccounts']").should('be.visible')
    }

    get notificationsMenu () {
        return cy.get ("[data-test='sidenav-notifications']").should('be.visible')
    }

    get logoutButton () {
        return cy.get ("[data-test='sidenav-signout']").should('be.visible')
    }

}

export default new MenuPage()