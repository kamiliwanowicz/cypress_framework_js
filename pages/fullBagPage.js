
import {FullBagLocators, YourBagLocators} from "../locators/gymSharkLocators";

const yourBagLocators = new YourBagLocators();
const fullBagLocators = new FullBagLocators();

export default class FullBagPage {

static clickViewFullBag() {
  yourBagLocators.viewFullBag().click()
}

static verifyValuesOnFullBagPage(productName, productFit, productColour, productPrice, productSize) {
  fullBagLocators.productName().should('include.text', productName)
  if (productFit) {
  fullBagLocators.productFit().contains(productFit, { matchCase: false })
  }
  fullBagLocators.productColourAndSize().contains(productColour, { matchCase: false })
  fullBagLocators.productColourAndSize().contains(productSize, { matchCase: false })
  fullBagLocators.priceOneProduct().should('include.text', productPrice)
  fullBagLocators.priceTotal().should('include.text', productPrice)
  fullBagLocators.priceSelectedItem().should('include.text', productPrice)
}

}
