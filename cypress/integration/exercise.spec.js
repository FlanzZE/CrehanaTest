describe('Navigation to Tickets', () => {
  it('should navigate to the country detail page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="/tickets"]').click()
    cy.url().should('include', '/tickets')
    cy.get('h2').contains('Tickets')
  })
})

describe('Tickets test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/tickets')
  })
  it('display initial values test', () => {
    cy.get('textarea#1').should('have.value', '25,25,50')
  })
  it('should show yes', () => {
    cy.get('textarea#1').type(",25,25").should('have.value', '25,25,50,25,25')
    cy.get('#result').should('have.text', 'Hay cambio')
  })
  it('should show NO', () => {
    cy.get('textarea#1').type(",100,50")
    cy.get('#result').should('have.text', 'No hay cambio')
  })
})