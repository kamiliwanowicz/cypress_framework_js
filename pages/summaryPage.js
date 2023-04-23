import {
  YourBagLocators
} from "../locators/gymSharkLocators";

const yourBagLocators = new YourBagLocators();

export default class SummaryPage {
  static verifyItemOnSummaryPage(productName, productFit, productColour, productPrice, productSize) {
    yourBagLocators.yourBagTitle().should('be.visible')
    yourBagLocators.productName().should('have.text', productName)
      if (productFit) {
        yourBagLocators.productFit().contains(productFit, { matchCase: false })
    }

    // Verify the values on Summary page
    yourBagLocators.productColourAndSize().contains(productColour, { matchCase: false })
    if (productSize) {
    yourBagLocators.productColourAndSize().contains(productSize, { matchCase: false })
    }
    yourBagLocators.priceOneProduct().should('include.text', productPrice)
    yourBagLocators.priceTotal().should('include.text', productPrice)
    yourBagLocators.priceSelectedItem().should('include.text', productPrice)
}

  static closeSummary() {
    yourBagLocators.closeXIcon().click()
  }

}
