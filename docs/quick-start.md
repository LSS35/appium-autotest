# Quick Start Guide

Get up and running with Appium mobile automation in minutes!

## 🚀 Quick Setup

### 1. Run Setup Script
Choose your platform:

**macOS/Linux:**
```bash
./scripts/setup-macos-linux.sh
```

**Windows:**
```powershell
.\scripts\setup-windows.ps1
```

### 2. Verify Installation
```bash
npm run verify-setup
```

### 3. Create Android Virtual Device
```bash
npm run avd:create
```

### 4. Start Emulator
```bash
npm run avd:start
```

### 5. Start Appium Server
```bash
npm run start-appium
```

### 6. Run Sample Test
```bash
npm run test:sample
```

## 📋 Available Commands

### Setup and Verification
- `npm run verify-setup` - Check if all tools are properly installed
- `npm run doctor` - Run appium-doctor diagnostic

### Appium Server
- `npm run start-appium` - Start Appium server

### Android Virtual Device Management
- `npm run avd` - Show AVD management help
- `npm run avd:list` - List available AVDs
- `npm run avd:create` - Create default test AVD
- `npm run avd:start` - Start an AVD
- `npm run avd:stop` - Stop all running emulators

### Testing
- `npm run test:sample` - Run sample Appium test

## 🎯 Quick Checklist

After running the setup script, verify these items:

- [ ] ✅ Java JDK 17 installed and JAVA_HOME set
- [ ] ✅ Node.js and npm installed
- [ ] ✅ Gradle installed
- [ ] ✅ Android SDK installed and ANDROID_HOME set
- [ ] ✅ Appium 2 installed globally
- [ ] ✅ Appium Doctor passes all checks
- [ ] ✅ Android Virtual Device created
- [ ] ✅ Emulator can start successfully
- [ ] ✅ Appium server starts without errors
- [ ] ✅ Sample test runs successfully

## 🆘 Quick Troubleshooting

### Common Issues
1. **Path not found errors**: Restart terminal after setup
2. **Permission errors**: Run with appropriate permissions
3. **Port conflicts**: Kill existing processes or use different ports
4. **Emulator won't start**: Check virtualization is enabled in BIOS

### Quick Fixes
```bash
# Kill all appium processes
pkill -f appium

# Kill all emulator processes
npm run avd:stop

# Restart adb
adb kill-server
adb start-server

# Check what's running
adb devices
```

## 📖 Next Steps

1. **Explore the sample test** in `tests/sample-test.js`
2. **Read the full documentation** in `README.md`
3. **Check troubleshooting guide** in `docs/troubleshooting.md`
4. **Customize configuration** in `config/` directory

## 💡 Pro Tips

- Use Appium Inspector to find element selectors
- Keep emulator running between tests for faster execution
- Use `noReset: true` capability to skip app reinstall
- Set up parallel execution for multiple devices

Happy testing! 🎉