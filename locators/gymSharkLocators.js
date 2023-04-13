class CheckoutLocators
{
productNameAndColour() {return cy.get('*[class^="product__description__name order-summary"]')}
productFit() {return cy.get('.product__description > :nth-child(3)')}
productSize() {return cy.get('.product__description__variant')}
priceOneProduct() {return cy.get('.product__price > .order-summary__emphasis')} 
priceSubtotal() {return cy.get('.total-line__price > .order-summary__emphasis')}
priceTotal() {return cy.get('.payment-due__price')}
checkoutButton() {return cy.get('a').contains('Checkout securely')}

}

class FullBagLocators
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

class GymSharkLocators {
    constructor() {
      this.url_ = "https://uk.shop.gymshark.com/";
      this.acceptCookies_ = '#onetrust-accept-btn-handler'
      this.mainMenu_ = "button[aria-label='Main menu']"
      this.menCategory_ = '[aria-controls="panel-men"]'
      this.newReleases_ = "a[href='https://uk.shop.gymshark.com/collections/new-releases/mens'] h3"
      this.itemsList_ = '*[class^="product-grid_grid"]'
    }
  
    getHomepage() { cy.visit(this.url_); return this }
    acceptCookies() { cy.get(this.acceptCookies_).click(); return this }
    openMainMenu() { cy.get(this.mainMenu_).click(); return this }
    goToMen() { cy.get(this.menCategory_).click(); return this }
    goToNewReleases() { cy.get(this.newReleases_).click({ force: true }); return this }
    itemsList() { return cy.get(this.itemsList_).find('article'); }
  }

  class ProductLocators
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
  
  class YourBagLocators
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

  export default {CheckoutLocators, FullBagLocators, GroceryShop, GymSharkLocators, ProductLocators, YourBagLocators}