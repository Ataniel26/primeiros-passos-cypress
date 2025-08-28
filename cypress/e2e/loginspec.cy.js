describe('Orange HRM - Login', () => {
  const s = {
    usernameFld: "input[name='username']",
    passwordFld: "input[name='password']",
    loginButton: "button[type='submit']",
    topBarTitle: ".oxd-topbar-header-breadcrumb .oxd-text",
    invalidAlertText: ".oxd-alert-content .oxd-text", // ou ".oxd-alert-content-text"
  };

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('Login - success', () => {
    cy.get(s.usernameFld).type('Admin');
    cy.get(s.passwordFld).type('admin123');
    cy.get(s.loginButton).click();

    cy.location('pathname', { timeout: 10000 })
      .should('eq', '/web/index.php/dashboard/index');

    cy.get(s.topBarTitle).should('contain', 'Dashboard');
  });

  it('Login - fail', () => {
    cy.get(s.usernameFld).type('Test');
    cy.get(s.passwordFld).type('Test');
    cy.get(s.loginButton).click();

    // faz a asserção para evitar timeout e garantir o texto do erro
    cy.get('.oxd-alert-content', { timeout: 10000 })
      .should('contain', 'Invalid credentials');
    // alternativamente:
    // cy.get(s.invalidAlertText).should('contain', 'Invalid credentials');
  });
});
