#!/usr/bin/env node

/**
 * Verification script for Appium Mobile Automation Setup
 * This script checks if all required tools are properly installed and configured
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class SetupVerifier {
    constructor() {
        this.results = [];
        this.errors = [];
        this.warnings = [];
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = {
            'info': '📋',
            'success': '✅',
            'error': '❌',
            'warning': '⚠️'
        }[type] || 'ℹ️';
        
        console.log(`${prefix} ${message}`);
        
        if (type === 'error') {
            this.errors.push(message);
        } else if (type === 'warning') {
            this.warnings.push(message);
        }
    }

    async checkCommand(command, expectedVersion = null, description = '') {
        try {
            const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
            
            if (expectedVersion) {
                if (output.includes(expectedVersion)) {
                    this.log(`${description} - Version check passed`, 'success');
                    return true;
                } else {
                    this.log(`${description} - Version mismatch. Expected: ${expectedVersion}`, 'warning');
                    this.log(`Actual output: ${output.trim()}`, 'info');
                    return false;
                }
            } else {
                this.log(`${description} - Found`, 'success');
                return true;
            }
        } catch (error) {
            this.log(`${description} - Not found or failed: ${error.message}`, 'error');
            return false;
        }
    }

    async checkEnvironmentVariable(varName, description = '') {
        const value = process.env[varName];
        if (value) {
            this.log(`${description} (${varName}): ${value}`, 'success');
            return true;
        } else {
            this.log(`${description} (${varName}) - Not set`, 'error');
            return false;
        }
    }

    async checkDirectory(dirPath, description = '') {
        if (fs.existsSync(dirPath)) {
            this.log(`${description}: ${dirPath}`, 'success');
            return true;
        } else {
            this.log(`${description}: ${dirPath} - Not found`, 'error');
            return false;
        }
    }

    async checkJava() {
        this.log('🔍 Checking Java installation...', 'info');
        
        const javaCheck = await this.checkCommand('java -version', '17', 'Java JDK');
        const javacCheck = await this.checkCommand('javac -version', '17', 'Java Compiler');
        const javaHomeCheck = await this.checkEnvironmentVariable('JAVA_HOME', 'Java Home');
        
        return javaCheck && javacCheck && javaHomeCheck;
    }

    async checkNodeJs() {
        this.log('🔍 Checking Node.js installation...', 'info');
        
        const nodeCheck = await this.checkCommand('node --version', null, 'Node.js');
        const npmCheck = await this.checkCommand('npm --version', null, 'NPM');
        
        return nodeCheck && npmCheck;
    }

    async checkGradle() {
        this.log('🔍 Checking Gradle installation...', 'info');
        return await this.checkCommand('gradle --version', null, 'Gradle');
    }

    async checkAndroidSDK() {
        this.log('🔍 Checking Android SDK installation...', 'info');
        
        const androidHomeCheck = await this.checkEnvironmentVariable('ANDROID_HOME', 'Android SDK Home');
        
        if (androidHomeCheck) {
            const androidHome = process.env.ANDROID_HOME;
            const platformToolsCheck = await this.checkDirectory(path.join(androidHome, 'platform-tools'), 'Platform Tools');
            const buildToolsCheck = await this.checkDirectory(path.join(androidHome, 'build-tools'), 'Build Tools');
            const adbCheck = await this.checkCommand('adb version', null, 'ADB (Android Debug Bridge)');
            
            return platformToolsCheck && buildToolsCheck && adbCheck;
        }
        
        return false;
    }

    async checkAppium() {
        this.log('🔍 Checking Appium installation...', 'info');
        
        const appiumCheck = await this.checkCommand('appium --version', null, 'Appium Server');
        
        if (appiumCheck) {
            try {
                const drivers = execSync('appium driver list', { encoding: 'utf-8', stdio: 'pipe' });
                if (drivers.includes('uiautomator2')) {
                    this.log('UIAutomator2 driver - Installed', 'success');
                } else {
                    this.log('UIAutomator2 driver - Not installed', 'warning');
                }
            } catch (error) {
                this.log('Failed to check Appium drivers', 'warning');
            }
        }
        
        return appiumCheck;
    }

    async checkAppiumDoctor() {
        this.log('🔍 Running Appium Doctor...', 'info');
        
        try {
            const output = execSync('appium-doctor', { encoding: 'utf-8', stdio: 'pipe' });
            
            if (output.includes('✔') || output.includes('All checks passed')) {
                this.log('Appium Doctor - All checks passed', 'success');
                return true;
            } else {
                this.log('Appium Doctor - Some checks failed', 'warning');
                this.log('Full Appium Doctor output:', 'info');
                console.log(output);
                return false;
            }
        } catch (error) {
            this.log(`Appium Doctor failed: ${error.message}`, 'error');
            return false;
        }
    }

    async checkEmulator() {
        this.log('🔍 Checking Android Emulator...', 'info');
        
        try {
            const output = execSync('emulator -list-avds', { encoding: 'utf-8', stdio: 'pipe' });
            const avds = output.trim().split('\n').filter(line => line.trim());
            
            if (avds.length > 0) {
                this.log(`Found ${avds.length} AVD(s): ${avds.join(', ')}`, 'success');
                return true;
            } else {
                this.log('No Android Virtual Devices found', 'warning');
                this.log('Create an AVD in Android Studio or using avdmanager', 'info');
                return false;
            }
        } catch (error) {
            this.log(`Emulator check failed: ${error.message}`, 'error');
            return false;
        }
    }

    async testAppiumServer() {
        this.log('🔍 Testing Appium Server startup...', 'info');
        
        return new Promise((resolve) => {
            const appiumProcess = spawn('appium', ['--session-override'], {
                stdio: 'pipe'
            });
            
            let serverStarted = false;
            const timeout = setTimeout(() => {
                if (!serverStarted) {
                    appiumProcess.kill();
                    this.log('Appium Server - Startup timeout', 'error');
                    resolve(false);
                }
            }, 10000);
            
            appiumProcess.stdout.on('data', (data) => {
                const output = data.toString();
                if (output.includes('Appium REST http interface listener started')) {
                    serverStarted = true;
                    clearTimeout(timeout);
                    appiumProcess.kill();
                    this.log('Appium Server - Started successfully', 'success');
                    resolve(true);
                }
            });
            
            appiumProcess.stderr.on('data', (data) => {
                const output = data.toString();
                if (output.includes('Error') || output.includes('EADDRINUSE')) {
                    clearTimeout(timeout);
                    appiumProcess.kill();
                    this.log(`Appium Server - Error: ${output}`, 'error');
                    resolve(false);
                }
            });
            
            appiumProcess.on('error', (error) => {
                clearTimeout(timeout);
                this.log(`Appium Server - Failed to start: ${error.message}`, 'error');
                resolve(false);
            });
        });
    }

    async runVerification() {
        console.log('🚀 Starting Appium Mobile Automation Setup Verification...\n');
        
        const checks = [
            { name: 'Java JDK 17', fn: () => this.checkJava() },
            { name: 'Node.js', fn: () => this.checkNodeJs() },
            { name: 'Gradle', fn: () => this.checkGradle() },
            { name: 'Android SDK', fn: () => this.checkAndroidSDK() },
            { name: 'Appium', fn: () => this.checkAppium() },
            { name: 'Android Emulator', fn: () => this.checkEmulator() },
            { name: 'Appium Doctor', fn: () => this.checkAppiumDoctor() },
            { name: 'Appium Server Test', fn: () => this.testAppiumServer() }
        ];
        
        for (const check of checks) {
            try {
                const result = await check.fn();
                this.results.push({ name: check.name, passed: result });
                console.log(''); // Add spacing between checks
            } catch (error) {
                this.log(`${check.name} - Unexpected error: ${error.message}`, 'error');
                this.results.push({ name: check.name, passed: false });
            }
        }
        
        this.printSummary();
    }

    printSummary() {
        console.log('\n📊 VERIFICATION SUMMARY');
        console.log('========================');
        
        let passedCount = 0;
        
        this.results.forEach(result => {
            const status = result.passed ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} ${result.name}`);
            if (result.passed) passedCount++;
        });
        
        console.log(`\n📈 Overall: ${passedCount}/${this.results.length} checks passed`);
        
        if (this.errors.length > 0) {
            console.log('\n❌ ERRORS TO FIX:');
            this.errors.forEach(error => console.log(`   • ${error}`));
        }
        
        if (this.warnings.length > 0) {
            console.log('\n⚠️  WARNINGS:');
            this.warnings.forEach(warning => console.log(`   • ${warning}`));
        }
        
        if (passedCount === this.results.length) {
            console.log('\n🎉 All checks passed! Your mobile automation setup is ready!');
        } else {
            console.log('\n🔧 Some issues found. Please address the errors and warnings above.');
        }
    }
}

// Run verification
const verifier = new SetupVerifier();
verifier.runVerification().catch(error => {
    console.error('❌ Verification failed:', error);
    process.exit(1);
});