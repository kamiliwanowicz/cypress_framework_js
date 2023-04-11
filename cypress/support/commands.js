// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('prepVeggieName', (veg) => { 
    const veg_name_split = veg.split('images/')[1].split('.jpg')[0]
    const veg_name_full = veg_name_split.charAt(0).toUpperCase() + veg_name_split.slice(1);
    return cy.wrap(veg_name_full).as('veg_name_full');
 })

Cypress.Commands.add('elementExists', (selector) => {
   return cy.window().then($window => $window.document.querySelector(selector));
 });

Cypress.Commands.add('getRandomItemFromArray', (array) => {
  var randomElement = array[Math.floor(Math.random()*array.length)]
  return randomElement
});

Cypress.Commands.add('firstCharToCapital', (word) => { 
  const new_word = word.charAt(0).toUpperCase() + word.slice(1);
  return cy.wrap(new_word).as('new_word');
});

