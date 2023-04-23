class CheckoutLocators {
productNameAndColour() {return cy.get('*[class^="product__description__name order-summary"]')}
productFit() {return cy.get('.product__description > :nth-child(3)')}
productSize() {return cy.get('.product__description__variant')}
priceOneProduct() {return cy.get('.product__price > .order-summary__emphasis')} 
priceSubtotal() {return cy.get('.total-line__price > .order-summary__emphasis')}
priceTotal() {return cy.get('.payment-due__price')}
checkoutButton() {return cy.get('a').contains('Checkout securely')}
}

class FullBagLocators {
yourBagTitle() {return cy.get('h1').contains('Your bag')}
productName() {return cy.get('*[class^="product-card_title"]')}
productFit() {return cy.get('*[class^="product-card_featured-selection"]')}
productColourAndSize() {return cy.get('*[class^="product-card_selected-option"]')}
priceOneProduct() {return cy.get('div[class^="cart-page_right"] div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])')}
priceTotal() {return cy.get('div[class^="cart-page_right"] p[data-locator-id^="bag-totalValue-read"]')}
priceSelectedItem() {return cy.get('div[class^="cart-page_items"] p[class^="product-card_price"]')}
checkoutButton() {return cy.get('a').contains('Checkout securely')}
}

class GymSharkLocators {
    constructor() {
      this.url_ = "https://uk.shop.gymshark.com/";
      this.acceptCookies_ = '#onetrust-accept-btn-handler'
      this.mainMenu_ = "button[aria-label='Main menu']"
      this.menCategory_ = '[aria-controls="panel-men"]'
      this.womenCategory_ = '[aria-controls="panel-women"]'
      this.accessoriesCategory_ = '[aria-controls="panel-accessories"]'
      this.menNewReleases_ = "a[href='https://uk.shop.gymshark.com/collections/new-releases/mens'] h3"
      this.womenNewReleases_ = "a[href='https://uk.shop.gymshark.com/collections/new-releases/womens'] h3"
      this.accessoriesShopAll_ = "button[data-locator-id=navigation-subCategories-shop_all-read]"
      this.accessoriesNewReleases = "section[id='panel-accessories'] a[title='New Releases']"
      this.itemsList_ = '*[class^="product-grid_grid"]'
      this.productFit_ = '*[class^="product-card_product-fit"]'
      this.productColour_ = '*[class^="product-card_product-colour"]'
      this.productPrice_ = '*[class^="product-card_product-price"]'
    }
  
    getHomepage() { cy.visit(this.url_); return this }
    acceptCookies() { cy.get(this.acceptCookies_).click(); return this }
    openMainMenu() { cy.get(this.mainMenu_).click(); return this }
    goToMen() { cy.get(this.menCategory_).click(); return this }
    goToMenNewReleases() { cy.get(this.menNewReleases_).click({ force: true }); return this }
    goToWomen() { cy.get(this.womenCategory_).click(); return this }
    goToWomenNewReleases() { cy.get(this.womenNewReleases_).click({ force: true }); return this }
    goToAccessories() { cy.get(this.accessoriesCategory_).click(); return this }
    goToAccessoriesShopAll() { cy.get(this.accessoriesShopAll_).click(); return this }
    goToAccessoriesNewReleases() {cy.get(this.accessoriesNewReleases).click(); return this }
    itemsList() { return cy.get(this.itemsList_).find('article'); }
    getProductFit(productCard) {return productCard.find(this.productFit_).text()}
    getProductName(productCard) {return productCard.find("a").attr("title")}
    getProductColour(productCard) {return productCard.find(this.productColour_).text()}
    getProductPrice(productCard) {return productCard.find(this.productPrice_).text()}
  }

  class ProductLocators {
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
  getAvailableSizesList() { return cy.get('button[data-locator-id^="pdp-size-"]:not([class*="--out-of-stock"])')}
  
  }
  
  class YourBagLocators {
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


  export default {CheckoutLocators, FullBagLocators, GymSharkLocators, ProductLocators, YourBagLocators}