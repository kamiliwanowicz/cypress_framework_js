import {
  CheckoutLocators,
  FullBagLocators,
  GroceryShop,
  GymSharkLocators,
  ProductLocators,
  YourBagLocators,
} from "../locators/gymSharkLocators";

const gymSharkLocators = new GymSharkLocators();

export default class CoreMethods {
  static dontLogXHRCallsInTestRunner() {
    /*Skip the XHR calls in test runner logs.*/
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  }

  static goToMensNewReleases() {
    /*Navigate to Mens New Releases from an empty browser window.*/
    gymSharkLocators
      .getHomepage()
      .acceptCookies()
      .openMainMenu()
      .goToMen()
      .goToNewReleases();
  }

  static forbiddenPageWorkaround() {
    /* If 404 page is displayed, refresh the page. */
    cy.wait(2000);
    cy.get('*[class^="error_page-not-found"]')
      .should(Cypress._.noop)
      .then(($el) => {
        if ($el.length) {
          cy.reload();
        }
      });
  }
  static getRandomNumberInRange(range) {
    /* Get a random number in a given range */
    const randomElement = Math.floor(Math.random() * range);
      };
}
