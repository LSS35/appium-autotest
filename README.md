# Appium 2 Automation Testing

This project demonstrates Appium 2 setup with uiautomator2 driver for Android automation testing.

## 🚀 Features

- ✅ Appium 2.x setup
- ✅ uiautomator2 driver installation and configuration
- ✅ Driver management commands
- ✅ Basic test examples
- ✅ WebDriverIO integration
- ✅ Multiple capability configurations

## 📋 Prerequisites

- Node.js (v16 or higher)
- Java Development Kit (JDK 8 or higher)
- Android SDK
- Android device or emulator
- ADB in PATH

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd appium-autotest
```

2. Install dependencies:
```bash
npm install
```

3. Verify Appium installation:
```bash
npm run appium -- --version
```

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

## 🏃‍♂️ Running Tests

### 1. Start Appium Server
In one terminal:
```bash
npm run start-server
```

### 2. Run Basic Test
In another terminal:
```bash
npm test
```

## 📱 Device Setup

### Android Emulator
1. Install Android Studio
2. Create an AVD (Android Virtual Device)
3. Start the emulator
4. Verify with: `adb devices`

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

### Appium Server Configuration
Server settings are in `config/appium.json`.

## 🧪 Test Examples

### Basic Driver Test
```bash
npm test
```

This test:
- ✅ Connects to Appium server
- ✅ Creates uiautomator2 driver session
- ✅ Verifies driver functionality
- ✅ Demonstrates basic element interaction

## 📚 Available Scripts

- `npm run appium` - Run Appium CLI commands
- `npm run driver:list` - List all available drivers
- `npm run driver:install` - Install new drivers
- `npm run start-server` - Start Appium server
- `npm test` - Run basic uiautomator2 test

## 🔍 Troubleshooting

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

### Useful Commands

```bash
# Check device connection
adb devices

# Check Appium doctor for setup issues
npx appium doctor

# Get detailed logs
npx appium server --log-level debug

# Install specific driver version
npx appium driver install uiautomator2@3.0.0
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