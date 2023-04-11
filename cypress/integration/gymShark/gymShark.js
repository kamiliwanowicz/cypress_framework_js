import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import GymSharkPage from "../../../pageObjects/GymSharkPage";
import ProductPage from "../../../pageObjects/ProductPage";
import YourBagPage from "../../../pageObjects/YourBagPage";
import FullBagPage from "../../../pageObjects/FullBagPage";
import CheckoutPage from "../../../pageObjects/CheckoutPage";

const gymSharkPage = new GymSharkPage();
const productPage = new ProductPage();
const yourBagPage = new YourBagPage();
const fullBagPage = new FullBagPage();
const checkoutPage = new CheckoutPage();
let productName;
let productFit;
let productColour; 
let productPrice; 
let randSize;

Given("I go to Mens New Releases", () => {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
  gymSharkPage.getHomepage().acceptCookies().openMainMenu().goToMen().goToNewReleases()
});

When("I add a random item to the basket", () => {
  gymSharkPage
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
    
      productPage.productName().should("have.text", productName);
      productPage.productPrice().should("have.text", productPrice);

      // Product Fit is not visible on product page for all-size items
      cy.elementExists(productPage.productFitSelector()).then(
        (productFitElement) => {
          if (productFitElement) {
            productPage.productFit().should("have.text", productFit);
          }
        }
      );

      // Colour is not visible on product page for single-colour items
      cy.elementExists(productPage.productColourSelector()).then(
        (productColourElement) => {
          if (productColourElement) {
            productPage.productColour().should("have.text", productColour);
          }
        }
      );

    // Select a random available size
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
  productPage.addToBag().click({ force: true })
});

Then("I verify that the item has been added successfully", () => {
  // Verify the values on Summary page
  yourBagPage.yourBagTitle().should('be.visible')
  yourBagPage.productName().should('have.text', productName)
    if (productFit) {
      yourBagPage.productFit().contains(productFit, { matchCase: false })
  }
  yourBagPage.productColourAndSize().contains(productColour, { matchCase: false })
  yourBagPage.productColourAndSize().contains(randSize, { matchCase: false })
  yourBagPage.priceOneProduct().should('include.text', productPrice)
  yourBagPage.priceTotal().should('include.text', productPrice)
  yourBagPage.priceSelectedItem().should('include.text', productPrice)

  // Close the summary and verify the number on the basket icon
  yourBagPage.closeXIcon().click()
  productPage.cartCount().should('have.text', '1')
  
  // Open basket and re-verifythe  values
  productPage.iconBag().click({ force: true })
  yourBagPage.productName().should('include.text', productName)
  if (productFit) {
  yourBagPage.productFit().contains(productFit, { matchCase: false })
  }
  yourBagPage.productColourAndSize().contains(productColour, { matchCase: false })
  yourBagPage.productColourAndSize().contains(randSize, { matchCase: false })
  yourBagPage.priceOneProduct().should('include.text', productPrice)
  yourBagPage.priceTotal().should('include.text', productPrice)
  yourBagPage.priceSelectedItem().should('include.text', productPrice)

  // View full bag and verify the values again
  yourBagPage.viewFullBag().click()
  fullBagPage.productName().should('include.text', productName)
  if (productFit) {
  fullBagPage.productFit().contains(productFit, { matchCase: false })
  }
  fullBagPage.productColourAndSize().contains(productColour, { matchCase: false })
  fullBagPage.productColourAndSize().contains(randSize, { matchCase: false })
  fullBagPage.priceOneProduct().should('include.text', productPrice)
  fullBagPage.priceTotal().should('include.text', productPrice)
  fullBagPage.priceSelectedItem().should('include.text', productPrice)

});

Then("I verify values on checkout", () => {
  // Start checkout and verify the values again
  fullBagPage.checkoutButton().click({ force: true })
  checkoutPage.productNameAndColour().contains(productName, { matchCase: false })
  checkoutPage.productNameAndColour().contains(productColour, { matchCase: false })
  if (productFit) {checkoutPage.productFit().should('include.text', productFit)}
  checkoutPage.priceOneProduct().should('include.text', productPrice)
  checkoutPage.priceSubtotal().should('include.text', productPrice)
  checkoutPage.priceTotal().should('include.text', productPrice)

});



