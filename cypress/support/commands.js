import createUser from '../pages/create-user'
import loginPage from '../pages/login-page'
import menuPage from '../pages/menu-page'
import bankAccounts from '../pages/bank-accounts'

Cypress.Commands.add('clearNotifications', () => {
  const clear = () => {
    cy.get('body').then($body => {
      const hasNotifications = $body.find("[data-test^='notification-mark-read']").length > 0

      if (hasNotifications) {
        cy.get("[data-test^='notification-mark-read']", { timeout: 0 })
          .first()
          .click({ force: true })

        cy.wait(300)
        clear()
      } else {
        cy.log('Todas as notificações foram marcadas como lidas.')
      }
    })
  }

  clear()
})

Cypress.Commands.add('loginViaApi', (username, password) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: {
      username: username,
      password: password
    }
  }).then((resp) => {
    window.localStorage.setItem('token', resp.body.token)
  })
})

Cypress.Commands.add('assertCreateUserFormInvalid', (errorMessage, fieldToInteract = null) => {
  if (fieldToInteract) {
    fieldToInteract.focus().blur()
  }

  createUser.signUpButton.should('be.disabled')
  cy.contains(errorMessage).should('be.visible')
})

Cypress.Commands.add('loginApp', (username, password, expectedDisplayName) => {
  loginPage.visitLoginPage()
  loginPage.login(username, password)
  loginPage.singInButton.click()
  cy.contains('h6', expectedDisplayName).should('be.visible')
})

Cypress.Commands.add('signUpAndLogin', (user) => { 
  loginPage.visitLoginPage()
  createUser.createAccountLink.click()
  cy.contains('h1', 'Sign Up').should('be.visible')
  createUser.createAccount(
    user.firstName,
    user.lastName,
    user.userName,
    user.password,
    user.password  
  )
  createUser.signUpButton.click()
  cy.location('pathname').should('include', 'signin')
  cy.contains('h1', 'Sign in').should('be.visible')

  cy.loginApp(user.userName, user.password, user.firstName)
})

Cypress.Commands.add('goToBankAccountsPage', () => {
  menuPage.bankAccountsMenu.click()
  cy.contains('h2', 'Bank Accounts').should('be.visible')
})

Cypress.Commands.add('assertBankAccountFormInvalid', (bankName, routingNumber, accountNumber, errorMessage, fieldToInteract = null) => {
  bankAccounts.bankDetails(bankName, routingNumber, accountNumber)

  if (fieldToInteract) {
    fieldToInteract.focus().blur()
  }
  bankAccounts.saveButton.should('be.disabled')
  cy.contains(errorMessage).should('be.visible')
})