const video = require('./video');
const audio = require('./audio');
const sleep = require('./helpers/sleep');

let killing = false;
async function watchVideo() {
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

  console.log('Video - restart in 5s');
  video.stop();
  await sleep(5000);
  watchVideo();
}

async function watchAudio() {
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

watchAudio();
watchVideo();

process.on('SIGINT', function () {
  killing = true;
  video.stop();
  audio.stop();
});
