import loginPage from "../pages/login-page"
import dataAccess from "../fixtures/people-data.json"
import '../support/commands'

describe('Login Page Test', () => { // Teste de página de login

  const assertLoginFailure = (username, password, expectedPath, expectedAlertElement, assertButtonDisabled = true) => {
    loginPage.visitLoginPage()
    loginPage.login(username, password)

    if (!assertButtonDisabled) {
        loginPage.singInButton.click()
    }
    cy.location('pathname').should('include', expectedPath)
    if (assertButtonDisabled) {
        loginPage.singInButton.should('be.disabled')
    }
    expectedAlertElement.should('be.visible')
  }


  it('Login Successful', () => { // Login bem-sucedido

    cy.loginApp(
      dataAccess.userHommer.userName,
      Cypress.env('hommerPassword'), // Senha do Hommer via Cypress.env
      dataAccess.userHommer.firstName
    )
  })

  it('Login Failed: Using Username Only', () => { // Falha no login: usando apenas nome de usuário

    assertLoginFailure(
        dataAccess.userHommer.userName,
        '', // Senha vazia
        'signin',
        loginPage.passwordHelperAlert
    )
  })

  it ('Login Failed: Using Password Only', () => { // Falha no login: usando apenas senha

    assertLoginFailure(
        '', // Usuário vazio
        Cypress.env('hommerPassword'), // Senha do Hommer via Cypress.env
        'signin',
        loginPage.userHelperAlert
    )
  })

  it ('Failed - Empty login and password', () => { // Falha - Login e senha vazios

    loginPage.visitLoginPage()
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.singInButton.should('be.disabled')
    loginPage.userHelperAlert.should('be.visible')
    loginPage.passwordHelperAlert.should('be.visible')
  })

  it ('Failed - Invalid login and password', () => { // Falha - Login e senha inválidos

    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommerFail.userNameErro,
        Cypress.env('hommerFailPasswordErro') // Senha de erro do Hommer via Cypress.env
    )
    loginPage.singInButton.click()

    cy.location('pathname').should('include', 'signin')
    loginPage.signInAlertError.should('be.visible')
  })

  const invalidLoginTests = [

    { user: dataAccess.userHommerFail.userNameErro, password: Cypress.env('hommerPassword'), alert: () => loginPage.signInAlertError },
    { user: dataAccess.userHommer.userName, password: Cypress.env('hommerFailPasswordErro'), alert: () => loginPage.signInAlertError },
    { user: dataAccess.userHommerFail.userNameErro, password: Cypress.env('hommerFailPasswordErro'), alert: () => loginPage.signInAlertError },
    { user: dataAccess.userHommerFail.userHommerCaseSentive, password: dataAccess.userHommerFail.passwordCaseSensitive, alert: () => loginPage.signInAlertError },
    { user: dataAccess.userHommerFail.userHommerCaseSentive, password: Cypress.env('hommerPassword'), alert: () => loginPage.signInAlertError },
    { user: dataAccess.userHommer.userName, password: dataAccess.userHommerFail.passwordCaseSensitive, alert: () => loginPage.signInAlertError },
  ]

  invalidLoginTests.forEach(({ user, password, alert }) => {
    it(`Failed - Invalid login/password combination: ${user} / ${password}`, () => { // Falha – Combinações inválidas

      loginPage.visitLoginPage()
      loginPage.login(user, password)
      loginPage.singInButton.click()

      cy.location('pathname').should('include', 'signin')
      alert().should('be.visible')
    })
  })
})