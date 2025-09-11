// Sample Appium test to verify the setup is working (Appium 2.x + WebdriverIO v8)

const { remote } = require('webdriverio');

// ✅ Capabilities updated for Appium 2.x
const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  'appium:platformVersion': '16.0', // Adjust based on your emulator
  'appium:appPackage': 'com.android.settings',
  'appium:appActivity': '.Settings',
  'appium:newCommandTimeout': 300,
  'appium:autoGrantPermissions': true
};

// WebDriverIO options
const wdOpts = {
  protocol: 'http', // Added explicitly
  hostname: '127.0.0.1',
  port: 4723,
  path: '/', // Needed for Appium 2.x if using default server
  logLevel: 'info',
  capabilities
};

async function runSampleTest() {
  console.log('🚀 Starting Appium sample test...');

  let driver;

  try {
    // Create Appium session
    console.log('📱 Connecting to Appium server...');
    driver = await remote(wdOpts);
    console.log('✅ Connected to Appium server successfully');

    // Wait for the app to load
    console.log('⏳ Waiting for Settings app to load...');
    await driver.pause(3000);

    // Get current app package & activity
    const currentPackage = await driver.getCurrentPackage();
    const currentActivity = await driver.getCurrentActivity();
    console.log(`📦 Current package: ${currentPackage}`);
    console.log(`🎯 Current activity: ${currentActivity}`);

    // Validate the app launched
    if (currentPackage === 'com.android.settings') {
      console.log('✅ Settings app launched successfully');
    } else {
      console.warn('⚠️ Unexpected app package detected');
    }

    // Find and click the search button (if exists)
    console.log('🔍 Looking for Settings elements...');
    try {
      const searchElement = await driver.$('//android.widget.ImageButton[@content-desc="Search settings"]');
      if (await searchElement.isDisplayed()) {
        console.log('✅ Found search button');
        await searchElement.click();
        console.log('🔍 Clicked search button');
        await driver.pause(1000);
      }
    } catch {
      console.log('ℹ️ Search button not found, skipping...');
    }

    // Validate page source contains Settings text
    console.log('📄 Getting page source...');
    const pageSource = await driver.getPageSource();
    if (pageSource.includes('Settings') || pageSource.includes('settings')) {
      console.log('✅ Page source contains expected content');
    } else {
      console.warn('⚠️ Page source verification failed');
    }

    console.log('🎉 Sample test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw error;
  } finally {
    if (driver) {
      console.log('🔚 Closing Appium session...');
      await driver.deleteSession();
      console.log('✅ Session closed');
    }
  }
}

// Run test when executed directly
if (require.main === module) {
  runSampleTest()
    .then(() => {
      console.log('✅ All tests passed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Test suite failed:', error);
      process.exit(1);
    });
}

module.exports = { runSampleTest };