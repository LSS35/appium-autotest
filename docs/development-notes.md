# Development Notes

## CI Environment Limitations

When running in CI environments (like GitHub Actions), some tools may not be fully available:

- Android emulator may not start due to virtualization limitations
- Hardware acceleration (Intel HAXM/Hyper-V) may not be available
- Some system-level tools may be restricted

## Testing in CI

The verification script (`npm run verify-setup`) is designed to work in CI environments and will:
- Show warnings for missing tools that aren't critical for basic verification
- Test installation paths and environment variables
- Validate configuration files
- Check tool availability where possible

## Local Development

For full functionality, run the setup on a local development machine where:
- Virtualization is available for Android emulators
- All system permissions are available
- Interactive installation is possible

## Script Features

### Verification Script (`scripts/verify-setup.js`)
- Comprehensive tool checking
- Environment variable validation
- Appium Doctor integration
- Emulator availability testing
- Appium server startup testing

### Setup Scripts
- **macOS/Linux**: `scripts/setup-macos-linux.sh`
- **Windows**: `scripts/setup-windows.ps1`
- Automated tool installation
- Environment configuration
- Platform-specific optimizations

### AVD Management (`scripts/manage-avd.sh`)
- Create default testing AVDs
- List available virtual devices
- Start/stop emulator management
- Performance optimization

## Usage Patterns

1. **First Time Setup**: Run platform-specific setup script
2. **Verification**: Use `npm run verify-setup` to check installation
3. **Development**: Use NPM scripts for common tasks
4. **Troubleshooting**: Reference `docs/troubleshooting.md`

## Best Practices

- Always verify setup after running installation scripts
- Use AVD management scripts for consistent emulator configuration
- Check environment variables are properly set
- Use the troubleshooting guide for common issues
- Keep tools updated regularly