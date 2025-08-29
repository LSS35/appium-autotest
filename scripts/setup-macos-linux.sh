#!/bin/bash

# macOS/Linux Setup Script for Appium Mobile Automation
# This script installs all necessary tools for mobile automation testing

set -e

echo "🚀 Starting Appium Mobile Automation Setup for macOS/Linux..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check macOS
is_macos() {
    [[ "$OSTYPE" == "darwin"* ]]
}

# Function to check Linux
is_linux() {
    [[ "$OSTYPE" == "linux-gnu"* ]]
}

# Install Homebrew on macOS if not present
if is_macos && ! command_exists brew; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Update package managers
echo "🔄 Updating package managers..."
if is_macos; then
    brew update
elif is_linux; then
    sudo apt update
fi

# Install JDK 17
echo "☕ Installing JDK 17..."
if is_macos; then
    if ! brew list openjdk@17 &>/dev/null; then
        brew install openjdk@17
        echo 'export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home' >> ~/.zshrc
        echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc
    fi
elif is_linux; then
    if ! command_exists java || ! java -version 2>&1 | grep -q "17\."; then
        sudo apt install -y openjdk-17-jdk
        echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
        echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.bashrc
    fi
fi

# Install Node.js
echo "📦 Installing Node.js..."
if is_macos; then
    if ! command_exists node; then
        brew install node
    fi
elif is_linux; then
    if ! command_exists node; then
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
fi

# Install Gradle
echo "🔧 Installing Gradle..."
if is_macos; then
    if ! command_exists gradle; then
        brew install gradle
    fi
elif is_linux; then
    if ! command_exists gradle; then
        sudo apt install -y gradle
    fi
fi

# Install Android SDK (via command line tools)
echo "📱 Setting up Android SDK..."
ANDROID_HOME="$HOME/Library/Android/sdk"
if is_linux; then
    ANDROID_HOME="$HOME/Android/Sdk"
fi

if [ ! -d "$ANDROID_HOME" ]; then
    mkdir -p "$ANDROID_HOME"
    
    # Download Android command line tools
    if is_macos; then
        SDK_TOOLS_URL="https://dl.google.com/android/repository/commandlinetools-mac-9477386_latest.zip"
    elif is_linux; then
        SDK_TOOLS_URL="https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip"
    fi
    
    cd "$ANDROID_HOME"
    curl -o cmdline-tools.zip "$SDK_TOOLS_URL"
    unzip cmdline-tools.zip
    mkdir -p cmdline-tools/latest
    mv cmdline-tools/* cmdline-tools/latest/ 2>/dev/null || true
    rm cmdline-tools.zip
    
    # Set environment variables
    echo "export ANDROID_HOME=$ANDROID_HOME" >> ~/.bashrc
    echo "export PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/latest/bin:\$ANDROID_HOME/platform-tools" >> ~/.bashrc
    
    if is_macos; then
        echo "export ANDROID_HOME=$ANDROID_HOME" >> ~/.zshrc
        echo "export PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/latest/bin:\$ANDROID_HOME/platform-tools" >> ~/.zshrc
    fi
    
    # Accept licenses and install basic packages
    export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools"
    yes | sdkmanager --licenses
    sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2" "emulator" "system-images;android-33;google_apis;x86_64"
fi

# Install Appium 2
echo "🔄 Installing Appium 2..."
if ! command_exists appium; then
    npm install -g appium@next
fi

# Install Appium drivers
echo "🚗 Installing Appium drivers..."
appium driver install uiautomator2
appium driver install xcuitest 2>/dev/null || echo "XCUITest driver skipped (iOS development)"

# Install Appium Inspector
echo "🔍 Installing Appium Inspector..."
npm install -g appium-inspector 2>/dev/null || echo "Appium Inspector installation skipped (GUI tool)"

# Install appium-doctor
echo "🩺 Installing Appium Doctor..."
npm install -g appium-doctor

echo "✅ Setup completed!"
echo ""
echo "🔄 Please restart your terminal or run:"
if is_macos; then
    echo "source ~/.zshrc"
else
    echo "source ~/.bashrc"
fi
echo ""
echo "🧪 Then run 'npm run verify-setup' to verify your installation"