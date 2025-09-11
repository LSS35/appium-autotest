const { remote } = require('webdriverio');

// Appium uiautomator2 capabilities for Android
const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator', // This can be any name for emulator
  'appium:platformVersion': '11.0', // Change to match your device/emulator
  'appium:appPackage': 'com.android.calculator2', // Calculator app
  'appium:appActivity': 'com.android.calculator2.Calculator',
  'appium:noReset': true
};

const appiumServerUrl = process.env.APPIUM_SERVER_URL || 'http://localhost:4723/wd/hub';

async function runBasicTest() {
  console.log('Starting Appium uiautomator2 driver test...');
  console.log('Capabilities:', JSON.stringify(capabilities, null, 2));
  
  let driver;
  
  try {
    // Connect to Appium server
    console.log('Connecting to Appium server at:', appiumServerUrl);
    driver = await remote({
      hostname: 'localhost',
      port: 4723,
      path: '/wd/hub',
      capabilities: capabilities
    });

    console.log('✓ Successfully connected to Appium server');
    console.log('✓ uiautomator2 driver session created');
    
    // Get session details
    const sessionId = driver.sessionId;
    console.log('Session ID:', sessionId);
    
    // Get device information
    const isKeyboardShown = await driver.isKeyboardShown();
    console.log('Keyboard shown:', isKeyboardShown);
    
    // Simple interaction test - find elements if app is available
    try {
      const elements = await driver.$$('*');
      console.log('Found', elements.length, 'elements on screen');
      console.log('✓ Basic element interaction test passed');
    } catch (error) {
      console.log('Note: Could not interact with elements (app may not be installed):', error.message);
    }
    
    console.log('✓ Basic uiautomator2 driver test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Make sure Appium server is running:');
      console.error('   npm run start-server');
      console.error('   or: npx appium server --base-path=/wd/hub');
    }
    
    if (error.message.includes('A new session could not be created')) {
      console.error('\n💡 Make sure you have:');
      console.error('   - Android device/emulator connected');
      console.error('   - ADB is working (adb devices)');
      console.error('   - Proper Android SDK setup');
    }
    
    throw error;
  } finally {
    if (driver) {
      await driver.deleteSession();
      console.log('Session closed');
    }
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  runBasicTest().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = { runBasicTest, capabilities };