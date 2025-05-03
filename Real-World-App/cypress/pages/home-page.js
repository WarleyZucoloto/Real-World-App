class homePage {
    
    get createAccountBankButton() {
        return cy.get ("[data-test='user-onboarding-next']")
    }

    get bankNameField() {
        return cy.get ("[id='bankaccount-bankName-input']")
    }

    get bankNameAlert() {
        return cy.get ("[id='bankaccount-bankName-input-helper-text']")
    }

    get routingNumber() {
        return cy.get ("[id='bankaccount-routingNumber-input']")
    }

    get routingNumberAlert() {
        return cy.get ("[id='bankaccount-routingNumber-input-helper-text']")
    }

    get accountNumber() {
        return cy.get ("[id='bankaccount-accountNumber-input']")
    }

    get accountNumberAlert() {
        return cy.get ("[id='bankaccount-accountNumber-input-helper-text']")
    }

    get saveButtonAccount() {
        return cy.get ("[data-test='bankaccount-submit']")
    }

    get doneButtonAccount() {
        return cy.get ("[data-test='user-onboarding-next']")
    }

    bankDetails(bankName, routingNumber, accountNumber) {
        if (bankName) this.bankNameField.type(bankName)
        if (routingNumber) this.routingNumber.type(routingNumber)
        if (accountNumber) this.accountNumber.type(accountNumber)
    }

}
export default new homePage ()