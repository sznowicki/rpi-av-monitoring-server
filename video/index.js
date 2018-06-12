const { exec } = require('child_process');
const { config, getExec }= require('../helpers/config');

function start({ directory }) {
  return new Promise((resolve, reject) => {
    exec(
      getExec('video'),
      {
        cwd: config.video.cwd,
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
  exec(`sudo killall ${config.video.processName}`);
}

module.exports = {
  start,
  stop,
};
