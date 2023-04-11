import GroceryShop from "../../pageObjects/GroceryShop" 


  describe('Grocery Shop Test', () => {
    it('Tests adding items to the basket', () => {
      const groceryShop = new GroceryShop()
      const item1 = 'Capsicum'
      const item2 = 'Cashews'
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      groceryShop.productSearch().type('ca')
      groceryShop.visibleProducts().should('have.length', 4)

      // Add items to the basket
      groceryShop.productsList().each(($el, index, $list) => {
        if ($el.find('.product-name').text().includes(item1) || $el.find('.product-name').text().includes(item2)) {
          cy.wrap($el).find('button').click()  
        }
      })

      // Verify that items are present in the basket
      groceryShop.getCart().click()
      groceryShop.cartProductsList().eq(0).should('have.text', item1)
      groceryShop.cartProductsList().eq(1).should('have.text', item2 + " - 1 Kg")
      groceryShop.proceedToCheckout().click()

      // Get the item name from jpg file name
      groceryShop.productImageSrc(0).invoke('attr', 'src').then($attr_item1 => {
          cy.prepVeggieName($attr_item1).then(veg => {
            cy.wrap(veg).as('first_veg')
            cy.log(`First Veg: ${veg}`)
          })
        })

        groceryShop.productImageSrc(1).invoke('attr', 'src').then($attr_item2 => {
          cy.prepVeggieName($attr_item2).then(veg => {
            cy.wrap(veg).as('second_veg')
            cy.log(`Second Veg: ${veg}`)
          })
        })

      
      
      // Verify data in all rows  
      cy.get('@first_veg').then(first_veg => {
        groceryShop.productSummaryTableRow(0).find('.product-name').should('have.text', first_veg)
        groceryShop.productSummaryTableRow(0).find('.quantity').should('have.text', '1')
        groceryShop.productSummaryTableRow(0).find('td').eq(3).should('have.text', '60')
        groceryShop.productSummaryTableRow(0).find('td').eq(4).should('have.text', '60')
      })

      cy.get('@second_veg').then(second_veg => {
        groceryShop.productSummaryTableRow(1).find('.product-name').should('include.text', second_veg)
        groceryShop.productSummaryTableRow(1).find('.quantity').should('have.text', '1')
        groceryShop.productSummaryTableRow(1).find('td').eq(3).should('have.text', '650')
        groceryShop.productSummaryTableRow(1).find('td').eq(4).should('have.text', '650')
      })

    })

  })

  

 


      
  
