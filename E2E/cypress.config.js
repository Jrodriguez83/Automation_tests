const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://opencart.abstracta.us/",
    pageLoadTimeout: 20000,
    watchForFileChanges: false,
    chromeWebSecurity: false
  },
});
