const { remote } = require('webdriverio');
const assert = require('assert');

describe('Scroll and Tap Test', function() {
  this.timeout(60000);

  it('should scroll and tap an item in Settings', async function() {
    const capabilities = {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:appPackage': 'com.android.settings',
      'appium:appActivity': 'com.android.settings.Settings',
      'appium:noReset': true
    };
    let driver;
    try {
      driver = await remote({
        hostname: 'localhost',
        port: 4723,
        path: '/',
        capabilities
      });
      await driver.pause(2000);
      // Scroll to and tap 'Display' (as an example)
      const el = await driver.$(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView(\"Display\")`);
      assert(await el.isExisting(), 'Display item not found');
      await el.click();
      await driver.pause(1000);
      await driver.back();
      await driver.pause(1000);
    } finally {
      if (driver) await driver.deleteSession();
    }
  });
});

