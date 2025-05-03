class BankAccounts {

    get bankNameField() {
        return cy.get ("[id='bankaccount-bankName-input']").should('be.visible')
    }

    get bankNameAlert() {
        return cy.get ("[id='bankaccount-bankName-input-helper-text']").should('be.visible')
    }

    get routingNumber() {
        return cy.get ("[id='bankaccount-routingNumber-input']").should('be.visible')
    }

    get routingNumberAlert() {
        return cy.get ("[id='bankaccount-routingNumber-input-helper-text']").should('be.visible')
    }

    get accountNumber() {
        return cy.get ("[id='bankaccount-accountNumber-input']").should('be.visible')
    }

    get accountNumberAlert() {
        return cy.get ("[id='bankaccount-accountNumber-input-helper-text']").should('be.visible')
    }

    // botões da pagina após primeiro acesso - cadastro conta bancária
    // page buttons after first access - bank account registration

    get createAccountBankButton() {
        return cy.get ("[data-test='user-onboarding-next']").should('be.visible')
    }

    get saveButtonAccount() {
        return cy.get ("[data-test='bankaccount-submit']").should('be.visible')
    }

    get doneButtonAccount() {
        return cy.get ("[data-test='user-onboarding-next']").should('be.visible')
    }

    // botões da pagina de conta bancária
    // bank account page buttons

    get saveButton () {
        return cy.get("[data-test='bankaccount-submit']")
    }

    get createButton () {
        return cy.get("[data-test='bankaccount-new']")
    }

    get deleteButton () {
        return cy.get("[data-test='bankaccount-delete']")
    }

    bankDetails(bankName, routingNumber, accountNumber) {
        if (bankName) this.bankNameField.type(bankName)
        if (routingNumber) this.routingNumber.type(routingNumber)
        if (accountNumber) this.accountNumber.type(accountNumber)
    }

} 

export default new BankAccounts()