import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import CheckoutPage from "../../../pages/checkoutPage";
import CoreMethods from "../../../pages/coreMethods";
import AllItemsPage from "../../../pages/allItemsPage";
import ProductPage from "../../../pages/productPage";
import SummaryPage from "../../../pages/SummaryPage";
import FullBagPage from "../../../pages/fullBagPage";

let productNameGlobal;
let productFitGlobal;
let productColourGlobal; 
let productPriceGlobal; 
let productSizeGlobal;

Before(() => {
  // Turn off XHR logs in the test runner
  CoreMethods.dontLogXHRCallsInTestRunner()
})

Given("I go to Mens New Releases", () => {
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
  ProductPage.selectRandomAvailableSize().then((sizeObject) => {
    productSizeGlobal = sizeObject.randSize
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
  AllItemsPage.clickOnBasket()
});

Then("I verify values on Full Bag page", () => {
  FullBagPage.clickViewFullBag()
  FullBagPage.verifyValuesOnFullBagPage(productNameGlobal, productFitGlobal, productColourGlobal, productPriceGlobal, productSizeGlobal)
});

Then("I verify values on checkout", () => {
  CheckoutPage.clickCheckout()
  CheckoutPage.verifyValuesOnCheckoutPage(productNameGlobal, productFitGlobal, productColourGlobal, productPriceGlobal, productSizeGlobal)
});
