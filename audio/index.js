const { exec } = require('child_process');
const { config, getExec} = require('../helpers/config');

function start() {
  return new Promise((resolve, reject) => {
    exec(
      getExec('audio'),
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
  });
}

function stop() {
  exec(`sudo killall ${config.audio.processName}`);
}

module.exports = {
  start,
  stop
};
