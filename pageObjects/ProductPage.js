class ProductPage
{
productName() {return cy.get('*[class^="product-information_title"]')}
productFit() {return cy.get('*[class^="product-information_fit"]')}
productFitSelector() {return '*[class^="product-information_fit"]'}
productColour() {return cy.get('*[class^="variants_colour"]').find('span')}
productColourSelector() {return '*[class^="variants_colour"] span'}
productPrice() {return cy.get('*[class^="product-information_price"]')}
sizes() {return cy.get('*[class^="add-to-cart_sizes"] button')}
addToBag() {return cy.get('button[data-locator-id=pdp-addToBag-submit]')}
iconBag() {return cy.get('.icon-bag')}
cartCount() {return cy.get('#cart-count')}

}

export default ProductPage;