describe('Navigation', () => {
  it('should navigate to the country detail page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="/country/AD"]').click()
    cy.url().should('include', '/country')
    cy.get('h1').contains('Detalle de pais:')
  })
})

describe('GQL Response', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('displays items from gql response', () => {
    cy.get('article.chakra-linkbox').should('have.length', 250)
  })
  it('should filter by currency', () => {
    cy.get('select[name*="Currency"]').select("EUR")
    cy.get('article.chakra-linkbox').should('have.length', 35)
  })
  it('should filter by continent', () => {
    cy.get('select[name*="Continent"]').select("EU")
    cy.get('article.chakra-linkbox').should('have.length', 53)
  })
  it('should filter by code', () => {
    cy.get('input[type*="text"]').type("AD")
    cy.get('article.chakra-linkbox').should('have.length', 1)
  })
})