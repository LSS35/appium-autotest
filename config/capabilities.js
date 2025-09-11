// Example capabilities for different Android testing scenarios

// Basic Android capabilities for uiautomator2
const androidBasic = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  'appium:platformVersion': '11.0',
  'appium:noReset': true
};

// App testing capabilities
const androidApp = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  'appium:platformVersion': '11.0',
  'appium:app': process.env.APP_PATH || './apps/sample-app.apk', // Set APP_PATH env var or place APK in ./apps/
  'appium:appWaitActivity': '*',
  'appium:noReset': false
};

// Browser testing capabilities
const androidBrowser = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  'appium:platformVersion': '11.0',
  'appium:browserName': 'Chrome',
  'appium:noReset': true
};

// Real device capabilities
const androidRealDevice = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Real Device', // Use adb devices to get UDID
  'appium:udid': process.env.DEVICE_UDID || 'REPLACE_WITH_DEVICE_UDID', // Run 'adb devices' to get your device UDID
  'appium:platformVersion': '12.0',
  'appium:noReset': true
};

module.exports = {
  androidBasic,
  androidApp,
  androidBrowser,
  androidRealDevice
};