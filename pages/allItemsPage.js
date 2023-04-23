import {
  GymSharkLocators,
  ProductLocators,
} from "../locators/gymSharkLocators";

const gymSharkLocators = new GymSharkLocators();
const productLocators = new ProductLocators();

export default class AllItemsPage {
  static selectARandomItem() {
    /* Select a random item from the list, save the details and click on it. Return the items details. */
    return gymSharkLocators
      .itemsList()
      .should("be.visible")
      .then((itemsList) => {
        const len = itemsList.length;

        // Choose a random element from the list
        const randomNumber = Math.floor(Math.random() * len);

        // Get the product details for the random item
        const productCard = itemsList.eq(randomNumber);
        const productName = gymSharkLocators.getProductName(productCard);
        const productFit = gymSharkLocators.getProductFit(productCard);
        const productColour = gymSharkLocators.getProductColour(productCard);
        const productPrice = gymSharkLocators.getProductPrice(productCard);

        // Click on the random item
        return cy
          .wrap(productCard)
          .should("be.visible")
          .click()
          .then(() => {
            // Return an object with the product details
            return {
              productName,
              productColour,
              productFit,
              productPrice,
            };
          });
      });
  }

  static verifyNumberOfItemsInBasket(itemsNumber) {
    productLocators.cartCount().should("have.text", itemsNumber);
  }

  static clickOnBasket() {
    productLocators.iconBag().click({ force: true });
  }
}
