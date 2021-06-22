module.exports = config => {
  const express = require('express')
  const router = express.Router()

  router.get('/', async (req, res) => {
    return res.status(200).json({
      token: (new Date()).getTime()
    })
  })

  return router
}
