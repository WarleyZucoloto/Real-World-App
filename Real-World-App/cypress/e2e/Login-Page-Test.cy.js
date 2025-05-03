import loginPage from "../pages/login-page"
import dataAccess from "../fixtures/people-data.json"

describe('Login Page Test', () => {

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
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommer.userName
    )
    cy.location('pathname').should('include', 'signin')
    loginPage.singInButton.should('be.disabled')
  })

  it ('Login Failed: Using Password Only', () => {  // Falha no login: usando apenas senha
    loginPage.visitLoginPage()
    loginPage.login(
        '',
        dataAccess.userHommer.password
    )
    cy.location('pathname').should('include', 'signin')
    loginPage.singInButton.should('be.disabled')
    loginPage.userHelperAlert.should('be.visible')
  })

  it ('Failed - Empty login and password', () =>{  //Falha - Login e senha vazios
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

  it ('Failed - Invalid password only', () =>{  // Falha - Somente senha inválida
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommer.userName,
        dataAccess.userHommerFail.passwordErro
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.dataInvalid.should('be.visible')
  })

  it ('Failed - Invalid login only', () =>{  // Falha – Somente login inválido
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommerFail.userNameErro,
        dataAccess.userHommer.password
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.dataInvalid.should('be.visible')
  })

  it ('Fault - Case sensitivity', () =>{  // Falha - Sensibilidade a maiúsculas e minúsculas
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommerFail.userHommerCaseSentive,
        dataAccess.userHommerFail.passwordCaseSensitive
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.dataInvalid.should('be.visible')
  })

  it ('Failed - User with case sensitive', () =>{  // Falha – Usuário com distinção entre maiúsculas e minúsculas
    loginPage.visitLoginPage()
    loginPage.login(
        dataAccess.userHommerFail.userHommerCaseSentive,
        dataAccess.userHommer.password
    )
    loginPage.singInButton.click()
    cy.location('pathname').should('include', 'signin')
    loginPage.dataInvalid.should('be.visible')
  })

  it ('Failed - Password with case sensitivity', () =>{  // Falha – Senha com distinção entre maiúsculas e minúsculas
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