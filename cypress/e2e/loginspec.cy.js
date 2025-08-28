describe('Orange HRM - Login', () => {
  const s = {
    usernameFld: 'input[name="username"]',
    passwordFld: 'input[name="password"]',
    loginButton: 'button[type="submit"]',

    dashboardTitle: 'h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module',

    invalidAlertText: '.oxd-alert.oxd-alert--error'

  };

  beforeEach(function () {
    cy.fixture('userData.json').as('users');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('Login - success', function () {
    const { userSuccess } = this.users;

    cy.get(s.usernameFld).type(userSuccess.username);
    cy.get(s.passwordFld).type(userSuccess.password);
    cy.get(s.loginButton).click();

    cy.location('pathname', { timeout: 20000 })
      .should('eq', '/web/index.php/dashboard/index');

    cy.get(s.dashboardTitle, { timeout: 20000 })
      .should('contain.text', 'Dashboard');
  });

  it('Login - fail', function () {
    const { userFail } = this.users;

    cy.get(s.usernameFld).type(userFail.username);
    cy.get(s.passwordFld).type(userFail.password);
    cy.get(s.loginButton).click();

    cy.get(s.invalidAlertText, { timeout: 10000 })
      .should('contain', 'Invalid credentials');
  });
});