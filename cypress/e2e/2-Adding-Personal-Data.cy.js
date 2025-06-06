import bankAccounts from "../pages/bank-accounts"
import dataAccess from "../fixtures/people-data.json"
import '../support/commands'
import menuPage from "../pages/menu-page"

describe('Creating bank account and adding personal information', () => {  // Criando conta bancária e adicionando informações pessoais

  beforeEach(() => {
    cy.task('db:seed')
  })

  it('Creating a bank account for the first time by accessing the login page', () => {  // Criando uma conta bancária pela primeira vez acessando a página de login

    cy.signUpAndLogin({
      firstName: dataAccess.userMarge.firstName,
      lastName: dataAccess.userMarge.lastName,
      userName: dataAccess.userMarge.userName,
      password: Cypress.env('margePassword')
    })
    cy.contains('h2', 'Get Started with Real World App').should('be.visible')

    bankAccounts.createAccountBankButton.click()

    bankAccounts.bankDetails(
      dataAccess.userMarge.bankAccounts,
      dataAccess.userMarge.routingNumber,
      dataAccess.userMarge.accountNumber
    )
    bankAccounts.saveButtonAccount.click()
    bankAccounts.doneButtonAccount.click({ force: true })
    cy.contains('h6', 'Account Balance').should("be.visible")
  })

  describe('Tests with existing user and account creation', () => {  // Testes com usuário existente e criação de cont

    beforeEach(() => {
      cy.loginApp(dataAccess.userHommer.userName, Cypress.env('hommerPassword'), dataAccess.userHommer.firstName)
    })

    it('Creating a new bank account from main menu', () => {  // Criando uma nova conta bancária no menu principal

      cy.contains('h6', dataAccess.userHommer.firstName).should('be.visible')

      menuPage.bankAccountsMenu.click()
      cy.contains('h2', 'Bank Accounts')
      bankAccounts.createAccountBankButton.click()

      bankAccounts.bankDetails(
        dataAccess.userHommer.bankAccounts,
        dataAccess.userHommer.routingNumer,
        dataAccess.userHommer.accountNumber
      )
      bankAccounts.saveButtonAccount.click()
      cy.contains('h2', 'Bank Accounts')
    })

    it('Bank name is blank - should display error message', () => {  // Nome do banco está em branco – deve exibir uma mensagem de erro

      cy.goToBankAccountsPage()
      bankAccounts.createButton.click()
      cy.assertBankAccountFormInvalid(
        '',
        dataAccess.userHommer.routingNumber,
        dataAccess.userHommer.accountNumber,
        'Enter a bank name',
        bankAccounts.bankNameField
      )
    })

    it('Bank name with less than 5 characters - should display error message', () => {  // Nome do banco com menos de 5 caracteres – deve exibir mensagem de erro

      cy.goToBankAccountsPage()
      bankAccounts.createButton.click()
      cy.assertBankAccountFormInvalid(
        '1234',
        dataAccess.userHommer.routingNumber,
        dataAccess.userHommer.accountNumber,
        'Must contain at least 5 characters',
        bankAccounts.bankNameField
      )
    })

    it('Routing number with less than 9 characters - should display error message', () => {  // Número de roteamento com menos de 9 caracteres – deve exibir mensagem de erro

      cy.goToBankAccountsPage()
      bankAccounts.createButton.click()
      cy.assertBankAccountFormInvalid(
        dataAccess.userHommer.bankAccounts,
        '12345678',
        dataAccess.userHommer.accountNumber,
        'Must contain a valid routing number',
        bankAccounts.routingNumberField
      )
    })

    it('Routing number with more than 9 characters - should display error message', () => {  // Número de roteamento com mais de 9 caracteres – deve exibir mensagem de erro

      cy.goToBankAccountsPage()
      bankAccounts.createButton.click()
      cy.assertBankAccountFormInvalid(
        dataAccess.userHommer.bankAccounts,
        '1234567890',
        dataAccess.userHommer.accountNumber,
        'Must contain a valid routing number',
        bankAccounts.routingNumberField
      )
    })

    it('Account number with less than 9 digits - should display error message', () => {  // Número da conta com menos de 9 dígitos – deve exibir mensagem de erro

      cy.goToBankAccountsPage()
      bankAccounts.createButton.click()
      cy.assertBankAccountFormInvalid(
        dataAccess.userHommer.bankAccounts,
        dataAccess.userHommer.routingNumber,
        '12345678',
        'Must contain at least 9 digits',
        bankAccounts.accountNumberField
      )
    })

    it('Account number with more than 12 digits - should display error message', () => {  // Número da conta com mais de 12 dígitos – deve exibir mensagem de erro

      cy.goToBankAccountsPage()
      bankAccounts.createButton.click()
      cy.assertBankAccountFormInvalid(
        dataAccess.userHommer.bankAccounts,
        dataAccess.userHommer.routingNumber,
        '1234567890123',
        'Must contain no more than 12 digits',
        bankAccounts.accountNumberField
      )
    })
  })

  after(async () => {
    cy.log('Limpando dados: Resetando o database via task "db:seed"...')
    try {
      await cy.task('db:seed')
      cy.log('Database resetado com sucesso. O ambiente está limpo para a próxima execução.')
    } catch (error) {
      cy.log(`Erro ao resetar o database via task "db:seed": ${error.message}`)
    }
  })
})


// Caso isolado devido a condição de validação que não estava passando de forma legal pelo beforEach
// Isolated case due to a validation condition that was not legally passing through beforEach
describe('Routing Number Validation', () => {  // Validação de número de roteamento

  beforeEach(() => {
    cy.task('db:seed')
    cy.loginApp(dataAccess.userHommer.userName, Cypress.env('hommerPassword'), dataAccess.userHommer.firstName)
  })

  it('Routing number is blank - should display error message', () => {  // Número de roteamento em branco - deve exibir mensagem de erro

    menuPage.bankAccountsMenu.click()
    cy.contains('h2', 'Bank Accounts').should('be.visible')
    bankAccounts.createButton.click()
    bankAccounts.routingNumber.click({ force: true })
    bankAccounts.bankNameField.click({ force: true })
    bankAccounts.bankDetails(
      dataAccess.userHommer.bankAccounts,
      '', // Campo da conta de roteamento vazio
      dataAccess.userHommer.accountNumber
    )
    bankAccounts.saveButton.should('be.disabled')
    bankAccounts.routingNumberAlert.should('contain', 'Enter a valid bank routing number')
  })
  after(async () => {
    cy.log('Limpando dados após teste isolado de Routing Number.')
    try {
      await cy.task('db:seed')
      cy.log('Database resetado após teste isolado.')
    } catch (error) {
      cy.log(`Erro ao resetar o database via task "db:seed" no bloco isolado: ${error.message}`)
    }
  })
})