import loginPage from "../pages/login-page"
import homePage from "../pages/home-page"
import createUser from '../pages/create-user'
import dataAccess from "../fixtures/people-data.json"

describe ('Creating bank account and adding personal information', () => {


    //Acessando a conta pela primeira vez
    //Accessing the account for the first time
     it('Creating an account and accessing the login pagee', () => {
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

        homePage.createAccountBankButton.click()
        homePage.bankDetails(
            dataAccess.userMarge.bankAccounts,
            dataAccess.userMarge.routingNumber,
            dataAccess.userMarge.accountNumber
        )
        homePage.saveButtonAccount.click()
        homePage.doneButtonAccount.click({force: true})
        cy.contains('h6', 'Account Balance').should("be.visible")
  })

    //Acessando a conta já com dados cadastrados
    //Accessing the account with already registered data
    // it('Creating bank account', () =>{
    //     loginPage.visitLoginPage()

    //     loginPage.login(
    //         dataAccess.userMarge.userName,
    //         dataAccess.userMarge.password
    //     )
    //     loginPage.singInButton.click()
    //     cy.contains('h6', 'Marge').should('be.visible')

    // })
})