import loginPage from "../pages/login-page"
import createUser from "../pages/create-user"
import dataAccess from "../fixtures/people-data.json"
import '../support/commands'

describe('User Account Creation Tests', () => { // Testes de Criação de Conta de Usuário

  beforeEach(() => {
    cy.task('db:seed')
    loginPage.visitLoginPage()
    createUser.createAccountLink.click()
    cy.contains('h1', 'Sign Up').should('be.visible')
  })

  it('Creating an account and accessing the login page', () => { // Criando uma conta e acessando a página de login

    createUser.createAccount(
      dataAccess.userMarge.firstName,
      dataAccess.userMarge.lastName,
      dataAccess.userMarge.userName,
      Cypress.env('margePassword'),
      Cypress.env('margePassword')
    )
    createUser.signUpButton.click()
    cy.contains('h1', 'Sign in').should('be.visible')

    cy.loginApp(
      dataAccess.userMarge.userName,
      Cypress.env('margePassword'),
      dataAccess.userMarge.firstName 
    )
    cy.contains('h2', 'Get Started with Real World App').should('be.visible')
  })

  it('Trying to create an account without First Name', () => { // Tentando criar uma conta sem nome

    const randomUsername = `test_no_fn_${Cypress._.random(0, 1e6)}`
    createUser.createAccount(
      '',
      dataAccess.userMarge.lastName,
      randomUsername,
      Cypress.env('margePassword'),
      Cypress.env('margePassword')
    )
    cy.assertCreateUserFormInvalid('First Name is required')
  })

  it('Trying to create an account without Last Name', () => { // Tentando criar uma conta sem sobrenome

    const randomUsername = `test_no_ln_${Cypress._.random(0, 1e6)}`
    createUser.createAccount(
      dataAccess.userMarge.firstName,
      '',
      randomUsername,
      Cypress.env('margePassword'),
      Cypress.env('margePassword')
    )
    cy.assertCreateUserFormInvalid('Last Name is required', createUser.lastNameField)
  })

  it('Trying to create an account without a Username', () => { // Tentando criar uma conta sem nome de usuário

    createUser.createAccount(
      dataAccess.userMarge.firstName,
      dataAccess.userMarge.lastName,
      '',
      Cypress.env('margePassword'),
      Cypress.env('margePassword')
    )
    cy.assertCreateUserFormInvalid('Username is required', createUser.userNameField)
  })

  it('Trying to create an account without a password', () => { // Tentando criar uma conta sem senha

    const randomUsername = `test_no_pw_${Cypress._.random(0, 1e6)}`
    createUser.createAccount(
      dataAccess.userMarge.firstName,
      dataAccess.userMarge.lastName,
      randomUsername,
      '',
      Cypress.env('margePassword')
    )
    cy.assertCreateUserFormInvalid('Enter your password', createUser.passwordField)
  })

  it('Trying to create an account without Password Confirmation', () => { // Tentando criar uma conta sem confirmação de senha

    const randomUsername = `test_no_conf_pw_${Cypress._.random(0, 1e6)}`
    createUser.createAccount(
      dataAccess.userMarge.firstName,
      dataAccess.userMarge.lastName,
      randomUsername,
      Cypress.env('margePassword'),
      ''
    )
    cy.assertCreateUserFormInvalid('Confirm your password', createUser.confirmPasswordField)
  })

  it('Trying to create an account with different passwords', () => { // Tentando criar uma conta com senhas diferentes

    const randomUsername = `test_diff_pw_${Cypress._.random(0, 1e6)}`
    createUser.createAccount(
      dataAccess.userMarge.firstName,
      dataAccess.userMarge.lastName,
      randomUsername,
      Cypress.env('margePassword'),
      Cypress.env('hommerFailPasswordErro')
    )
    cy.contains('Password does not match').should('be.visible')
  })

  it('Trying to create an account with an existing Username', () => { // Tentando criar uma conta com um nome de usuário existente

    createUser.createAccount(
      dataAccess.userHommer.firstName,
      dataAccess.userHommer.lastName,
      dataAccess.userHommer.userName,
      Cypress.env('hommerPassword'),
      Cypress.env('hommerPassword')
    )
    cy.assertCreateUserFormInvalid('Username already exists')
  })

  it('Trying to create an account with a very short password', () => { // Tentando criar uma conta com uma senha muito curta

    const randomUsername = `test_short_pw_${Cypress._.random(0, 1e6)}`
    createUser.createAccount(
      dataAccess.userMarge.firstName,
      dataAccess.userMarge.lastName,
      randomUsername,
      '123',
      '123'
    )
    cy.assertCreateUserFormInvalid('Password must contain at least 4 characters')
  })

  it('Trying to create an account with invalid characters', () => { // Tentando criar uma conta com caracteres inválidos

    const randomUsername = `Marge@!Simpson_${Cypress._.random(0, 1e6)}`
    createUser.createAccount(
      dataAccess.userMarge.firstName,
      dataAccess.userMarge.lastName,
      randomUsername,
      Cypress.env('margePassword'),
      Cypress.env('margePassword')
    )
    cy.assertCreateUserFormInvalid('User Name cannot contain special characters')
  })
})