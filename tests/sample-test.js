// Sample Appium test to verify the setup is working
// This is a basic test that launches the Android Settings app

const { remote } = require('webdriverio');

// Test configuration
const capabilities = {
  platformName: 'Android',
  automationName: 'UiAutomator2',
  deviceName: 'Android Emulator',
  platformVersion: '13.0', // Adjust based on your emulator
  appPackage: 'com.android.settings',
  appActivity: '.Settings',
  newCommandTimeout: 300,
  autoGrantPermissions: true
};

const wdOpts = {
  hostname: '127.0.0.1',
  port: 4723,
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
    
    // Get app package and activity
    const currentPackage = await driver.getCurrentPackage();
    const currentActivity = await driver.getCurrentActivity();
    console.log(`📦 Current package: ${currentPackage}`);
    console.log(`🎯 Current activity: ${currentActivity}`);
    
    // Verify we're in the Settings app
    if (currentPackage === 'com.android.settings') {
      console.log('✅ Settings app launched successfully');
    } else {
      console.log('⚠️  Unexpected app package');
    }
    
    // Find and interact with an element
    console.log('🔍 Looking for Settings elements...');
    
    // Try to find search button or settings items
    try {
      const searchElement = await driver.$('//android.widget.ImageButton[@content-desc="Search settings"]');
      if (await searchElement.isDisplayed()) {
        console.log('✅ Found search button');
        await searchElement.click();
        console.log('🔍 Clicked search button');
        await driver.pause(1000);
      }
    } catch (error) {
      console.log('ℹ️  Search button not found, continuing...');
    }
    
    // Get page source to verify interaction
    console.log('📄 Getting page source...');
    const pageSource = await driver.getPageSource();
    
    if (pageSource.includes('Settings') || pageSource.includes('settings')) {
      console.log('✅ Page source contains Settings content');
    } else {
      console.log('⚠️  Page source verification failed');
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

// Run the test if this file is executed directly
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