# Appium 2 Mobile Automation Test Setup

This project demonstrates Appium 2 setup with uiautomator2 driver for Android automation testing and provides a complete workspace setup guide.

## 🎯 Goal
Prepare a mobile automation workspace with Appium 2 and all necessary tools and dependencies for mobile testing.

## 📋 Requirements
- JDK 17
- Gradle/Maven
- Android Studio + SDK + AVD
- Node.js (v16 or higher)
- Appium 2
- Appium Inspector

## ✅ Definition of Done
- appium-doctor passes all checks
- Android emulator runs successfully
- Appium server starts successfully
- uiautomator2 driver working properly

## 🚀 Quick Start

**New to Appium?** Check out our [Quick Start Guide](docs/quick-start.md) for a streamlined setup process.

### Automated Setup

#### For macOS/Linux:
```bash
./scripts/setup-macos-linux.sh
```

#### For Windows:
```powershell
.\scripts\setup-windows.ps1
```

### Install Project Dependencies
After running the setup script, install the project dependencies:
```bash
npm install
```

### Demo and Verification
1. **Demo the setup:**
```bash
npm run demo
```

2. **Verify setup:**
```bash
npm run verify-setup
```

3. **Start Appium server:**
```bash
npm run start-server
```

4. **Run basic test** (in another terminal):
```bash
npm test
```

## 🚀 Features

- ✅ Appium 2.19.0 setup
- ✅ uiautomator2 driver installation and configuration
- ✅ Driver management commands
- ✅ Basic test examples
- ✅ WebDriverIO integration
- ✅ Multiple capability configurations
- ✅ AVD management scripts
- ✅ Comprehensive verification tools

## 🎯 Driver Management

### List Available Drivers
```bash
npm run driver:list
```

### Install Additional Drivers
```bash
# Install uiautomator2 (already included)
npm run driver:install uiautomator2

# Install xcuitest for iOS
npm run driver:install xcuitest
```

### Check Installed Drivers
```bash
npx appium driver list
```

## 🧪 Testing Your Setup

### 1. Run Appium Doctor
```bash
npm run doctor
```

### 2. Start Android Emulator
```bash
npm run avd:start
```

### 3. Start Appium Server
```bash
npm run start-appium
```

### 4. Run Sample Test
```bash
npm run test:sample
```

### 5. Run Basic uiautomator2 Test
```bash
npm test
```

## 📱 Device Setup

### Android Virtual Device (AVD) Setup
Use our AVD management script:
```bash
# Create default test AVD
npm run avd:create

# List available AVDs
npm run avd:list

# Start an AVD
npm run avd:start

# Stop all emulators
npm run avd:stop
```

### Real Android Device
1. Enable Developer Options
2. Enable USB Debugging
3. Connect device via USB
4. Verify with: `adb devices`

## ⚙️ Configuration

### Capabilities
Modify capabilities in `tests/basic-test.js` or use examples from `config/capabilities.js`:

```javascript
const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  'appium:platformVersion': '11.0',
  'appium:appPackage': 'com.android.calculator2',
  'appium:appActivity': 'com.android.calculator2.Calculator'
};
```

### Environment Variables
Ensure the following environment variables are set:

```bash
export JAVA_HOME=/path/to/jdk17
export ANDROID_HOME=/path/to/android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

## 📋 Available NPM Scripts

### Setup and Verification
- `npm run verify-setup` - Comprehensive setup verification
- `npm run doctor` - Run appium-doctor diagnostic

### Appium Server
- `npm run start-appium` - Start Appium server
- `npm run start-server` - Start Appium server with base path

### Driver Management
- `npm run demo` - Run driver management demonstration
- `npm run driver:list` - List all available drivers
- `npm run driver:install` - Install new drivers

### Android Virtual Device Management
- `npm run avd` - Show AVD management help
- `npm run avd:list` - List available AVDs
- `npm run avd:create` - Create default test AVD
- `npm run avd:start` - Start an AVD
- `npm run avd:stop` - Stop all running emulators

### Testing
- `npm test` - Run basic uiautomator2 test
- `npm run test:sample` - Run sample Appium test

## 🔍 Troubleshooting

For common issues and solutions, check our [Troubleshooting Guide](docs/troubleshooting.md).

### Common Issues

**"ECONNREFUSED" Error:**
- Make sure Appium server is running: `npm run start-server`

**"A new session could not be created" Error:**
- Ensure Android device/emulator is connected: `adb devices`
- Check if ADB is in PATH
- Verify Android SDK setup

**Driver Installation Issues:**
- Check Appium and driver version compatibility
- Try installing specific driver versions

### Quick Fixes
```bash
# Kill all processes and restart
pkill -f appium
npm run avd:stop
adb kill-server && adb start-server

# Check system status
npm run verify-setup
adb devices

# Get detailed logs
npx appium server --log-level debug

# Install specific driver version
npx appium driver install uiautomator2@3.0.0
```

## 📁 Project Structure
```
appium-autotest/
├── scripts/
│   ├── setup-macos-linux.sh    # macOS/Linux setup script
│   ├── setup-windows.ps1       # Windows setup script
│   ├── verify-setup.js         # Setup verification script
│   ├── manage-avd.sh           # AVD management utility
│   └── driver-demo.js          # Driver management demo
├── config/
│   ├── appium.config.js        # Appium server configuration
│   ├── android.config.js       # Android-specific configuration
│   ├── appium.json             # Appium server settings
│   └── capabilities.js         # Example capability configurations
├── tests/
│   ├── sample-test.js          # Sample Appium test
│   └── basic-test.js           # Basic uiautomator2 test
├── docs/
│   ├── quick-start.md          # Quick start guide
│   ├── troubleshooting.md      # Troubleshooting guide
│   └── development-notes.md    # Development notes
├── package.json                # Node.js dependencies and scripts
└── README.md                   # This file
```

## 📖 Learning Resources

- [Appium 2 Documentation](https://appium.io/docs/en/2.1/)
- [uiautomator2 Driver](https://github.com/appium/appium-uiautomator2-driver)
- [WebDriverIO Appium Guide](https://webdriver.io/docs/appium/)

## 🎯 Next Steps

- [ ] Install xcuitest driver for iOS testing
- [ ] Add more test examples
- [ ] Implement Page Object Model
- [ ] Add CI/CD pipeline
- [ ] Explore Appium plugins

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your setup thoroughly
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.
