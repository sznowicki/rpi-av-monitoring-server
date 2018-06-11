const mjpeg = require('./mjpeg-stream');
const audio = require('./darkice');
const sleep = require('./helpers/sleep');

async function watchVideo() {
  try {
    const directory = '/home/pi/stream/mjpg-streamer/mjpg-streamer-experimental';
    await mjpeg.start({ directory })
  } catch (err) {
    console.log('video stream errored', err);
  }

  console.log('Video - restart in 1s');
  await sleep(1000);
  watchVideo();
}

async function watchAudio() {
  try {
    await audio.start();
  } catch(err) {
    console.log('audio stream errored', err);
  }
  console.log('Audio - restart in 1s');
  await sleep(1000);
  watchAudio();
}

watchAudio();
watchVideo();

process.on('SIGINT', function () {
  video.stop();
  audio.stop();
});
