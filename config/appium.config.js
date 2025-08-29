// Appium Configuration File
// This file contains the default configuration for Appium server

module.exports = {
  server: {
    // Server configuration
    host: '0.0.0.0',
    port: 4723,
    keepAliveTimeout: 600,
    newCommandTimeout: 300,
    sessionOverride: true,
    
    // Logging
    logLevel: 'info',
    logTimestamp: true,
    logNoColors: false,
    
    // Security
    relaxedSecurityEnabled: true,
    allowInsecure: ['chromedriver_autodownload'],
    denyInsecure: []
  },
  
  capabilities: {
    // Common capabilities
    platformName: 'Android',
    automationName: 'UiAutomator2',
    deviceName: 'Android Emulator',
    platformVersion: '13.0',
    
    // App configuration
    appPackage: 'com.android.settings',
    appActivity: '.Settings',
    
    // Timeouts
    newCommandTimeout: 300,
    implicitWaitTimeout: 10000,
    
    // Performance
    skipDeviceInitialization: false,
    skipServerInstallation: false,
    skipLogcatCapture: false
  },
  
  // Driver configuration
  drivers: {
    uiautomator2: {
      automationName: 'UiAutomator2',
      systemPort: 8200,
      skipServerInstallation: false,
      disableWindowAnimation: true
    },
    xcuitest: {
      automationName: 'XCUITest',
      useNewWDA: true,
      usePrebuiltWDA: true,
      shouldTerminateApp: true
    }
  }
};