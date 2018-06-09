//const Gpio = require('onoff').Gpio;
const mjpeg = require('./mjpeg-stream');
const sleep = require('./helpers/sleep');
async function watchStream() {
  try {
    const directory = '/home/pi/stream/mjpg-streamer/mjpg-streamer-experimental';
    await mjpeg.start({ directory })
  } catch (err) {
    console.log('video stream errored', err);
  }

  console.log('Restart in 1s');
  await sleep(1000);
  watchStream();
}

watchStream();
