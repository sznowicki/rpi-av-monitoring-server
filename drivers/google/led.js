const { Gpio } = require('../gpio');
const sleep = require('../../helpers/sleep');


const DEFAULT_BRIGHTNESS = 0.01;

class Led {
  constructor() {
    this.led = new Gpio(25, { mode: Gpio.OUTPUT });
  }

  on() {
    this.led.digitalWrite(1);
    this.setBrightness(0.01);
    return this;
  }

  off() {
    this.led.digitalWrite(0);

    return this;
  }

  setBrightness(level) {
    const sanitizedLevel = Math.round(level * 100) / 100;
    let value = 255 * sanitizedLevel;
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    this.led.pwmWrite(Math.floor(value));

    return this;
  }

  getBrightness() {
    return this.led.getPwmDutyCycle();
  }

  resetBrightness() {
    this.on();
    this.setBrightness(DEFAULT_BRIGHTNESS);

    return this;
  }

  async pulse(times) {
    const sleepTime = 35;
    for (let i = 0; i < times; i++) {
      console.time(i);
      let level = 0.1;
      while(level <= 1) {
        this.setBrightness(level);
        level += 0.1;
        await sleep(sleepTime);
      }
      while(level >= 0.1) {
        this.setBrightness(level);
        level -= 0.1;
        await sleep(sleepTime);
      }
      console.timeEnd(i);
    }
    this.resetBrightness();
  }
}

module.exports = new Led();