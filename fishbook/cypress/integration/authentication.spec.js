context('Authentication', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200')
    })
  
    it('Login into the system', () => {
      cy.location().should((location) => {
        expect(location.href).to.eq("http://localhost:4200/login")
      });

      cy.get('#email').type('test@test.test');
      cy.get('#password').type('testtest');

      cy.get('.btn--success').click();
    })
});