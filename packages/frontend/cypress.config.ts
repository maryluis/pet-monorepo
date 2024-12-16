const { defineConfig } = require('cypress');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.spec.tsx',
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on) {
      on('before:run', (request) => {
        console.log('request started:', request);
      });

      on('after:spec', (response) => {
        if (response.statusCode === 500) {
          response.body = { error: 'error 500' };
        }
        return response;
      });
    },
  },
});
