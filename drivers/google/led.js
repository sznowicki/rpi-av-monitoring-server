const Gpio = require('onoff').Gpio;

class Led {
 get constants() {
   return {
     OFF: 0,
     ON: 1,
     BLINK: 2,
     BLINK_3: 3,
     BEACON: 4,
     BEACON_DARK: 5,
     DECAY: 6,
     PULSE_SLOW: 7,
     PULSE_QUICK: 8,
   }
 }

 constructor() {
   this.led1 = new Gpio(13);
   this.led2 = new Gpio(14)
 }

 set() {
   this.led1.writeSync(1);
 }
}