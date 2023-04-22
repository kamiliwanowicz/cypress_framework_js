import {
  ProductLocators
} from "../locators/gymSharkLocators";

const productLocators = new ProductLocators();

export default class ProductPage {
  static verifyDetails(productName, productFit, productColour, productPrice) {
    productLocators.productName().should("have.text", productName);
    productLocators.productPrice().should("have.text", productPrice);

    // Product Fit is not visible on product page for all-size items
    cy.elementExists(productLocators.productFitSelector()).then(
      (productFitElement) => {
        if (productFitElement) {
          productLocators.productFit().should("have.text", productFit);
        }
      }
    );

    // Colour is not visible on product page for single-colour items
    cy.elementExists(productLocators.productColourSelector()).then(
      (productColourElement) => {
        if (productColourElement) {
          productLocators.productColour().should("have.text", productColour);
        }
      }
    );
  }

  static selectRandomAvailableSize() {
    /*Select a random size from in-stock sizes. Return the selected size. */
    cy.wait(1500);
    return productLocators.getAvailableSizesList().then(($sizes) => {
      const availableSizes = $sizes.toArray().map(($el) => $el.textContent);
      const randomIndex = Math.floor(Math.random() * availableSizes.length);
      const randSize = availableSizes[randomIndex];
      cy.log(`AVAILABLE SIZES: ${availableSizes}`);
      cy.log(`RANDOM SIZE SELECTED: ${randSize}`);
      return cy.get(`button[data-locator-id="pdp-size-${randSize}-select"]`)
        .click({ force: true })
        .then(() => {
          return {
            randSize
          };
        });
    });
  }

  static addToBag() {
    productLocators.addToBag().click({ force: true })
}
}
