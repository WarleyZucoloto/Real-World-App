Cypress.Commands.add('clearNotifications', () => {
  const clear = () => {
    cy.get('body').then($body => {
      const hasNotifications = $body.find("[data-test^='notification-mark-read']").length > 0;

      if (hasNotifications) {
        cy.get("[data-test^='notification-mark-read']", { timeout: 0 })
          .first()
          .click({ force: true });

        cy.wait(300);
        clear(); // chamada recursiva
      } else {
        cy.log('Todas as notificações foram marcadas como lidas.');
      }
    });
  };

  clear(); // inicializa a função
});

Cypress.Commands.add('loginViaApi', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login', // ou o endpoint da sua API
      body: {
        login: 'esx2023@cooki.com.br',
        senha: 'esx2023'
      }
    }).then((resp) => {
      window.localStorage.setItem('token', resp.body.token) // ou como seu app armazena
    })
  })