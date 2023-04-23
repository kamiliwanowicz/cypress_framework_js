import { GymSharkLocators } from "../locators/gymSharkLocators";

const gymSharkLocators = new GymSharkLocators();

export default class CoreMethods {
  static dontLogXHRCallsInTestRunner() {
    /*Skip the XHR calls in test runner logs.*/
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
  }

  static goToNewReleases(type) {
    /*Navigate to Mens New Releases from an empty browser window.*/
    gymSharkLocators.getHomepage().acceptCookies().openMainMenu();
    if (type == "men") {
      gymSharkLocators.goToMen().goToMenNewReleases();
    } else if (type == "women") {
      gymSharkLocators.goToWomen().goToWomenNewReleases();
    } else if (type == "accessories") {
      gymSharkLocators.goToAccessories().goToAccessoriesShopAll().goToAccessoriesNewReleases();
    }
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
}
