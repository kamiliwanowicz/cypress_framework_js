import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import {FullBagLocators, GymSharkLocators, ProductLocators, YourBagLocators} from "../../../locators/gymSharkLocators";
import CheckoutPage from "../../../pages/checkoutPage";
import CoreMethods from "../../../pages/coreMethods";
import AllItemsPage from "../../../pages/allItemsPage";
import ProductPage from "../../../pages/productPage";
import SummaryPage from "../../../pages/SummaryPage";

const gymSharkLocators = new GymSharkLocators();
const productLocators = new ProductLocators();
const yourBagLocators = new YourBagLocators();
const fullBagLocators = new FullBagLocators();

let productNameGlobal;
let productFitGlobal;
let productColourGlobal; 
let productPriceGlobal; 
let productSizeGlobal;

Given("I go to Mens New Releases", () => {
  CoreMethods.dontLogXHRCallsInTestRunner()
  CoreMethods.goToMensNewReleases()
});

When("I select a random item", () => {
  AllItemsPage.selectARandomItem().then((productDetails) => {
    const { productName, productFit, productColour, productPrice } = productDetails;
    productNameGlobal = productName
    productFitGlobal = productFit
    productColourGlobal = productColour
    productPriceGlobal = productPrice
  })
  CoreMethods.forbiddenPageWorkaround()
})

When("I verify details on Product page", () => {
  ProductPage.verifyDetails(productNameGlobal, productFitGlobal, productColourGlobal, productPriceGlobal)
  })

When("I select a random size", () => {
  ProductPage.selectRandomAvailableSize().then((randSize) => {
    productSizeGlobal = randSize
    cy.log("productSizeGlobal: "+productSizeGlobal)
}) 
});

When("I add the item to the basket", () => {
  ProductPage.addToBag()
});

Then("I verify item has been added successfully to Summary page", () => {
  SummaryPage.verifyItemOnSummaryPage(productNameGlobal, productFitGlobal, productColourGlobal, productPriceGlobal, productSizeGlobal)
});

Then("I close the summary", () => {
  SummaryPage.closeSummary()
});


Then("I expect the basket icon to display number {string}", (itemsNumber) => {
  AllItemsPage.verifyNumberOfItemsInBasket(itemsNumber)
});

Then("I click on basket icon", () => {
  SummaryPage.clickOnBasket()
});






Then("I verify that the item has been added successfully", () => {

  // // Close the summary and verify the number on the basket icon
  // productLocators.cartCount().should('have.text', '1')
  
  // Open basket and re-verify the  values
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
  //fullBagLocators.checkoutButton().click({ force: true })
  CheckoutPage.clickCheckout()
  CheckoutPage.assertDisplayedValues(productName, productColour, productFit, productPrice)
  
});



