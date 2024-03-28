const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/api_test/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://petstore.swagger.io/v2'
  },
});
