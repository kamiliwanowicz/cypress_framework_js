class GroceryShop
{
productSearch() {return cy.get('.search-keyword')}
visibleProducts() {return cy.get('.product:visible')}
productsList() {return cy.get('.products').find('.product')}
getCart() {return cy.get('img[alt=Cart]')}
cartProductsList() {return cy.get('.cart .cart-preview.active').find('.product-name')}
proceedToCheckout() {return cy.contains('PROCEED TO CHECKOUT')}
productSummaryTableRow(row) {return cy.get('.products #productCartTables tbody').find('tr').eq(row)}
productImageSrc(row) {return cy.get('.products #productCartTables tbody').find('tr').eq(row).find('.product-image')}
  
}

export default GroceryShop;