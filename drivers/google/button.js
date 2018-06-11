const Gpio = require('pigpio').Gpio;

class Button {
  constructor() {
    this.button = new Gpio(23, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_DOWN,
      edge: Gpio.EITHER_EDGE
    });

    this.button.pwmFrequency(50);
    console.log(this.button.getPwmFrequency());

    this.events = {
      interrupt: {},
      longPress: {},
      press: {}
    };

    this.listen();
  }

  listen() {
    this.button.on('interrupt', function (level) {
      Object.keys(this.events.interrupt).forEach((ns) => {
        this.events.interrupt[ns].forEach(cb => cb())
      });
      console.log('interrupt', level);
    });
  }

  on(ns, event, cb) {
    if (!this.events[event][ns]) {
      this.events[event][ns] = [];
    }
    this.events[event][ns].push(cb);
  }

  off(ns, event) {
    if (event && this.events[event][ns]) {
      delete this.events[event][ns];
      return;
    }

    Object.keys(this.events).forEach(ev => {
      if (!this.events[ev][ns]) {
        return;
      }
      delete this.events[ev][ns];
    });
  }
}

module.exports = new Button();
