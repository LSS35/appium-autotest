# Appium Android Automation

## Requirements
- JDK 17
- Android SDK (with AVD)
- Node.js v16+

## Setup & Run (Local or CI)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set environment variables (adjust paths):
   ```bash
   export JAVA_HOME=/path/to/jdk17
   export ANDROID_HOME=/path/to/android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```
3. Run all tests with emulator and Appium (CI-like):
   ```bash
   ./scripts/run-local-ci.sh
   ```

- Results: open `mochawesome-report/mochawesome.html` for the report.
- Screenshots/videos: see `artifacts/screenshots/` and `artifacts/videos/`.
