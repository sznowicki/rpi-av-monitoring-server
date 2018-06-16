const button = require('../drivers/google/button');
const led = require('../drivers/google/led');

let shutdownConfirmMode = false;
let shuttingDownPendingTimeout;
function start() {
  button.on('buttonController', 'press', () => {
    console.log('press');
    if (shutdownConfirmMode) {
      console.log('Shutting down, scheduled by user.');
    }
    led.setBrightness(1);
    setTimeout(() => led.resetBrightness(), 15000);
  });

  button.on('buttonController', 'longPress', async () => {
    console.log('longPress');
    clearTimeout(shuttingDownPendingTimeout);
    shutdownConfirmMode = true;
    await led.pulse(5);
    shutdownConfirmMode = false;
  });
}

function stop() {
  button.off('buttonController');
}

module.exports = {
  start,
  stop,
};
