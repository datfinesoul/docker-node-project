module.exports = config => {
  const express = require('express')
  const router = express.Router()

  router.get('/time', async (req, res) => {
    return res.status(200).json({
      time: (new Date()).getTime()
    })
  })

  router.get('/', async(req, res) => {
    return res.status(200).send(req.query);
  })

  return router
}
