#!/bin/bash

# AVD Management Script
# This script helps create and manage Android Virtual Devices

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Check if Android SDK is properly configured
check_android_sdk() {
    if [ -z "$ANDROID_HOME" ]; then
        print_status $RED "❌ ANDROID_HOME is not set"
        print_status $YELLOW "Please set ANDROID_HOME environment variable"
        exit 1
    fi
    
    if [ ! -d "$ANDROID_HOME" ]; then
        print_status $RED "❌ Android SDK directory not found: $ANDROID_HOME"
        exit 1
    fi
    
    local avdmanager_path="$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager"
    if [ ! -f "$avdmanager_path" ]; then
        print_status $RED "❌ avdmanager not found at: $avdmanager_path"
        print_status $YELLOW "Please install Android command line tools"
        exit 1
    fi
    
    print_status $GREEN "✅ Android SDK configuration looks good"
}

# List available AVDs
list_avds() {
    print_status $BLUE "📱 Available Android Virtual Devices:"
    emulator -list-avds 2>/dev/null || {
        print_status $YELLOW "⚠️  No AVDs found or emulator command not available"
        return 1
    }
}

# List installed system images
list_system_images() {
    print_status $BLUE "🖼️  Installed System Images:"
    "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" --list | grep "system-images" | grep "Available" -A 100 | head -20
}

# Create a default AVD for testing
create_default_avd() {
    local avd_name="Test_AVD_API33"
    local package="system-images;android-33;google_apis;x86_64"
    
    print_status $BLUE "🔨 Creating default AVD: $avd_name"
    
    # Check if system image is installed
    if ! "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" --list | grep -q "$package.*Installed"; then
        print_status $YELLOW "📦 Installing system image: $package"
        "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" "$package"
    fi
    
    # Create AVD
    echo "no" | "$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager" create avd \
        --name "$avd_name" \
        --package "$package" \
        --device "pixel_6" \
        --force
    
    print_status $GREEN "✅ AVD '$avd_name' created successfully"
    
    # Configure AVD for better performance
    local avd_config="$HOME/.android/avd/${avd_name}.avd/config.ini"
    if [ -f "$avd_config" ]; then
        print_status $BLUE "⚙️  Configuring AVD for better performance..."
        
        # Add performance optimizations
        echo "hw.gpu.enabled=yes" >> "$avd_config"
        echo "hw.gpu.mode=host" >> "$avd_config"
        echo "hw.ramSize=4096" >> "$avd_config"
        echo "vm.heapSize=512" >> "$avd_config"
        echo "hw.keyboard=yes" >> "$avd_config"
        
        print_status $GREEN "✅ AVD configuration updated"
    fi
}

# Create an ARM64 AVD for Apple Silicon/CI
create_arm64_avd() {
    local avd_name="pixel_4_arm64"
    local package="system-images;android-33;default;arm64-v8a"

    print_status $BLUE "🔨 Creating ARM64 AVD: $avd_name"

    # Check if system image is installed
    if ! "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" --list | grep -q "$package.*Installed"; then
        print_status $YELLOW "📦 Installing system image: $package"
        "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" "$package"
    fi

    # Create AVD
    echo "no" | "$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager" create avd \
        --name "$avd_name" \
        --package "$package" \
        --device "pixel_4" \
        --force

    print_status $GREEN "✅ ARM64 AVD '$avd_name' created successfully"

    # Configure AVD for better performance
    local avd_config="$HOME/.android/avd/${avd_name}.avd/config.ini"
    if [ -f "$avd_config" ]; then
        print_status $BLUE "⚙️  Configuring ARM64 AVD for better performance..."
        echo "hw.gpu.enabled=yes" >> "$avd_config"
        echo "hw.gpu.mode=host" >> "$avd_config"
        echo "hw.ramSize=4096" >> "$avd_config"
        echo "vm.heapSize=512" >> "$avd_config"
        echo "hw.keyboard=yes" >> "$avd_config"
        print_status $GREEN "✅ ARM64 AVD configuration updated"
    fi
}

