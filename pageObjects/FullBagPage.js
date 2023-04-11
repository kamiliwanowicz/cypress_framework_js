class FullBagPage
{
yourBagTitle() {return cy.get('h1').contains('Your bag')}
productName() {return cy.get('*[class^="product-card_title"]')}
productFit() {return cy.get('*[class^="product-card_featured-selection"]')}
productColourAndSize() {return cy.get('*[class^="product-card_selected-option"]')}
priceOneProduct() {return cy.get('div[class^="cart-page_right"] div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])')}
priceTotal() {return cy.get('div[class^="cart-page_right"] p[data-locator-id^="bag-totalValue-read"]')}
priceSelectedItem() {return cy.get('div[class^="cart-page_items"] p[class^="product-card_price"]')}
checkoutButton() {return cy.get('a').contains('Checkout securely')}

}

export default FullBagPage;