class CheckoutPage
{
productNameAndColour() {return cy.get('*[class^="product__description__name order-summary"]')}
productFit() {return cy.get('.product__description > :nth-child(3)')}
productSize() {return cy.get('.product__description__variant')}
priceOneProduct() {return cy.get('.product__price > .order-summary__emphasis')} 
priceSubtotal() {return cy.get('.total-line__price > .order-summary__emphasis')}
priceTotal() {return cy.get('.payment-due__price')}
checkoutButton() {return cy.get('a').contains('Checkout securely')}

}

export default CheckoutPage;