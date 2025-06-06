class CreateAccount {

    visitCreateAccountPage() {
        cy.visit ('http://localhost:3000/signup')
    }

    get createAccountLink() {
        return cy.get("[data-test='signup']")
    }

    get firstNameField() {
        return cy.get("[id='firstName']")
    }

    get firstNameAlert() {
        return cy.get("[id='firstName-helper-text']")
    }

    get lastNameField() {
        return cy.get("[id='lastName']")
    }

    get lastNameAlert() {
        return cy.get("[id='lastName-helper-text']")
    }

    get userNameField() {
        return cy.get("[id='username']")
    }

    get userNameAlert() {
        return cy.get("[id='username-helper-text']")
    }

    get passwordField() {
        return cy.get("[id='password']")
    }

    get passwordAlert() {
        return cy.get("[id='password-helper-text']")
    }

    get confirmPasswordField() {
        return cy.get("[id='confirmPassword']")
    }

    get confirmPasswordAlert() {
        return cy.get("[id='confirmPassword-helper-text']")
    }

    get accessAccountExists() {
        return cy.get("['href='/signin']")
    }

    get signUpButton() {
        return cy.get("[type='submit']")
    }

    createAccount(firstName, lastName, userName, password, confirmPassword) {
        if (firstName) this.firstNameField.type(firstName)
        if (lastName) this.lastNameField.type(lastName)
        if (userName) this.userNameField.type(userName)
        if (password) this.passwordField.type(password)
        if (confirmPassword) this.confirmPasswordField.type(confirmPassword)
    }

} 

export default new CreateAccount ()