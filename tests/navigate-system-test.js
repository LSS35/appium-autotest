const { remote } = require('webdriverio');
const assert = require('assert');
const axios = require('axios');

describe('Navigate System Settings', function() {
  this.timeout(60000);

  it('should scroll to and tap a system section', async function() {
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
      // Popular section names for universal search (English only)
      const possibleTargets = [
        'System', 'About phone', 'Advanced', 'Device info', 'Network & internet', 'Wi‑Fi', 'Display', 'Battery', 'Apps', 'Storage', 'Security', 'Accessibility', 'Accounts', 'Privacy', 'Location', 'Sound', 'Notifications', 'Connected devices', 'Bluetooth', 'Network', 'Internet'
      ];
      let found = false;
      for (const targetText of possibleTargets) {
        const el = await driver.$(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView(\\"${targetText}\\")`);
        if (await el.isExisting()) {
          await el.click();
          found = true;
          break;
        }
      }
      assert(found, 'Could not find any of the target items in Settings');
      await driver.back();
      await driver.pause(1000);
    } finally {
      if (driver) await driver.deleteSession();
    }
  });
});
