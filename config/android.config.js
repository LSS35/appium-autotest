// Android-specific configuration for Appium tests

module.exports = {
  // Android Virtual Device (AVD) configurations
  avdConfigs: {
    default: {
      avdName: 'Test_AVD_API33',
      deviceName: 'Pixel_6',
      systemImage: 'system-images;android-33;google_apis;x86_64',
      sdcardSize: '512M',
      hardwareProfile: 'pixel_6'
    },
    
    tablet: {
      avdName: 'Tablet_AVD_API33',
      deviceName: 'Nexus_10',
      systemImage: 'system-images;android-33;google_apis;x86_64',
      sdcardSize: '1024M',
      hardwareProfile: 'Nexus 10'
    }
  },
  
  // Android SDK paths
  androidSdk: {
    // These will be automatically detected from ANDROID_HOME
    platformTools: process.env.ANDROID_HOME ? `${process.env.ANDROID_HOME}/platform-tools` : null,
    buildTools: process.env.ANDROID_HOME ? `${process.env.ANDROID_HOME}/build-tools` : null,
    emulator: process.env.ANDROID_HOME ? `${process.env.ANDROID_HOME}/emulator` : null,
    avdManager: process.env.ANDROID_HOME ? `${process.env.ANDROID_HOME}/cmdline-tools/latest/bin/avdmanager` : null,
    sdkManager: process.env.ANDROID_HOME ? `${process.env.ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager` : null
  },
  
  // Common Android capabilities
  androidCapabilities: {
    platformName: 'Android',
    automationName: 'UiAutomator2',
    platformVersion: '16.0',
    deviceName: 'Android Emulator',
    
    // Performance optimizations
    skipDeviceInitialization: false,
    skipServerInstallation: false,
    ignoreHiddenApiPolicyError: true,
    disableWindowAnimation: true,
    
    // Timeouts
    newCommandTimeout: 300,
    commandTimeouts: {
      'default': 60000
    },
    
    // System settings
    autoGrantPermissions: true,
    noReset: false,
    fullReset: false,
    
    // Logging
    enableLogcatCapture: true,
    logcatFilterSpecs: ['*:W']
  },
  
  // Test application configurations
  testApps: {
    settings: {
      appPackage: 'com.android.settings',
      appActivity: '.Settings'
    },
    
    calculator: {
      appPackage: 'com.google.android.calculator',
      appActivity: 'com.android.calculator2.Calculator'
    },
    
    chrome: {
      appPackage: 'com.android.chrome',
      appActivity: 'com.google.android.apps.chrome.Main'
    }
  },
  
  // Emulator commands
  emulatorCommands: {
    // Start emulator
    start: (avdName) => `emulator -avd ${avdName} -no-snapshot-save -no-audio -no-window`,
    
    // List AVDs
    listAvds: 'emulator -list-avds',
    
    // Kill all emulators
    killAll: 'adb devices | grep emulator | cut -f1 | while read line; do adb -s $line emu kill; done'
  },
  
  // AVD creation script
  createAvdScript: {
    createDefault: `
      echo "Creating default Android AVD..."
      avdmanager create avd -n Test_AVD_API33 -k "system-images;android-33;google_apis;x86_64" -d "pixel_6" --force
      echo "AVD created successfully!"
    `
  }
};