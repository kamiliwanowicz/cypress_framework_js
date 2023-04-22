
import {CheckoutLocators, FullBagLocators} from "../locators/gymSharkLocators";

const checkoutLocators = new CheckoutLocators();
const fullBagLocators = new FullBagLocators();

export default class CheckoutPage {

static verifyValuesOnCheckoutPage(productName, productFit, productColour, productPrice, productSize) {
  fullBagLocators.checkoutButton().click({ force: true })
  checkoutLocators.productNameAndColour().contains(productName, { matchCase: false })
  checkoutLocators.productNameAndColour().contains(productColour, { matchCase: false })
  if (productFit) {checkoutLocators.productFit().should('include.text', productFit)}
  checkoutLocators.priceOneProduct().should('include.text', productPrice)
  checkoutLocators.priceSubtotal().should('include.text', productPrice)
  checkoutLocators.priceTotal().should('include.text', productPrice)
  if (productSize) {
  checkoutLocators.productSize().contains(productSize, { matchCase: false })
  }
}
static clickCheckout() {
  fullBagLocators.checkoutButton().click({ force: true })
}

}
