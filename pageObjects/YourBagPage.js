class YourBagPage
{
yourBagTitle() {return cy.get('h2').contains('Your bag')}
productName() {return cy.get('*[class^="product-card_title"]')}
productFit() {return cy.get('*[class^="product-card_featured-selection"]')}
productColourAndSize() {return cy.get('*[class^="product-card_selected-option"]')}
priceOneProduct() {return cy.get('div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])')}
priceTotal() {return cy.get('p[data-locator-id^="miniBag-totalValue-read"]')}
priceSelectedItem() {return cy.get('p[class^="product-card_price"]')}
viewFullBag() {return cy.get('a').contains('View full bag')}
checkoutButton() {return cy.get('a').contains('Checkout securely')}
closeXIcon() {return cy.get('.icon-close:visible')}
}

export default YourBagPage;