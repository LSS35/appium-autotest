const { remote } = require('webdriverio');
const assert = require('assert');

describe('Visual WiFi Toggle Test', function() {
  this.timeout(60000);

  it('should open WiFi settings and toggle WiFi', async function() {
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
      // Try to find and tap the Wi-Fi menu item
      const wifiMenu = await driver.$(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView(\"Wi‑Fi\")`);
      assert(await wifiMenu.isExisting(), 'Wi-Fi menu not found');
      await wifiMenu.click();
      await driver.pause(2000);
      // Try to find the Wi-Fi toggle switch
      const toggle = await driver.$('//android.widget.Switch');
      assert(await toggle.isExisting(), 'Wi-Fi toggle switch not found');
      // Toggle Wi-Fi
      await toggle.click();
      await driver.pause(1000);
    } finally {
      if (driver) await driver.deleteSession();
    }
  });
});

