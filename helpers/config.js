const config = require('../config.json');

function getConfig() {
  return config;
}

function getExecAtts(type) {
  const app = getConfig()[type];
  let merged = [];
  const { atts } = app;
  Object.keys(atts).forEach((key) => {
    merged.push(`${key} ${atts[key]}`);
  });

  return merged.join(' ');
}

function getExec(type) {
  return `${config[type].exec} ${getExecAtts(type)}`;
}

module.exports = {
  config: getConfig(),
  getExecAtts,
  getExec,
};
