const { exec } = require('child_process');

function start({ directory }) {
  return new Promise((resolve, reject) => {
    exec(
      `${directory}/mjpg_streamer -o "output_http.so -w ./www" -i "input_raspicam.so"`,
      {
        cwd: directory,
        uid: 1000,
      },
      (error, stdout, stderr) => {
        if (error) {
          console.log('ERROR', error);
        }
        if (stdout) {
          console.log('FINISHED', stdout);
        }
        if (stderr) {
          console.log('STD_ERR', stderr);
        }

        if (error || stderr) {
          return reject(error || stderr);
        }

        return resolve(stdout);
      }
    )
  })
}

function stop() {
  exec('sudo killall mjpg_streamer');
}

module.exports = {
  start,
  stop,
};
