# Appium 2 Mobile Automation Educational Setup

This project provides a minimal Appium 2 setup for Android automation testing using the uiautomator2 driver. It is intended for educational purposes only.

## Requirements
- JDK 17
- Android Studio + SDK + AVD
- Node.js (v16+)
- Appium 2

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   export JAVA_HOME=/path/to/jdk17
   export ANDROID_HOME=/path/to/android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

3. **Start Android emulator:**
   ```bash
   npm run avd:start
   #📱 Available Android Virtual Devices: Medium_Phone_API_36.0
   ```

4. **Start Appium server:**
   ```bash
   npm run start-appium
   ```

5. **Run a basic test:**
   ```bash
   npm test
   ```
   This will open the Android Settings app on your emulator to verify the Appium setup.

## Project Structure

```
appium-autotest/
├── scripts/
├── config/
├── tests/
├── package.json
└── README.md
```

## License

MIT
