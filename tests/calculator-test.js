const { remote } = require('webdriverio');
const assert = require('assert');

describe('Calculator App', function() {
  this.timeout(60000); // Increase timeout for Appium actions

  it('should launch calculator and perform a simple operation', async function() {
    let driver;
    try {
      // Example capabilities for Android Calculator app
      const capabilities = {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:appPackage': 'com.android.calculator2',
        'appium:appActivity': '.Calculator',
        'appium:noReset': true
      };
      driver = await remote({
        hostname: 'localhost',
        port: 4723,
        path: '/',
        capabilities
      });
      // Wait for calculator to load
      await driver.pause(2000);
      // Press 2 + 2 =
      await driver.$('id=digit_2').then(el => el.click());
      await driver.$('id=op_add').then(el => el.click());
      await driver.$('id=digit_2').then(el => el.click());
      await driver.$('id=eq').then(el => el.click());
      // Get result
      const resultEl = await driver.$('id=result');
      const resultText = await resultEl.getText();
      assert(resultText === '4' || resultText === '4.0', 'Expected result to be 4');
    } finally {
      if (driver) await driver.deleteSession();
    }
  });
});

