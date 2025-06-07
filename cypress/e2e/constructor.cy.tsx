describe('Site accessibility', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  describe('Modal windows', () => {
    beforeEach(() => {
      cy.get('[data-cy=sauce2]').click();
      cy.get('[data-cy=modal]').as('modal');
    });

    it('should open the modal window', () => {
      cy.get('@modal').contains('Соус барбекю').should('exist');
    });

    it('should close the modal by clicking the close button', () => {
      cy.get('[data-cy=modal] button').click();
      cy.get('@modal').should('not.exist');
    });

    it('should close the modal by clicking on the overlay', () => {
      cy.get('body').click(0, 0);
      cy.get('@modal').should('not.exist');
    });
  });

  describe('Adding ingredients', () => {
    it('should add a bun to the constructor', () => {
      cy.get('[data-cy=bun1]').contains('Добавить').click();
      cy.get('[data-cy=constructor-bun-up]').contains('Булка небесная').should('exist');
      cy.get('[data-cy=constructor-bun-down]').contains('Булка небесная').should('exist');
    });

    it('should add meat to the constructor', () => {
      cy.get('[data-cy=main1]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredient-main1]').contains('Котлета классическая').should('exist');
    });

    it('should add sauce to the constructor', () => {
      cy.get('[data-cy=sauce1]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredient-sauce1]').contains('Соус сырный').should('exist');
    });
  });

  describe('Placing an order', () => {
    beforeEach(() => {
      window.localStorage.setItem('refreshToken', JSON.stringify('testRefreshToken'));
      cy.setCookie('accessToken', 'testAccessToken');

      cy.intercept('GET', '**/api/auth/user', { fixture: 'user' }).as('authCheck');

      cy.intercept('POST', '**/api/orders', { fixture: 'order-response' }).as('createOrder');

      cy.visit('/');

      cy.wait('@authCheck');
    });

    it('should create an order with correct flow', () => {
      cy.get('[data-cy=bun1]').contains('Добавить').click();
      cy.get('[data-cy=sauce1]').contains('Добавить').click();
      cy.get('[data-cy=main1]').contains('Добавить').click();

      cy.get('[data-cy=constructor-bun-up]').should('exist');
      cy.get('[data-cy=constructor-bun-down]').should('exist');
      cy.get('[data-cy=constructor-ingredient-main1]').should('exist');
      cy.get('[data-cy=constructor-ingredient-sauce1]').should('exist');

      cy.get('[data-cy="order-button"]').click();

      cy.wait('@createOrder');

      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=order-number]').should('contain', '77123');
      cy.get('[data-cy=modal] button').click();
      cy.get('[data-cy=modal]').should('not.exist');

      cy.get('[data-cy=constructor-bun-up]').should('contain', 'Выберите булки');
      cy.get('[data-cy=constructor-bun-down]').should('contain', 'Выберите булки');
      cy.get('[data-cy=constructor-empty]').should('exist');
    });
  });
});
