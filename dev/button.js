const button = require('../drivers/google/button');
const led = require('../drivers/google/led');

let shutdownConfirmMode = false;
let shuttingDownPendingTimeout;
function start() {
  button.on('buttonController', 'interrupt', () => {
    console.warn('Interrupt');
  });

  button.on('buttonController', 'press', () => {
    if (shutdownConfirmMode) {
      console.log('Shutting down, scheduled by user.');
    }
    led.setBrightness(1);
    setTimeout(() => led.resetBrightness(), 15000);
  });

  button.on('buttonController', 'longPress', async () => {
    clearTimeout(shuttingDownPendingTimeout);
    shutdownConfirmMode = true;
    led.pulse(5);
    shuttingDownPendingTimeout = setTimeout(() => {
      shutdownConfirmMode = false;
    }, 5000);
  });
}

module.exports = start;
