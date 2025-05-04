import loginPage from "../pages/login-page"
import dataAccess from "../fixtures/people-data.json"

describe('Login Page Test', () => { // Teste de página de login
  
  const loginAndVerify = (username, password, expectedPath) => {
    loginPage.visitLoginPage()
    loginPage.login(username, password)
    // loginPage.singInButton.click()
    cy.location('pathname').should('include', expectedPath)
  }

  it('Login Successful', () => {  // Login bem-sucedido
    loginPage.visitLoginPage()
    loginPage.login(
      dataAccess.userHommer.userName,
      dataAccess.userHommer.password
    )
    loginPage.singInButton.click()
    cy.contains('h6', 'Hommer').should('be.visible')
  })

  it('Login Failed: Using Username Only', () => {  // Falha no login: usando apenas nome de usuário
    loginAndVerify(dataAccess.userHommer.userName, '')
    loginPage.singInButton.should('be.disabled')
    loginPage.passwordHelperAlert.should('be.visible')
  })

  it ('Login Failed: Using Password Only', () => {  // Falha no login: usando apenas senha
    loginAndVerify('', dataAccess.userHommer.password, 'signin')
    loginPage.singInButton.should('be.disabled')
    loginPage.userHelperAlert.should('be.visible')
  })

  it ('Failed - Empty login and password', () =>{  // Falha - Login e senha vazios
    loginPage.visitLoginPage()
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.singInButton.should('be.disabled')
    loginPage.userHelperAlert.should('be.visible')
  })

  it ('Failed - Invalid login and password', () =>{  // Falha - Login e senha inválidos
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommerFail.userNameErro,
        dataAccess.userHommerFail.passwordErro
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.signInAlertError.should('be.visible')
  })

  const invalidLoginTests = [
    { user: dataAccess.userHommerFail.userNameErro, password: dataAccess.userHommer.password, alert: () => loginPage.dataInvalid },
    { user: dataAccess.userHommer.userName, password: dataAccess.userHommerFail.passwordErro, alert: () => loginPage.dataInvalid },
    { user: dataAccess.userHommerFail.userNameErro, password: dataAccess.userHommerFail.passwordErro, alert: () => loginPage.dataInvalid },
    { user: dataAccess.userHommerFail.userHommerCaseSentive, password: dataAccess.userHommerFail.passwordCaseSensitive, alert: () => loginPage.dataInvalid },
    { user: dataAccess.userHommerFail.userHommerCaseSentive, password: dataAccess.userHommer.password, alert: () => loginPage.dataInvalid },
    { user: dataAccess.userHommer.userName, password: dataAccess.userHommerFail.passwordCaseSensitive, alert: () => loginPage.dataInvalid },
  ]  

  invalidLoginTests.forEach(({ user, password, alert }) => {
    invalidLoginTests.forEach(({ user, password, alert }) => {
      it(`Failed - Invalid login/password combination: ${user} / ${password}`, () => {  // Falha – Combinações inválidas
        loginPage.visitLoginPage()
        loginPage.login(user, password)
        loginPage.singInButton.click()
        cy.location('pathname').should('include', 'signin')
        alert().should('be.visible')
      })
    })    
  }) 
})