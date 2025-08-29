# Troubleshooting Guide

This guide helps you resolve common issues when setting up and using the Appium mobile automation environment.

## 🔧 Installation Issues

### Java Issues

#### Issue: `java: command not found`
**Solution:**
```bash
# macOS
brew install openjdk@17
echo 'export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home' >> ~/.zshrc
source ~/.zshrc

# Linux
sudo apt install openjdk-17-jdk
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
source ~/.bashrc

# Windows
# Download and install JDK 17 from Oracle or OpenJDK
# Set JAVA_HOME in System Environment Variables
```

#### Issue: Wrong Java version
**Check current version:**
```bash
java -version
javac -version
```

**Solution:** Ensure JAVA_HOME points to JDK 17:
```bash
export JAVA_HOME=/path/to/jdk17
export PATH=$JAVA_HOME/bin:$PATH
```

### Node.js Issues

#### Issue: `node: command not found`
**Solution:**
```bash
# macOS
brew install node

# Linux
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Download from https://nodejs.org/
```

#### Issue: npm permission errors on macOS/Linux
**Solution:**
```bash
# Use nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
nvm use node

# Or fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### Android SDK Issues

#### Issue: `ANDROID_HOME not set`
**Solution:**
```bash
# Find your Android SDK location (usually):
# macOS: ~/Library/Android/sdk
# Linux: ~/Android/Sdk
# Windows: %USERPROFILE%\AppData\Local\Android\Sdk

export ANDROID_HOME=/path/to/android/sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
```

#### Issue: Android SDK tools not found
**Solution:**
```bash
# Download command line tools
cd $ANDROID_HOME
# Download from: https://developer.android.com/studio/index.html#command-tools

# Install required packages
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2"
```

#### Issue: `adb: command not found`
**Solution:**
```bash
# Add platform-tools to PATH
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Or install standalone adb
# macOS
brew install android-platform-tools

# Linux
sudo apt install android-tools-adb
```

## 🔧 Appium Issues

### Appium Doctor Issues

#### Issue: "✖ ANDROID_HOME is NOT set!"
**Solution:**
```bash
export ANDROID_HOME=/path/to/android/sdk
echo 'export ANDROID_HOME=/path/to/android/sdk' >> ~/.bashrc  # or ~/.zshrc
```

#### Issue: "✖ JAVA_HOME is NOT set!"
**Solution:**
```bash
export JAVA_HOME=/path/to/jdk17
echo 'export JAVA_HOME=/path/to/jdk17' >> ~/.bashrc  # or ~/.zshrc
```

#### Issue: "✖ adb could not be found"
**Solution:**
```bash
export PATH=$PATH:$ANDROID_HOME/platform-tools
# Restart terminal and run: adb version
```

#### Issue: "✖ android could not be found"
**This is a known warning and can usually be ignored. The `android` command was deprecated.**

### Appium Server Issues

#### Issue: `appium: command not found`
**Solution:**
```bash
npm install -g appium@next
npm install -g appium-doctor
```

#### Issue: "Error: listen EADDRINUSE :::4723"
**Solution:**
```bash
# Kill existing Appium processes
pkill -f appium

# Or use different port
appium -p 4724
```

#### Issue: "No drivers have been installed"
**Solution:**
```bash
appium driver install uiautomator2
appium driver install xcuitest  # for iOS
appium driver list
```

#### Issue: Appium server crashes on startup
**Check logs and try:**
```bash
# Update Appium
npm update -g appium

# Reinstall drivers
appium driver uninstall uiautomator2
appium driver install uiautomator2
```

## 🔧 Emulator Issues

### Android Emulator Issues

#### Issue: "No emulators found"
**Solution:**
```bash
# List available AVDs
emulator -list-avds

# Create new AVD
avdmanager create avd -n TestAVD -k "system-images;android-33;google_apis;x86_64"
```

#### Issue: Emulator won't start
**Solution:**
```bash
# Check if virtualization is enabled
# Intel: VT-x must be enabled in BIOS
# AMD: AMD-V must be enabled in BIOS

