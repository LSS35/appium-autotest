const { remote } = require('webdriverio');
const assert = require('assert');
const axios = require('axios');

describe('Visual Settings Test', function() {
  this.timeout(60000);

  it('should tap a clickable settings item', async function() {
    const capabilities = {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:appPackage': 'com.android.settings',
      'appium:appActivity': 'com.android.settings.Settings',
      'appium:noReset': true
    };
    async function isAppiumServerRunning(host, port) {
      try {
        const response = await axios.get(`http://${host}:${port}/status`);
        return response.status === 200;
      } catch (error) {
        return false;
      }
    }
    let driver;
    const serverRunning = await isAppiumServerRunning('localhost', 4723);
    if (!serverRunning) {
      throw new Error('Appium server is not running on http://localhost:4723. Please start the server and try again.');
    }
    try {
      driver = await remote({
        hostname: 'localhost',
        port: 4723,
        path: '/',
        capabilities
      });
      await driver.pause(2000);
      const items = await driver.$$('//android.widget.TextView[@clickable="true"]');
      assert(items.length > 0, 'No clickable TextView found');
      await items[0].click();
      await driver.pause(1000);
      await driver.back();
      await driver.pause(1000);
    } finally {
      if (driver) await driver.deleteSession();
    }
  });
});
