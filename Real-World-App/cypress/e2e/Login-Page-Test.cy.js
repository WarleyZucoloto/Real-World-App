import loginPage from "../pages/login-page"
import dataAccess from "../fixtures/people-data.json"

describe('Login Page Test', () => {

  it('Login Successful', () => {
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommer.userName,
        dataAccess.userHommer.password
    )
    loginPage.singInButton.click()
    cy.contains('h6', 'Hommer').should('be.visible')
  })

  it('Login Failed: Using Username Only', () => {
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommer.userName
    )
    cy.location('pathname').should('include', 'signin')
    loginPage.singInButton.should('be.disabled')
  })

  it ('Login Failed: Using Password Only', () => {
    loginPage.visitLoginPage()
    loginPage.login(
        '',
        dataAccess.userHommer.password
    )
    cy.location('pathname').should('include', 'signin')
    loginPage.singInButton.should('be.disabled')
    loginPage.userHelperAlert.should('be.visible')
  })

  it ('Failed - Empty login and password', () =>{
    loginPage.visitLoginPage()
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.singInButton.should('be.disabled')
    loginPage.userHelperAlert.should('be.visible')
  })

  it ('Failed - Invalid login and password', () =>{
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommerFail.userNameErro,
        dataAccess.userHommerFail.passwordErro
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.signInAlertError.should('be.visible')
  })

  it ('Failed - Invalid password only', () =>{
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommer.userName,
        dataAccess.userHommerFail.passwordErro
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.dataInvalid.should('be.visible')
  })

  it ('Failed - Invalid login only', () =>{
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommerFail.userNameErro,
        dataAccess.userHommer.password
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.dataInvalid.should('be.visible')
  })

  it ('Fault - Case sensitivity', () =>{
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommerFail.userHommerCaseSentive,
        dataAccess.userHommerFail.passwordCaseSensitive
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.dataInvalid.should('be.visible')
  })

  it ('Failed - User with case sensitive', () =>{
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommerFail.userHommerCaseSentive,
        dataAccess.userHommer.password
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.dataInvalid.should('be.visible')
  })

  it ('Failed - Password with case sensitivity', () =>{
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommer.userName,
        dataAccess.userHommerFail.passwordCaseSensitive
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.dataInvalid.should('be.visible')
  })
  
})