(async () => {
  const config = await require('./config')();
  const app = require('./app')(config);

  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
})();
