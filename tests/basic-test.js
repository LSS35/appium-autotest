const { remote } = require('webdriverio');
const assert = require('assert');
const axios = require('axios');

describe('Basic Appium Settings Test', function() {
  this.timeout(60000);

  it('should connect to Appium and list elements in Settings', async function() {
    // Appium uiautomator2 capabilities for Android
    const capabilities = {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:appPackage': 'com.android.settings',
      'appium:appActivity': 'com.android.settings.Settings',
      'appium:noReset': true
    };
    // Function to check if Appium server is running
    async function isAppiumServerRunning(host, port) {
      try {
        const response = await axios.get(`http://${host}:${port}/status`);
        return response.status === 200;
      } catch (error) {
        return false;
      }
    }
    let driver;
    // Check if Appium server is running
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
      // Example: check if keyboard is shown
      await driver.pause(2000);
      const isKeyboardShown = await driver.isKeyboardShown();
      console.log('Keyboard shown:', isKeyboardShown);
      // Try to interact with elements
      const elements = await driver.$$('*');
      assert(Array.isArray(elements), 'Elements should be an array');
      // At least one element should be present
      assert(elements.length > 0, 'Should find at least one element on screen');
      console.log('Found', elements.length, 'elements on screen');
    } finally {
      if (driver) await driver.deleteSession();
    }
  });
});
