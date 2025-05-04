import loginPage from "../pages/login-page"
import HomePage from "../pages/home-page"
import createUser from '../pages/create-user'
import menuPage from "../pages/menu-page"
import bankAccounts from "../pages/bank-accounts"
import dataAccess from "../fixtures/people-data.json"

describe ('Creating bank account and adding personal information', () => {  // Criando conta bancária e adicionando informações pessoais


   // Acessando a conta pela primeira vez
   // Accessing the account for the first time

     it('Creating a bank account for the first time by accessing the login page', () => {  // Criando uma conta  bancária pela primeira vez acessando a página de login
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

        bankAccounts.createAccountBankButton.click()
        bankAccounts.bankDetails(
            dataAccess.userMarge.bankAccounts,
            dataAccess.userMarge.routingNumber,
            dataAccess.userMarge.accountNumber
        )
        bankAccounts.saveButtonAccount.click()
        bankAccounts.doneButtonAccount.click({force: true})
        cy.contains('h6', 'Account Balance').should("be.visible")
  })

    // Acessando a conta já com dados cadastrados
    // Accessing the account with already registered data

    it('Creating bank account', () =>{  // Criando conta bancária
        loginPage.visitLoginPage()

        loginPage.login(
            dataAccess.userHommer.userName,
            dataAccess.userHommer.password
        )
        loginPage.singInButton.click()
        cy.contains('h6', 'Hommer').should('be.visible')
    })
    
    it('Creating a new account', () =>{  // Criando uma nova conta
        loginPage.visitLoginPage()
        loginPage.loginSuccess(
            dataAccess.userHommer.userName,
            dataAccess.userHommer.password
        )
        cy.contains('h6', 'Hommer').should('be.visible')
        menuPage.bankAccountsMenu.click()
        cy.contains('h2', 'Bank Accounts').should('be.visible')
        bankAccounts.createButton.click()
        bankAccounts.bankDetails(
            dataAccess.userHommer.bankAccounts,
            dataAccess.userHommer.routingNumer,
            dataAccess.userHommer.accountNumber
        )
        bankAccounts.saveButton.click()
    })
    
    // Testando retorno de erros com situações de cadastro incorretos
    // Testing error returns with incorrect registration situations

    it('Bank name is blank - should display error message', () => {  // Nome do banco em branco - deve exibir mensagem de erro
        loginPage.visitLoginPage()
        loginPage.loginSuccess(
            dataAccess.userHommer.userName, 
            dataAccess.userHommer.password
        )
        cy.contains('h6', 'Hommer').should('be.visible')
        menuPage.bankAccountsMenu.click()
        cy.contains('h2', 'Bank Accounts').should('be.visible')
        bankAccounts.createButton.click()
        bankAccounts.bankNameField.click({force: true})
        bankAccounts.routingNumber.click({force: true})
        bankAccounts.bankDetails(
            '', 
            dataAccess.userHommer.routingNumer, 
            dataAccess.userHommer.accountNumber
        )
        bankAccounts.bankNameAlert.should('contain', 'Enter a bank name')
        bankAccounts.saveButton.should('be.disabled')
    })
    
    it('Bank name with less than 5 characters - should display error message', () => {  // Nome do banco com menos de 5 caracteres - deve exibir mensagem de erro
        loginPage.visitLoginPage()
        loginPage.loginSuccess(
            dataAccess.userHommer.userName, 
            dataAccess.userHommer.password
        )
        cy.contains('h6', 'Hommer').should('be.visible')
        menuPage.bankAccountsMenu.click()
        cy.contains('h2', 'Bank Accounts').should('be.visible')
        bankAccounts.createButton.click()
        bankAccounts.bankDetails(
            '1234', // Nome do banco com menos de 5 caracteres
            dataAccess.userHommer.routingNumer, 
            dataAccess.userHommer.accountNumber
        )
        bankAccounts.saveButton.should('be.disabled')
        bankAccounts.bankNameAlert.should('contain', 'Must contain at least 5 characters')
    })
    
    it('Routing number is blank - should display error message', () => {  // Número de roteamento em branco - deve exibir mensagem de erro
        loginPage.visitLoginPage()
        loginPage.loginSuccess(
            dataAccess.userHommer.userName, 
            dataAccess.userHommer.password
        )
        cy.contains('h6', 'Hommer').should('be.visible')
        menuPage.bankAccountsMenu.click()
        cy.contains('h2', 'Bank Accounts').should('be.visible')
        bankAccounts.createButton.click()
        bankAccounts.routingNumber.click({force: true})
        bankAccounts.bankNameField.click({force: true})
        bankAccounts.bankDetails(
            dataAccess.userHommer.bankAccounts, 
            '', // Campo da conta de roteamento vazio
            dataAccess.userHommer.accountNumber
        )
        bankAccounts.saveButton.should('be.disabled')
        bankAccounts.routingNumberAlert.should('contain', 'Enter a valid bank routing number')
    })
    
    it('Routing number with less than 9 characters - should display error message', () => {  // Número de roteamento com menos de 9 caracteres - deve exibir mensagem de erro
        loginPage.visitLoginPage()
        loginPage.loginSuccess(
            dataAccess.userHommer.userName, 
            dataAccess.userHommer.password
        )
        cy.contains('h6', 'Hommer').should('be.visible')
        menuPage.bankAccountsMenu.click()
        cy.contains('h2', 'Bank Accounts').should('be.visible')
        bankAccounts.createButton.click()
        bankAccounts.bankDetails(
            dataAccess.userHommer.bankAccounts, 
            '12345678', // Conta de roteamento com menos de 9 caracteres
            dataAccess.userHommer.accountNumber
        )
        bankAccounts.saveButton.should('be.disabled')
        bankAccounts.routingNumberAlert.should('contain', 'Must contain a valid routing number')
    })
    
    it('Routing number with more than 9 characters - should display error message', () => {  // Número de roteamento com mais de 9 caracteres - deve exibir mensagem de erro
        loginPage.visitLoginPage()
        loginPage.loginSuccess(
            dataAccess.userHommer.userName, 
            dataAccess.userHommer.password
        )
        cy.contains('h6', 'Hommer').should('be.visible')
        menuPage.bankAccountsMenu.click()
        cy.contains('h2', 'Bank Accounts').should('be.visible')
        bankAccounts.createButton.click()
        bankAccounts.bankDetails(
            dataAccess.userHommer.bankAccounts, 
            '1234567890', // Conta de roteamento entre 9 e 12 caracteres
            dataAccess.userHommer.accountNumber
        )
        bankAccounts.saveButton.should('be.disabled')
        bankAccounts.routingNumberAlert.should('contain', 'Must contain a valid routing number')
    })
    
    it('Account number with less than 9 digits - should display error message', () => {  // Número da conta com menos de 9 dígitos - deve exibir mensagem de erro
        loginPage.visitLoginPage()
        loginPage.loginSuccess(
            dataAccess.userHommer.userName, 
            dataAccess.userHommer.password
        )
        cy.contains('h6', 'Hommer').should('be.visible')
        menuPage.bankAccountsMenu.click()
        cy.contains('h2', 'Bank Accounts').should('be.visible')
        bankAccounts.createButton.click()
        bankAccounts.bankDetails(
            dataAccess.userHommer.bankAccounts, 
            dataAccess.userHommer.routingNumer, 
            '12345678' // Numero da conta com menos de 9 caracteres
        )
        bankAccounts.saveButton.should('be.disabled')
        bankAccounts.accountNumberAlert.should('contain', 'Must contain at least 9 digits')
    })
    
    it('Account number with more than 12 digits - should display error message', () => {  // Número da conta com mais de 12 dígitos - deve exibir mensagem de erro
        loginPage.visitLoginPage()
        loginPage.loginSuccess(
            dataAccess.userHommer.userName, 
            dataAccess.userHommer.password
        )
        cy.contains('h6', 'Hommer').should('be.visible')
        menuPage.bankAccountsMenu.click()
        cy.contains('h2', 'Bank Accounts').should('be.visible')
        bankAccounts.createButton.click()
        bankAccounts.bankDetails(
            dataAccess.userHommer.bankAccounts, 
            dataAccess.userHommer.routingNumer, 
            '1234567890123' // Numero da conta com mais de 12 caracteres
        )
        bankAccounts.saveButton.should('be.disabled')
        bankAccounts.accountNumberAlert.should('contain', 'Must contain no more than 12 digits')
    })  
})