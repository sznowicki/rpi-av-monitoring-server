const sleep = require('./sleep');

describe('Sleep', () => {
  it('should return promise and resolve after timeout', async () => {
    const now = Date.now();
    await sleep(1);
    expect(Date.now() - now).toBeGreaterThan(0);
  });
});