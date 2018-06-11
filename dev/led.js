const led = require('../drivers/google/led');

function start() {
  led.on();
}

function stop() {
  led.off();
}

module.exports = {
  start,
  stop
};
