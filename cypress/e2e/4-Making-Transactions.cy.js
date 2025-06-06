import homePage from "../pages/home-page"
import dataAccess from "../fixtures/people-data.json"
import '../support/commands'

// Cenário: Criando e validando transações bancárias entre pessoas
// Scenario: Creating and validating banking transactions between people

describe('Bank Transactions', () => { // Transações Bancárias

    beforeEach(() => {

        cy.task('db:seed')
        cy.loginApp(
            dataAccess.userHommer.userName,
            Cypress.env('hommerPassword'),
            dataAccess.userHommer.firstName
        )

        cy.contains('h6', 'Hommer').should('be.visible').click()
        homePage.newTransaction.click()
        cy.location('pathname').should('include', 'transaction/new')
    })

    it('should create a valid bank transaction', () => { // deve criar uma transação bancária válida

        homePage.searchPeople.type(dataAccess.userLisa.firstName)
        homePage.userListLisa.click()
        homePage.amount.type('65')
        homePage.description.type('Para comprar a fralda da Maggie')
        homePage.payButton.click()

        cy.contains('h2', 'Paid').should('be.visible')
    })

    it('should not allow transaction with empty amount', () => { // não deve permitir transação com quantia em branco

        homePage.searchPeople.type(dataAccess.userLisa.firstName)
        homePage.userListLisa.click()
        homePage.amount.clear()
        homePage.description.type('Compra do presente')

        cy.contains('p', 'Please enter a valid amount').should('be.visible')
        homePage.payButton.should('be.disabled')
        homePage.requestButton.should('be.disabled')

    })

    it('should not allow transaction with amount 0', () => { // não deve permitir transação com quantia igual a 0

        homePage.searchPeople.type(dataAccess.userLisa.firstName)
        homePage.userListLisa.click()
        homePage.amount.clear().type('0')
        homePage.description.type('Compra do leite')

        cy.contains('p', 'Quantity must be greater than 0').should('be.visible')
        homePage.payButton.should('be.disabled')
        homePage.requestButton.should('be.disabled')
    })

    it('should not allow transaction with empty description', () => { // não deve permitir transação com descrição vazia

        homePage.searchPeople.type(dataAccess.userLisa.firstName)
        homePage.userListLisa.click()
        homePage.amount.type('150')
        homePage.description.clear()
        homePage.amount.click() // Clique para "trigger" a validação se a descrição for obrigatória

        cy.contains('p', 'Please enter a note').should('be.visible')
        homePage.payButton.should('be.disabled')
        homePage.requestButton.should('be.disabled')
    })

    it('should show error if account balance is not enough', () => { // deve mostrar erro se o saldo da conta não for suficiente
      
        homePage.searchPeople.type(dataAccess.userLisa.firstName)
        homePage.userListLisa.click()
        homePage.amount.type('1000000000') // valor alto, simulando saldo insuficiente
        homePage.description.type('Tentando enviar mais do que tenho')
        homePage.payButton.should('be.disabled').click()
        homePage.requestButton.should('be.disabled')
        cy.contains('Saldo insuficiente').should('be.visible')
    })
})