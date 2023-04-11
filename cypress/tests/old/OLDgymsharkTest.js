import GymShark from "../../../pageObjects/GymSharkPage"
import ProductPage from "../../../pageObjects/ProductPage"


describe.only('Gymshark Test', () => {
  const gymShark = new GymShark()
  const productPage = new ProductPage()

  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.visit('https://uk.shop.gymshark.com/')
    gymShark.acceptCookies().click()
  })

  it('Tests adding items to the basket', () => {
    gymShark.expandMainMenu().click()
    gymShark.getMen().click()
    gymShark.newReleases().click({force: true})

    gymShark.itemsList().should('be.visible').then((itemsList) => {
      const len = itemsList.length;
    
      // Choose a random element from the list
      const randomElement = Math.floor(Math.random() * len);
    
      // Get the product details for the random element
      const productCard = itemsList.eq(randomElement);
      const productName = productCard.find('a').attr('title');
      const productFit = productCard.find('*[class^="product-card_product-fit"]').text()
      const productColour = productCard.find('*[class^="product-card_product-colour"]').text()
      const productPrice = productCard.find('*[class^="product-card_product-price"]').text()
    
      // Click on the random element and assert the product details
      cy.wrap(productCard).should('be.visible').click();
      productPage.productName().should('have.text', productName);

      // Product Fit is not visible on product page for single-colour items
      if (productPage.productFit().length > 0) {
        productPage.productFit().should('have.text', productFit);
    }
      productPage.productPrice().should('have.text', productPrice);

      // Colour is not visible on product page for single-colour items
      if (productPage.productColour().length > 0) {
        productPage.productColour().should('have.text', productColour);
    }
  })
  })
})

      
      



    

    


    
  







  