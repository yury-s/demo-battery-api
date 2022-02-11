// @ts-check
const { devices } = require('@playwright/test');
const path = require('path')

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type{import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  webServer: {
    port: 9900,
    command: 'npm run start',
  },
  // Timeout per test
  timeout: 10 * 1000,
  // Test directory
  testDir: path.join(__dirname, 'tests'),
  // If a test fails, retry it additional 2 times
  // retries: 2,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: 'test-results/',
  
  reporter: 'dot',

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },

  use: {
    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: 'on',

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
  },

  // projects: [
  //   {
  //     name: 'Desktop Chrome',
  //     use: {
  //       ...devices['Desktop Chrome'],

  //     },
  //   },
  //   {
  //     name: 'Desktop Firefox',
  //     use: {
  //       ...devices['Desktop Firefox'],
  //     },
  //   },
  //   {
  //     name: 'Desktop Safari',
  //     use: {
  //       ...devices['Desktop Safari'],
  //     },
  //   },
  //   // Test against mobile viewports.
  //   {
  //     name: 'Mobile Chrome',
  //     use: {
  //       ...devices['Pixel 5'],
  //     },
  //   },
  //   {
  //     name: 'Mobile Safari',
  //     use: devices['iPhone 12'],
  //   },
  // ],
};
module.exports = config;
