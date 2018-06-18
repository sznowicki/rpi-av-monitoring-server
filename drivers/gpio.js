const pigpio = require('pigpio');

pigpio.configureClock(1, pigpio.CLOCK_PWM);

const Gpio = pigpio.Gpio;

module.exports = {
  Gpio,
};
