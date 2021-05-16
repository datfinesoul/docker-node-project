module.exports = config => {
  const express = require('express');
  const bodyParser = require('body-parser');


  if (typeof configured !== 'undefined') {
    return configured;
  }

  configured = true;
  for (let key in config) {
    if (typeof config[key] === 'undefined') {
      configured = false;
      throw new Error(`${key} is not configured`);
    }
  }

  const app = express();

  // parse application/json
  app.use(bodyParser.json({
    strict: true
  }));

  app.use((err, req, res, next) => {
    if (err?.type === 'entity.parse.failed') {
      return res.status(400).json({
        status: 'fail',
        reason: err.type,
        sha: config.sha
      });
    }
    return next(err);
  });

  /**
   * Your app must have a basic healthcheck. It should be very lightweight.
   * It cannot be behind auth, or ECS will never register it as healthy.
   *
   * Your app should not register healthy if it is missing required config
   *
   * It may also be beneficial to have a separate healthcheck that does more
   * to validate the functional health of the app.
   */
  app.get(config.healthcheck, async (_, res) => {
    return res.status(200).json({
      status: 'up',
      sha: config.sha
    });
  });

  app.post('/log', async (req, res) => {
    console.log(JSON.stringify({ '_ts': Date.now(), ...req.body }, null, 0));
    return res.status(200).json({
      status: 'okay',
      sha: config.sha
    });
  });

  return app;
};
