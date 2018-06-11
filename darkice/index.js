const { exec } = require('child_process');

function start() {
  return new Promise((resolve, reject) => {
    exec(
      `darkice -c ~/.darkice-s2ip.cfg -v 0`,
      {
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
  });
}

function stop() {
  exec('sudo killall darkice');
}
module.exports = {
  start,
  stop
};
