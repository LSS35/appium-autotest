const { remote } = require('webdriverio');
const assert = require('assert');
const axios = require('axios');
const { execSync } = require('child_process');

describe('Calendar App', function() {
  this.timeout(90000);

  it('should open the calendar app or fallback to settings', async function() {
    const CALENDAR_PACKAGES = [
      { appPackage: 'com.google.android.calendar', appActivity: 'com.android.calendar.AllInOneActivity' },
      { appPackage: 'com.android.calendar', appActivity: 'com.android.calendar.AllInOneActivity' }
    ];
    function isEmulatorDetected() {
      try {
        const output = execSync('adb devices').toString();
        const lines = output.split('\n').filter(l => l.trim() && !l.startsWith('List of devices'));
        return lines.some(l => l.includes('device'));
      } catch (e) {
        return false;
      }
    }
    function getFirstDeviceNameFromAdb() {
      try {
        const output = execSync('adb devices').toString();
        const lines = output.split('\n').filter(l => l.trim() && !l.startsWith('List of devices'));
        const deviceLine = lines.find(l => l.includes('device'));
        if (deviceLine) {
          return deviceLine.split('\t')[0].trim();
        }
        return 'emulator-5554';
      } catch (e) {
        return 'emulator-5554';
      }
    }
    async function isAppiumServerRunning(host, port) {
      try {
        const response = await axios.get(`http://${host}:${port}/status`);
        return response.status === 200;
      } catch (error) {
        return false;
      }
    }
    if (!isEmulatorDetected()) {
      throw new Error('No emulator/device detected by adb!');
    }
    let driver;
    let found = false;
    const deviceName = getFirstDeviceNameFromAdb();
    for (const caps of CALENDAR_PACKAGES) {
      try {
        const serverRunning = await isAppiumServerRunning('localhost', 4723);
        if (!serverRunning) {
          throw new Error('Appium server is not running on http://localhost:4723. Please start it.');
        }
        driver = await remote({
          hostname: 'localhost',
          port: 4723,
          path: '/',
          capabilities: {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': deviceName,
            'appium:appPackage': caps.appPackage,
            'appium:appActivity': caps.appActivity,
            'appium:noReset': true
          }
        });
        found = true;
        break;
      } catch (e) {
        if (driver) await driver.deleteSession();
        driver = null;
      }
    }
    if (!found) {
      // fallback to settings
      driver = await remote({
        hostname: 'localhost',
        port: 4723,
        path: '/',
        capabilities: {
          platformName: 'Android',
          'appium:automationName': 'UiAutomator2',
          'appium:deviceName': deviceName,
          'appium:appPackage': 'com.android.settings',
          'appium:appActivity': 'com.android.settings.Settings',
          'appium:noReset': false
        }
      });
      await driver.pause(3000);
      await driver.activateApp('com.android.settings');
      await driver.pause(1000);
      const items = await driver.$$('//android.widget.TextView[@clickable="true"]');
      assert(items.length > 0, 'No clickable items found in Settings');
      await items[0].click();
      await driver.pause(2000);
      await driver.back();
      await driver.pause(1000);
      await driver.deleteSession();
      return;
    }
    try {
      await driver.pause(2000);
      let mainView = await driver.$("//android.view.View | //android.widget.TextView[contains(@text, 'Calendar')] | //android.widget.TextView[contains(@resource-id, 'title')]");
      assert(await mainView.isExisting(), 'Calendar main view not found');
    } finally {
      if (driver) await driver.deleteSession();
    }
  });
});
