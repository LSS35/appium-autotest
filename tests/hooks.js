const fs = require('fs');
const path = require('path');

// Ensure artifact directories exist
defaultDirs = ['artifacts/screenshots', 'artifacts/videos'];
defaultDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Mocha global hooks
exports.mochaHooks = {
  beforeEach: async function () {
    if (this.currentTest && this.currentTest.ctx && this.currentTest.ctx.driver) {
      try {
        await this.currentTest.ctx.driver.startRecordingScreen();
      } catch (e) {
        // ignore if not supported
      }
    }
  },
  afterEach: async function () {
    const test = this.currentTest;
    const driver = test && test.ctx && test.ctx.driver;
    const testName = test && test.fullTitle ? test.fullTitle().replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'unknown_test';
    // Screenshot on failure
    if (test && test.state === 'failed' && driver) {
      try {
        const img = await driver.takeScreenshot();
        const filePath = path.join('artifacts/screenshots', `${testName}.png`);
        fs.writeFileSync(filePath, img, 'base64');
      } catch (e) {
        // ignore
      }
    }
    // Stop and save video
    if (driver && driver.stopRecordingScreen) {
      try {
        const videoBase64 = await driver.stopRecordingScreen();
        if (videoBase64) {
          const videoPath = path.join('artifacts/videos', `${testName}.mp4`);
          fs.writeFileSync(videoPath, Buffer.from(videoBase64, 'base64'));
        }
      } catch (e) {
        // ignore
      }
    }
  }
};

