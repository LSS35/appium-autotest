# Appium Autotest

This repository provides access to demo test applications for Appium mobile automation testing.

## Test Applications

### Android Demo App (Sauce Labs)

**Version:** 2.2.0  
**Package Name:** `com.swaglabsmobileapp`  
**Main Activity:** `com.swaglabsmobileapp.MainActivity`

#### Download
- **APK:** [mda-2.2.0-25.apk](https://github.com/saucelabs/my-demo-app-android/releases/download/2.2.0/mda-2.2.0-25.apk) (17.93 MB)
- **Test APK:** [mda-androidTest-2.2.0-25.apk](https://github.com/saucelabs/my-demo-app-android/releases/download/2.2.0/mda-androidTest-2.2.0-25.apk) (3.57 MB)

#### Installation
Install the APK on your Android emulator or device:
```bash
adb install mda-2.2.0-25.apk
```

#### Appium Capabilities
```json
{
  "platformName": "Android",
  "appPackage": "com.swaglabsmobileapp",
  "appActivity": "com.swaglabsmobileapp.MainActivity",
  "automationName": "UiAutomator2"
}
```

For app installation via Appium:
```json
{
  "platformName": "Android",
  "app": "/path/to/mda-2.2.0-25.apk",
  "automationName": "UiAutomator2"
}
```

### iOS Demo App (Sauce Labs)

**Version:** 2.1.2  
**Bundle ID:** `com.saucelabs.mydemo.app.ios`

#### Download
- **IPA:** [SauceLabs-Demo-App.ipa](https://github.com/saucelabs/my-demo-app-ios/releases/download/2.1.2/SauceLabs-Demo-App.ipa) (6.01 MB)
- **Simulator ZIP:** [SauceLabs-Demo-App.Simulator.zip](https://github.com/saucelabs/my-demo-app-ios/releases/download/2.1.2/SauceLabs-Demo-App.Simulator.zip) (5.04 MB)

#### Installation
For iOS Simulator:
```bash
# Extract and install
unzip SauceLabs-Demo-App.Simulator.zip
xcrun simctl install booted "SauceLabs Demo App.app"
```

#### Appium Capabilities
For iOS Device:
```json
{
  "platformName": "iOS",
  "bundleId": "com.saucelabs.mydemo.app.ios",
  "automationName": "XCUITest"
}
```

For app installation via Appium:
```json
{
  "platformName": "iOS",
  "app": "/path/to/SauceLabs-Demo-App.ipa",
  "automationName": "XCUITest"
}
```

## App Features

Both demo applications include the same core features designed for testing:

- **Product Catalog** - Browse and view product details
- **Shopping Cart** - Add/remove items and checkout process
- **User Authentication** - Login/logout functionality
- **QR Code Scanner** - Camera integration for QR code scanning
- **WebView** - In-app web browsing capabilities
- **Biometric Authentication** - Fingerprint/Face ID integration
- **Geolocation** - Location services testing
- **Drawing** - PencilKit integration for feedback forms
- **Push Notifications** - Notification handling
- **Network Calls** - API testing capabilities
- **Image Gallery** - Photo selection and uploading
- **Crashes** - Intentional crash scenarios for error handling

## Source Repositories

- **Android:** [saucelabs/my-demo-app-android](https://github.com/saucelabs/my-demo-app-android)
- **iOS:** [saucelabs/my-demo-app-ios](https://github.com/saucelabs/my-demo-app-ios)

## Additional Demo Apps

For cross-platform testing, Sauce Labs also provides:
- **Flutter:** [saucelabs/my-demo-app-flutter](https://github.com/saucelabs/my-demo-app-flutter)
- **React Native:** [saucelabs/my-demo-app-rn](https://github.com/saucelabs/my-demo-app-rn) (archived)