const Gpio = require('pigpio').Gpio;
const sleep = require('../../helpers/sleep');

const DEFAULT_BRIGHTNESS = 0.01;

class Led {
  constructor() {
    this.led = new Gpio(25, { mode: Gpio.OUTPUT });
    this.setBrightness(0.01);
  }

  on() {
    this.led.digitalWrite(1);
    return this;
  }

  off() {
    this.led.digitalWrite(0);

    return this;
  }

  setBrightness(level) {
    this.led.pwmWrite(Math.floor(255 * level));

    return this;
  }

  getBrightness() {
    return this.led.getPwmDutyCycle();
  }

  resetBrightness() {
    this.setBrightness(DEFAULT_BRIGHTNESS)
  }

  async pulse(times) {
    for (let i; i < times; i++) {
      let level = 0.01;
      while(level >= 1) {
        this.setBrightness(level);
        level += 0.01;
        await sleep(1);
      }
      while(level <= 0.01) {
        this.setBrightness(level);
        level -= 0.01;
        await sleep(1);
      }
    }
    this.resetBrightness();
  }
}

module.exports = new Led();