const wdio = require('webdriverio');
const assert = require('assert');

const opts = {
  port: 4723,
  desiredCapabilities: {
    platformName: 'Android',
    deviceName: 'Android Emulator',
    app: '../app/build/outputs/apk/debug/app-debug.apk',
    automationName: 'UiAutomator2'
  }
};

const client = wdio.remote(opts);

describe('Test', function() {
  this.timeout(0);

  before(async function() {
    await client.init();
  });

  after(async function() {
    await client.end();
  });

  it('should say HelloWorld', async function() {
    await client.click('~testButton')
      .pause(1000);
    const value = await client.getText('~testLabel');
    assert.equal(value, 'HelloWorld');
  });
});
