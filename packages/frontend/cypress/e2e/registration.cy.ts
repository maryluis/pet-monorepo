describe('User Registration', () => {
  beforeEach(() => {
    // Перехоплюємо відповідь на певний запит
    cy.intercept('POST', '/api/register', (req) => {
      req.reply((res) => {
        // Якщо відповідь має статус 500, змінюємо її
        if (res.statusCode === 500) {
          res.body = { error: 'error 500' };
        }
      });
    }).as('registerRequest');
  });

  it('should successfully register a new user', () => {
    cy.fixture('user_registration').then((userData) => {
      cy.visit('/registration');
      cy.get('input[name="nickName"]').type(userData.nickName);
      cy.get('input[name="password"]').type(userData.password);
      cy.get('input[name="confirmPassword"]').type(userData.password);
      cy.contains('button', 'Create').click();
      cy.url().should('eq', 'http://localhost:5173/profile');
      cy.contains(`Hello, ${userData.nickName}`).should('be.visible');
    });
  });
});
