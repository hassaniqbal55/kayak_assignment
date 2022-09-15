exports.config = {
  directConnect: true,
  framework: 'mocha',
  SELENIUM_PROMISE_MANAGER: false,
  multiCapabilities: [
    { 'browserName': 'chrome' }
  ],
  specs: [
    './test/spec/*.ts'  // test files
  ],
  mochaOpts: {
    reporter: "spec",
    timeout: 50000
  },
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'tsconfig.json'
    });
  },
  onPrepare: async () => {
    browser.driver.ignoreSynchronization = false;
    await browser.waitForAngularEnabled(false);
  }

};