# Create an x86_64 AVD for CI and local use
create_x86_64_avd() {
    local avd_name="pixel_4_x86_64"
    local package="system-images;android-33;google_apis;x86_64"

    print_status $BLUE "🔨 Creating x86_64 AVD: $avd_name"

    # Check if system image is installed
    if ! "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" --list | grep -q "$package.*Installed"; then
        print_status $YELLOW "📦 Installing system image: $package"
        yes | "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" "$package"
    fi

    # Create AVD if it doesn't exist
    if ! emulator -list-avds | grep -q "^$avd_name$"; then
        echo "no" | "$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager" create avd \
            --name "$avd_name" \
            --package "$package" \
            --device "pixel_4" \
            --force
        print_status $GREEN "✅ x86_64 AVD '$avd_name' created successfully"
    else
        print_status $GREEN "✅ x86_64 AVD '$avd_name' already exists"
    fi

    # Configure AVD for better performance
    local avd_config="$HOME/.android/avd/${avd_name}.avd/config.ini"
    if [ -f "$avd_config" ]; then
        print_status $BLUE "⚙️  Configuring x86_64 AVD for better performance..."
        echo "hw.gpu.enabled=yes" >> "$avd_config"
        echo "hw.gpu.mode=host" >> "$avd_config"
        echo "hw.ramSize=4096" >> "$avd_config"
        echo "vm.heapSize=512" >> "$avd_config"
        echo "hw.keyboard=yes" >> "$avd_config"
        print_status $GREEN "✅ x86_64 AVD configuration updated"
    fi
}

# Start an AVD
start_avd() {
    local avd_name=$1
    
    if [ -z "$avd_name" ]; then
        print_status $YELLOW "📱 Available AVDs:"
        list_avds
        echo
        read -p "Enter AVD name to start: " avd_name
    fi
    
    if [ -z "$avd_name" ]; then
        print_status $RED "❌ No AVD name provided"
        exit 1
    fi
    
    print_status $BLUE "🚀 Starting AVD: $avd_name"
    print_status $YELLOW "⏳ This may take a few minutes..."
    
    # Start emulator in background
    emulator -avd "$avd_name" -no-snapshot-save -no-audio &
    
    print_status $GREEN "✅ AVD start command issued"
    print_status $YELLOW "💡 The emulator is starting in the background"
    print_status $YELLOW "💡 You can check status with: adb devices"
}

# Stop all running emulators
stop_all_emulators() {
    print_status $BLUE "🛑 Stopping all running emulators..."
    
    # Get list of running emulators
    local emulators=$(adb devices | grep emulator | cut -f1)
    
    if [ -z "$emulators" ]; then
        print_status $YELLOW "⚠️  No running emulators found"
        return 0
    fi
    
    # Kill each emulator
    for emulator in $emulators; do
        print_status $BLUE "🛑 Stopping $emulator"
        adb -s "$emulator" emu kill
    done
    
    print_status $GREEN "✅ All emulators stopped"
}

# Show help
show_help() {
    echo "AVD Management Script"
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  list          List available AVDs"
    echo "  images        List installed system images"
    echo "  create        Create default AVD for testing"
    echo "  create-arm64  Create ARM64 AVD for Apple Silicon/CI"
    echo "  create-x86_64 Create x86_64 AVD for CI and local use"
    echo "  start [name]  Start an AVD (prompts for name if not provided)"
    echo "  stop          Stop all running emulators"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 create"
    echo "  $0 start Test_AVD_API33"
    echo "  $0 list"
    echo "  $0 stop"
}

# Main script logic
main() {
    local command=${1:-help}
    
    case $command in
        "list")
            check_android_sdk
            list_avds
            ;;
        "images")
            check_android_sdk
            list_system_images
            ;;
        "create")
            check_android_sdk
            create_default_avd
            ;;
        "create-arm64")
            check_android_sdk
            create_arm64_avd
            ;;
        "create-x86_64")
            check_android_sdk
            create_x86_64_avd
            ;;
        "start")
            check_android_sdk
            start_avd "$2"
            ;;
        "stop")
            stop_all_emulators
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_status $RED "❌ Unknown command: $command"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"