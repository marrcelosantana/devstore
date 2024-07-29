describe('search products', () => {
  it('should be able search for products', () => {
    // Visite a home page antes de tudo.
    cy.visit('http://localhost:3000')
    // Pesquise por um produto.
    cy.get('input[name="q"]').type('moletom').parent('form').submit()
    // Confira se a URL mudou para /
    cy.location('pathname').should('include', '/search')
    // Confira se a query string foi adicionada.
    cy.location('search').should('include', 'q=moletom')
    // Clique no primeiro produto.
    cy.get('a[href^="/product"]').should('exist')
  })
})
