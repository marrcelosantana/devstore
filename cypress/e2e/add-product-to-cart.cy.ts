describe('add prodcut to cart', () => {
  beforeEach(() => {
    // Visite a home page antes de tudo.
    cy.visit('http://localhost:3000')
  })

  it('should be able to navigate to the product page and add it to the car', () => {
    // Clique no primeiro produto.
    cy.get('a[href^="/product"]').first().click()
    // Clique no botão "Adicionar ao carrinho".
    cy.location('pathname').should('include', '/product')
    // Adicione o produto ao carrinho.
    cy.contains('Adicionar ao carrinho').click()
    // Confira se o carrinho foi atualizado.
    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    // Clique no primeiro produto.
    cy.get('a[href^="/product"]').first().click()
    // Clique no botão "Adicionar ao carrinho".
    cy.location('pathname').should('include', '/product')
    // Adicione o mesmo produto ao carrinho duas vezes.
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()
    // Confira se o número de produtos no carrinho ainda continua 1.
    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {
    // Pesquise por um produto.
    cy.get('input[name="q"]').type('moletom').parent('form').submit()
    // Clique no primeiro produto.
    cy.get('a[href^="/product"]').first().click()
    // Clique no botão "Adicionar ao carrinho".
    cy.location('pathname').should('include', '/product')
    // Adicione o mesmo produto ao carrinho duas vezes.
    cy.contains('Adicionar ao carrinho').click()
    // Carrinho deve ser atualizado.
    cy.contains('Cart (1)').should('exist')
  })
})
