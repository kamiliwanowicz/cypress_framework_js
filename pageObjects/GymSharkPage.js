
class GymSharkPage {
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

  export default GymSharkPage;