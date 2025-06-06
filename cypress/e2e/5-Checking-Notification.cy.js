import homePage from "../pages/home-page"
import dataAccess from "../fixtures/people-data.json"
import '../support/commands' // Certifique-se de que esta linha está presente para os comandos customizados

beforeEach(() => {

    cy.loginApp(
      dataAccess.userHommer.userName,
      Cypress.env('hommerPassword'),
      dataAccess.userHommer.firstName
    )

    cy.contains('h6', 'Hommer').should('be.visible').click()
    homePage.newTransaction.click()
    cy.location('pathname').should('include', 'transaction/new')
  })

describe ('Checking and reading my notifications', () => { // Checando e lendo minhas notificações

  it('my notifications', () => { // minhas notificações
    cy.get('span.MuiBadge-badge').then($badge => {
      const count = parseInt($badge.text())

      if (count > 0) {
        cy.log(`Existe(m) ${count} notificações`)

        homePage.notifications.click()
        cy.wait(300)

        cy.clearNotifications()
      } else {
        cy.log("Não existem notificações a verificar")
      }
    })
  })
})