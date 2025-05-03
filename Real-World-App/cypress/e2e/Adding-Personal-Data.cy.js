import loginPage from "../pages/login-page"
import HomePage from "../pages/home-page"
import createUser from '../pages/create-user'
import menuPage from "../pages/menu-page"
import bankAccounts from "../pages/bank-accounts"
import dataAccess from "../fixtures/people-data.json"

describe ('Creating bank account and adding personal information', () => {  // Criando conta bancária e adicionando informações pessoais


    // Acessando a conta pela primeira vez
    // Accessing the account for the first time

//      it('Creating a bank account for the first time by accessing the login page', () => {  // Criando uma conta  bancária pela primeira vez acessando a página de login
//         loginPage.visitLoginPage()
//         createUser.createAccountLink.click()
//         cy.contains('h1', 'Sign Up').should('be.visible')
//         createUser.createAccount(
//             dataAccess.userMarge.firstName, 
//             dataAccess.userMarge.lastName, 
//             dataAccess.userMarge.userName, 
//             dataAccess.userMarge.password, 
//             dataAccess.userMarge.password
//         )
//         createUser.signUpButton.click()
//         cy.location('pathname').should('include', 'signin')
//         cy.contains('h1', 'Sign in').should('be.visible')
//         loginPage.login(
//             dataAccess.userMarge.userName,
//             dataAccess.userMarge.password
//         )
//         loginPage.singInButton.click()
//         cy.contains('h6', 'Marge').should('be.visible')

//         bankAccounts.createAccountBankButton.click()
//         bankAccounts.bankDetails(
//             dataAccess.userMarge.bankAccounts,
//             dataAccess.userMarge.routingNumber,
//             dataAccess.userMarge.accountNumber
//         )
//         bankAccounts.saveButtonAccount.click()
//         bankAccounts.doneButtonAccount.click({force: true})
//         cy.contains('h6', 'Account Balance').should("be.visible")
//   })

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
    
    it('Changing account details', () =>{  // Alterando dados da conta
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

})