# For Linux, install KVM
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils

# Add user to groups
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
```

#### Issue: Emulator is slow
**Solutions:**
- Use x86_64 system images instead of ARM
- Increase RAM allocation in AVD settings
- Enable hardware acceleration (Intel HAXM/Hyper-V)
- Close unnecessary applications

#### Issue: "Intel HAXM installation failed"
**Solution for macOS:**
```bash
# Enable virtualization in BIOS
# Install Intel HAXM
brew install --cask intel-haxm
```

**Solution for Windows:**
```bash
# Disable Hyper-V if using Intel HAXM
dism.exe /Online /Disable-Feature:Microsoft-Hyper-V

# Or use Hyper-V instead of HAXM
# Enable Windows Hypervisor Platform
dism.exe /Online /Enable-Feature /FeatureName:HypervisorPlatform /All
```

### Connection Issues

#### Issue: "Could not find a connected Android device"
**Solution:**
```bash
# Check connected devices
adb devices

# Start emulator
emulator -avd YOUR_AVD_NAME

# Wait for emulator to fully boot
adb wait-for-device
```

#### Issue: Device unauthorized
**Solution:**
```bash
# Kill adb server
adb kill-server
adb start-server

# Accept RSA key fingerprint on device/emulator
# Check 'Always allow from this computer' checkbox
```

## 🔧 Test Execution Issues

### WebDriverIO Issues

#### Issue: "Cannot resolve module 'webdriverio'"
**Solution:**
```bash
npm install webdriverio
```

#### Issue: Session creation failed
**Check these points:**
1. Appium server is running
2. Emulator/device is connected
3. Capabilities match your device
4. App package/activity is correct

#### Issue: Element not found
**Solutions:**
- Use Appium Inspector to find correct selectors
- Add explicit waits
- Check if element is in a different context (web view)

### Permission Issues

#### Issue: App permissions not granted
**Solution:**
Add to capabilities:
```javascript
{
  autoGrantPermissions: true,
  // or
  permissions: ['android.permission.CAMERA', 'android.permission.WRITE_EXTERNAL_STORAGE']
}
```

## 🔧 Platform-Specific Issues

### macOS Issues

#### Issue: Xcode Command Line Tools not found
**Solution:**
```bash
xcode-select --install
```

#### Issue: Homebrew permission issues
**Solution:**
```bash
sudo chown -R $(whoami) /opt/homebrew
```

### Windows Issues

#### Issue: PowerShell execution policy
**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Issue: Long path names
**Solution:**
Enable long paths in Windows:
```powershell
# Run as Administrator
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

### Linux Issues

#### Issue: Permission denied for /dev/kvm
**Solution:**
```bash
sudo usermod -aG kvm $USER
# Logout and login again
```

#### Issue: Missing 32-bit libraries
**Solution:**
```bash
sudo apt install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386
```

## 🔧 Performance Optimization

### Speed up tests
1. Use `skipDeviceInitialization: true` for faster startup
2. Use `noReset: true` to skip app reinstallation
3. Disable animations: `disableWindowAnimation: true`
4. Use parallel execution for multiple tests

### Reduce flakiness
1. Add proper waits instead of hard sleeps
2. Use stable locators (ID > accessibility ID > XPath)
3. Handle dynamic content properly
4. Implement retry mechanisms

## 🆘 Getting Help

### Log Analysis
Always check logs when troubleshooting:
```bash
# Appium server logs
appium --log-level debug

# ADB logs
adb logcat

# Emulator logs
emulator -avd YOUR_AVD -verbose
```

### Useful Commands
```bash
# System info
appium-doctor
adb devices
emulator -list-avds

# Reset everything
adb kill-server
pkill -f appium
pkill -f emulator
```

### Community Resources
- [Appium Documentation](https://appium.io/docs/)
- [Appium GitHub Issues](https://github.com/appium/appium/issues)
- [Stack Overflow Appium Tag](https://stackoverflow.com/questions/tagged/appium)
- [Appium Slack Community](https://appium.slack.com/)