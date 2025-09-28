# Troubleshooting Guide

This guide helps you resolve common issues when setting up and using the Appium mobile automation environment.

## 🛠️ Installation Issues

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
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm-sh/nvm/v0.39.0/install.sh | bash
```

## 🖥️ Emulator & AVD Issues (ARM64 Only)

### Issue: Emulator fails to start or missing Qt libraries
- **Cause:** Emulator or system image mismatch, or missing ARM64 system image.
- **Solution:**
  - Ensure you have created the ARM64 AVD:
    ```bash
    npm run avd:create-arm64
    ```
  - Start the ARM64 AVD:
    ```bash
    npm run avd:start pixel_4_arm64
    ```
  - If you see errors about missing Qt libraries or emulator binary, re-run the setup script and ensure ANDROID_HOME is set correctly.

### Issue: Emulator downloads system image every run
- **Cause:** Cache is not used or system image is not ARM64.
- **Solution:**
  - Use GitHub Actions cache for `$ANDROID_HOME/system-images/android-33/google_apis/arm64-v8a`.
  - Ensure all scripts and workflow steps use only ARM64 AVD and system image.

### Issue: Emulator stuck on boot
- **Solution:**
  - Make sure virtualization is enabled in BIOS/firmware.
  - Try increasing RAM in the AVD config.
  - Restart your machine and try again.

## 🧪 Appium Issues

### Issue: Appium server fails to start
- **Solution:**
  - Ensure Appium 2.x is installed globally: `npm install -g appium`
  - Check for port conflicts: `lsof -i :4723`
  - Kill any existing Appium processes: `pkill -f appium`

### Issue: Tests fail to connect to emulator
- **Solution:**
  - Ensure the emulator is running: `adb devices`
  - Restart adb: `adb kill-server && adb start-server`
  - Use the correct device name: `pixel_4_arm64`

## 🔗 Useful Commands

```bash
# List AVDs
npm run avd:list

# Create ARM64 AVD
npm run avd:create-arm64

# Start ARM64 AVD
npm run avd:start pixel_4_arm64

# Stop all emulators
npm run avd:stop

# Check running devices
adb devices
```
