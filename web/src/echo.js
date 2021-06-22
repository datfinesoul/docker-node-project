const sleep = t => new Promise(resolve => setTimeout(resolve, t))
const jsonlog = v => console.log(JSON.stringify({
  ...{_ts: (new Date()).getTime()}, ...v
}, null, 0))

/*
 * Random Number Generator
 */
function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min)
};

module.exports = config => {
  const express = require('express')
  const router = express.Router()

  router.get('/time', async (req, res) => {
    return res.status(200).json({
      time: (new Date()).getTime()
    })
  })

  router.get('/', async(req, res) => {
    jsonlog({ query: req.query })
    // wait 25 - 250 milliseconds
    await sleep(getRandomIntInclusive(1, 10) * 25)
    return res.status(200).json(req.query);
  })

  return router
}
