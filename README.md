[![CI](https://github.com/LSS35/appium-autotest/actions/workflows/android-appium.yml/badge.svg)](https://github.com/LSS35/appium-autotest/actions/workflows/android-appium.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E=16-brightgreen)](https://nodejs.org/)

# Appium 2 Mobile Automation Educational Setup

Minimal Appium 2 setup for Android automation testing using the uiautomator2 driver.

## Requirements
- JDK 17
- Android Studio + SDK + AVD
- Node.js (v16+)
- Appium 2

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables (adjust paths as needed):
   ```bash
   export JAVA_HOME=/path/to/jdk17
   export ANDROID_HOME=/path/to/android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```
3. Start Android emulator:
   ```bash
   npm run avd:start
   ```
4. Start Appium server:
   ```bash
   npm run start-appium
   ```
5. Run tests:
   ```bash
   npm test
   ```

## Test Results (HTML Report)

- After running tests, open `mochawesome-report/mochawesome.html` in your browser to view the test results.
- On GitHub Actions, download the `mochawesome-report` artifact from the workflow run and open `mochawesome.html` locally.
