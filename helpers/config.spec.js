const { config, getExecAtts, getExec } = require('./config');

describe('Config helper', () => {
  describe('.config', () => {
    it('should return config', () => {
      expect(typeof config).toBe('object');
      expect(config.hasOwnProperty('video')).toBe(true);
      expect(config.hasOwnProperty('audio')).toBe(true);
    });
  });
  describe('.getExecAtts', () => {
    it('should return non empty string for audio and video', () => {
      expect(typeof getExecAtts('video')).toBe('string');
      expect(typeof getExecAtts('audio')).toBe('string');
      expect(getExecAtts('video').length > 0).toBe(true);
      expect(getExecAtts('audio').length > 0).toBe(true);
    });
  });
  describe('.getExec', () => {
    it('should return a non empty exec for audio and video', () => {
      const execAudio = getExec('audio');
      expect(typeof execAudio).toBe('string');
      expect(execAudio.length).toBeGreaterThan(1);

      const execVideo = getExec('video');
      expect(typeof execVideo).toBe('string');
      expect(execVideo.length).toBeGreaterThan(1);
    })
  })
});
