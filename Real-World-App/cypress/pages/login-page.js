class LoginPage {

    visitLoginPage() {
        cy.visit ('http://localhost:3000/signin')
    }

    get userNameField() {
        return cy.get ("[id='username-label']")
    }

    get passwordField() {
        return cy.get ("[id='password']")
    }

    get singInButton() {
        return cy.get ("[type='submit']")
    }

    get userHelperAlert() {
        return cy.get ("[id='username-helper-text']")
    }

    get passwordHelperAlert() {
        return cy.get ("[id='username-helper-text']")
    }

    get signInAlertError() {
        return cy.get ("[data-test='signin-error']")
    }

    get dataInvalid() {
        return cy.get ('.css-1pxa9xg-MuiAlert-message')
    }

    login(username, password) {
        if (username) this.userNameField.type(username)
        if (password) this.passwordField.type(password)
    }
}

export default new LoginPage()