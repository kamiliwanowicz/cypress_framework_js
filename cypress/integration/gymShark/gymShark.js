import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {FullBagLocators, GymSharkLocators, ProductLocators, YourBagLocators} from "../../../locators/gymSharkLocators";
import CheckoutPage from "../../../pages/checkoutPage";

const gymSharkLocators = new GymSharkLocators();
const productLocators = new ProductLocators();
const yourBagLocators = new YourBagLocators();
const fullBagLocators = new FullBagLocators();

let productName;
let productFit;
let productColour; 
let productPrice; 
let randSize;

Given("I go to Mens New Releases", () => {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
  gymSharkLocators.getHomepage().acceptCookies().openMainMenu().goToMen().goToNewReleases()
});

When("I add a random item to the basket", () => {
  gymSharkLocators
    .itemsList()
    .should("be.visible")
    .then((itemsList) => {
      const len = itemsList.length;

      // Choose a random element from the list
      const randomElement = Math.floor(Math.random() * len);

      // Get the product details for the random element
      const productCard = itemsList.eq(randomElement);
      productName = productCard.find("a").attr("title");
      productFit = productCard
        .find('*[class^="product-card_product-fit"]')
        .text();
      productColour = productCard
        .find('*[class^="product-card_product-colour"]')
        .text();
      productPrice = productCard
        .find('*[class^="product-card_product-price"]')
        .text();

      // Click on the random element and assert the product details
      cy.wrap(productCard).should("be.visible").click();

      // Workaround for an intermittent 404 page
      cy.wait(2000)
      cy.get('*[class^="error_page-not-found"]')
      .should(Cypress._.noop)
      .then($el => {
        if ($el.length) {
          cy.reload()
        }
      })
    
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

    // Select a random available size
    cy.wait(1500)
    cy.get('button[data-locator-id^="pdp-size-"]:not([class*="--out-of-stock"])')
    .then($buttons => {
      const availableSizes = $buttons.toArray().map($el => $el.textContent);
      const randomIndex = Math.floor(Math.random() * availableSizes.length);
      randSize = availableSizes[randomIndex];
      cy.log(`AVAILABLE SIZES: ${availableSizes}`);
      cy.log(`RANDOM SIZE SELECTED: ${randSize}`);
      cy.get(`button[data-locator-id="pdp-size-${randSize}-select"]`).click({ force: true });
});
    });
  productLocators.addToBag().click({ force: true })
});

Then("I verify that the item has been added successfully", () => {
  yourBagLocators.yourBagTitle().should('be.visible')
  yourBagLocators.productName().should('have.text', productName)
    if (productFit) {
      yourBagLocators.productFit().contains(productFit, { matchCase: false })
  }

  // Verify the values on Summary page
  yourBagLocators.productColourAndSize().contains(productColour, { matchCase: false })
  yourBagLocators.productColourAndSize().contains(randSize, { matchCase: false })
  yourBagLocators.priceOneProduct().should('include.text', productPrice)
  yourBagLocators.priceTotal().should('include.text', productPrice)
  yourBagLocators.priceSelectedItem().should('include.text', productPrice)

  // Close the summary and verify the number on the basket icon
  yourBagLocators.closeXIcon().click()
  productLocators.cartCount().should('have.text', '1')
  
  // Open basket and re-verifythe  values
  productLocators.iconBag().click({ force: true })
  yourBagLocators.productName().should('include.text', productName)
  if (productFit) {
  yourBagLocators.productFit().contains(productFit, { matchCase: false })
  }
  yourBagLocators.productColourAndSize().contains(productColour, { matchCase: false })
  yourBagLocators.productColourAndSize().contains(randSize, { matchCase: false })
  yourBagLocators.priceOneProduct().should('include.text', productPrice)
  yourBagLocators.priceTotal().should('include.text', productPrice)
  yourBagLocators.priceSelectedItem().should('include.text', productPrice)

  // View full bag and verify the values again
  yourBagLocators.viewFullBag().click()
  fullBagLocators.productName().should('include.text', productName)
  if (productFit) {
  fullBagLocators.productFit().contains(productFit, { matchCase: false })
  }
  fullBagLocators.productColourAndSize().contains(productColour, { matchCase: false })
  fullBagLocators.productColourAndSize().contains(randSize, { matchCase: false })
  fullBagLocators.priceOneProduct().should('include.text', productPrice)
  fullBagLocators.priceTotal().should('include.text', productPrice)
  fullBagLocators.priceSelectedItem().should('include.text', productPrice)

});

Then("I verify values on checkout", () => {
  // Start checkout and verify the values again
  fullBagLocators.checkoutButton().click({ force: true })
  CheckoutPage.assertDisplayedValues(productName, productColour, productFit, productPrice)
  
});



