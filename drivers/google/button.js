const { Gpio } = require('../gpio');

class Button {
  constructor() {
    this.button = new Gpio(23, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_DOWN,
      edge: Gpio.EITHER_EDGE
    });

    this.button.pwmFrequency(800);
    console.log('Frequency is:', this.button.getPwmFrequency());

    this.events = {
      interrupt: {},
      longPress: {},
      press: {}
    };

    this.lastPullDown = 0;
    this.longPressTimeout = 0;
    this.listen();
  }

  scheduleLongPress() {
    this.longPressTimeout = setTimeout(() => {
      this.trigger('longPress');
    }, 5000);
  }

  clearLongPress() {
    clearTimeout(this.longPressTimeout);
  }

  listen() {
    this.button.on('interrupt', (level) => {
      console.log('interrupt', level);
      this.trigger('interrupt', { level });
      if (level === 0) {
        this.clearLongPress();
        this.scheduleLongPress();
        this.lastPullDown = Date.now();
      } else {
        this.clearLongPress();
        const secondsFromLastPullDown = Math.round((Date.now() - this.lastPullDown) / 1000);
        if (secondsFromLastPullDown < 5) {
          this.trigger('press');
        }
      }
    });
  }

  trigger(event, { level } = {}) {
    Object.keys(this.events[event]).forEach((ns) => {
      this.events[event][ns].forEach(cb => cb({ level }))
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
