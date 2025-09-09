# Appium Mobile Automation Test Setup

This repository provides a complete setup guide and scripts for preparing a mobile automation workspace using Appium.

## 🎯 Goal
Prepare a mobile automation workspace with all necessary tools and dependencies.

## 📋 Requirements
- JDK 17
- Gradle/Maven
- Android Studio + SDK + AVD
- Node.js
- Appium 2
- Appium Inspector

## ✅ Definition of Done
- appium-doctor passes all checks
- Android emulator runs successfully
- Appium server starts successfully

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

### Verification
Run the verification script to ensure all tools are properly installed:
```bash
npm run verify-setup
```

## 📖 Manual Installation Guide

### 1. Install JDK 17
#### macOS:
```bash
brew install openjdk@17
echo 'export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home' >> ~/.zshrc
```

#### Linux:
```bash
sudo apt update
sudo apt install openjdk-17-jdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

#### Windows:
1. Download JDK 17 from [Oracle](https://www.oracle.com/java/technologies/downloads/#java17) or [OpenJDK](https://openjdk.org/projects/jdk/17/)
2. Install and set JAVA_HOME environment variable

### 2. Install Gradle
```bash
# macOS
brew install gradle

# Linux
sudo apt install gradle

# Windows (using Chocolatey)
choco install gradle
```

### 3. Install Android Studio and SDK
1. Download [Android Studio](https://developer.android.com/studio)
2. Install Android SDK through Android Studio
3. Set ANDROID_HOME environment variable:
   - macOS/Linux: `export ANDROID_HOME=$HOME/Library/Android/sdk`
   - Windows: `set ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\Sdk`

### 4. Install Node.js
```bash
# macOS
brew install node

# Linux
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Download from https://nodejs.org/
```

### 5. Install Appium 2
```bash
npm install -g appium@next
```

### 6. Install Appium Inspector
```bash
npm install -g appium-inspector
```

## 🔧 Configuration

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

Or manually through Android Studio:
1. Open Android Studio
2. Go to AVD Manager
3. Create a new virtual device
4. Choose a device definition (e.g., Pixel 4)
5. Select a system image (API level 29 or higher recommended)
6. Configure AVD settings and finish

### Environment Variables
Ensure the following environment variables are set:

```bash
export JAVA_HOME=/path/to/jdk17
export ANDROID_HOME=/path/to/android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

## 🧪 Testing Your Setup

**Important:** First install project dependencies if you haven't already:
```bash
npm install
```

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

## 📋 Available NPM Scripts

### Setup and Verification
- `npm run verify-setup` - Comprehensive setup verification
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

## 🛠️ Troubleshooting

For common issues and solutions, check our [Troubleshooting Guide](docs/troubleshooting.md).

### Quick Fixes
```bash
# Kill all processes and restart
pkill -f appium
npm run avd:stop
adb kill-server && adb start-server

# Check system status
npm run verify-setup
adb devices
```

## 📁 Project Structure
```
appium-autotest/
├── scripts/
│   ├── setup-macos-linux.sh    # macOS/Linux setup script
│   ├── setup-windows.ps1       # Windows setup script
│   ├── verify-setup.js         # Setup verification script
│   └── manage-avd.sh           # AVD management utility
├── config/
│   ├── appium.config.js        # Appium server configuration
│   └── android.config.js       # Android-specific configuration
├── tests/
│   └── sample-test.js          # Sample Appium test
├── docs/
│   ├── quick-start.md          # Quick start guide
│   └── troubleshooting.md      # Troubleshooting guide
├── package.json                # Node.js dependencies and scripts
└── README.md                   # This file
```

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your setup thoroughly
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.