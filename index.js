const video = require('./video');
const audio = require('./audio');
const sleep = require('./helpers/sleep');
const led = require('./drivers/google/led');
const button = require('./drivers/google/button');

let killing = false;
async function watchVideo() {
  console.log('Video starts')
  try {
    const directory = '/home/pi/stream/mjpg-streamer/mjpg-streamer-experimental';
    await video.start({ directory })
  } catch (err) {
    if (killing) {
      console.log('Exiting video');
      return;
    }
    console.log('video stream errored', err);
  }

  console.log('Video - restart in 1s');
  video.stop();
  await sleep(1000);
  watchVideo();
}

async function watchAudio() {
  console.log('Audio starts');
  try {
    await audio.start();
  } catch(err) {
    if (killing) {
      console.log('Exiting audio');
      return;
    }
    console.log('audio stream errored', err);
  }
  console.log('Audio - restart in 1s');
  audio.stop();
  await sleep(1000);
  watchAudio();
}

led.on().setBrightness(0.01);
watchAudio();
watchVideo();

process.on('SIGINT', function () {
  killing = true;
  video.stop();
  audio.stop();
  led.off();
});

let restartTimeout;
button.on('main', 'interrupt', () => {
  console.warn('Interrupt, stopping the audio.');
  clearTimeout(restartTimeout);
  audio.stop();
  setTimeout(() => watchAudio(), 5000);
});
