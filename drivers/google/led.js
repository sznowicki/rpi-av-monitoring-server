const Gpio = require('pigpio').Gpio;

class Led {
 constructor() {
   this.led = new Gpio(25, { mode: Gpio.OUTPUT});
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

}

module.exports = new Led();