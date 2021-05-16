module.exports = async () => {
  const { readFile } = require('fs/promises');
  //const ref = await readFile('./.ref.json', 'utf8')
  //  .then(JSON.parse)
  //  .catch(error => {
  //    console.error(error);
  //    return null;
  //  });
  return {
    /**
     * It is helpful to derive the healthcheck from the environment
     * to avoid config mismatch.
     * */
    healthcheck: process.env.HEALTHCHECK || '/healthcheck',
    // Your app should always accept a port override via the PORT envvar
    port: process.env.PORT || 3000,

    sha: process.env.GITHUB_SHA || 'unknown'
    //sha: ref?.sha || process.env.GITHUB_SHA || 'unknown'
  };
};
