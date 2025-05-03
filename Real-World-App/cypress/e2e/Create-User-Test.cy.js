import loginPage from "../pages/login-page"
import createUser from "../pages/create-user"
import dataAccess from "../fixtures/people-data.json"

const accessRegistrationPage = () => {
    loginPage.visitLoginPage();
    createUser.createAccountLink.click();
    cy.contains('h1', 'Sign Up').should('be.visible');
  };

describe('Create Account Page Test', () => {  // Teste de página de criação de conta

    it('Creating an account and accessing the login pagee', () => {  // Criando uma conta e acessando a página de login
        loginPage.visitLoginPage()
        createUser.createAccountLink.click()
        cy.contains('h1', 'Sign Up').should('be.visible')
        createUser.createAccount(
            dataAccess.userMarge.firstName, 
            dataAccess.userMarge.lastName, 
            dataAccess.userMarge.userName, 
            dataAccess.userMarge.password, 
            dataAccess.userMarge.password
        )
        createUser.signUpButton.click()
        cy.location('pathname').should('include', 'signin')
        cy.contains('h1', 'Sign in').should('be.visible')
        loginPage.login(
            dataAccess.userMarge.userName,
            dataAccess.userMarge.password
        )
        loginPage.singInButton.click()
        cy.contains('h6', 'Marge').should('be.visible')
      })

    it('Trying to create an account without First Name', () => {  // Tentando criar uma conta sem nome
        accessRegistrationPage();
        createUser.createAccount(
        '',
        dataAccess.userMarge.lastName,
        dataAccess.userMarge.userName,
        dataAccess.userMarge.password,
        dataAccess.userMarge.password
        )
        createUser.signUpButton.should('be.disabled')
        cy.contains('First Name is required').should('be.visible')
    })

    it('Trying to create an account without Last Name', () => {  // Tentando criar uma conta sem sobrenome
        accessRegistrationPage()
        createUser.createAccount(
        dataAccess.userMarge.firstName,
        '',
        dataAccess.userMarge.userName,
        dataAccess.userMarge.password,
        dataAccess.userMarge.password
        )
        createUser.lastNameField.focus().blur()
        createUser.signUpButton.should('be.disabled')
        cy.contains('Last Name is required').should('be.visible')
    })

    it('Trying to create an account without a Username', () => {  // Tentando criar uma conta sem nome de usuário
        accessRegistrationPage()
        createUser.createAccount(
        dataAccess.userMarge.firstName,
        dataAccess.userMarge.lastName,
        '',
        dataAccess.userMarge.password,
        dataAccess.userMarge.password
        )
        createUser.userNameField.focus().blur()
        createUser.signUpButton.should('be.disabled')
        cy.contains('Username is required').should('be.visible')
    })

    it('Trying to create an account without a password', () =>{  // Tentando criar uma conta sem senha
        accessRegistrationPage()
        createUser.createAccount(
            dataAccess.userMarge.firstName,
            dataAccess.userMarge.lastName,
            dataAccess.userMarge.userName,
            '',
            dataAccess.userMarge.password
        )
        createUser.passwordField.focus().blur()
        createUser.signUpButton.should('be.disabled')
        cy.contains('Enter your password').should('be.visible')
    })

    it('Trying to create an account without Password Confirmation', () =>{  // Tentando criar uma conta sem confirmação de senha
        accessRegistrationPage()
        createUser.createAccount(
            dataAccess.userMarge.firstName,
            dataAccess.userMarge.lastName, 
            dataAccess.userMarge.userName, 
            dataAccess.userMarge.password, 
            ''
        )
        createUser.confirmPasswordField.focus().blur()
        createUser.signUpButton.should('be.disabled')
        cy.contains('Confirm your password').should('be.visible')
    })

    it('Trying to create an account with different passwords', () =>{  // Tentando criar uma conta com senhas diferentes
        accessRegistrationPage()
        createUser.createAccount(
            dataAccess.userMarge.firstName,
            dataAccess.userMarge.lastName, 
            dataAccess.userMarge.userName, 
            dataAccess.userMarge.password, 
            dataAccess.userHommer.password
        )
        createUser.signUpButton.should('be.disabled')
        cy.contains('Password does not match').should('be.visible')
    })

    it('Trying to create an account with an existing Username', () =>{  // Tentando criar uma conta com um nome de usuário existente
        accessRegistrationPage()
        createUser.createAccount(
            dataAccess.userMarge.firstName, 
            dataAccess.userMarge.lastName, 
            dataAccess.userHommer.userName, 
            dataAccess.userMarge.password, 
            dataAccess.userMarge.password
        )
        createUser.signUpButton.should('be.disabled')
        cy.contains('Username already exists').should('be.visible')
    })

    it('Trying to create an account with a very short password', () =>{  // Tentando criar uma conta com uma senha muito curta
        accessRegistrationPage()
        createUser.createAccount(
            dataAccess.userMarge.firstName,
            dataAccess.userMarge.lastName, 
            dataAccess.userMarge.userName, 
            '123', 
            ''
        )
        createUser.signUpButton.should('be.disabled')
        cy.contains('Password must contain at least 4 characters').should('be.visible')
    })

    it('Trying to create an account with invalid characters', () =>{  // Tentando criar uma conta com caracteres inválidos
        accessRegistrationPage()
        createUser.createAccount(
            dataAccess.userMarge.firstName, 
            dataAccess.userMarge.lastName, 
            'Marge@!Simpson_', 
            dataAccess.userMarge.password, 
            dataAccess.userMarge.password
        )
        createUser.signUpButton.should('be.disabled')
        cy.contains('User Name cannot contain special characters').should('be.visible')
    })
})