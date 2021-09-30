const http = require('http')
const express = require('express')
const path = require('path')
const next = require('next')
const conf = require('./client/next.config.js')

const app = express()
const dev = process.env.NODE_ENV !== 'production'
const nextServer = next({
  dev,
  conf,
  dir: path.resolve('./client'),
})

nextServer.prepare().then(() => {
  app.get('*', async (req, res) => {
    const t = process.hrtime()
    const requestHandler = nextServer.getRequestHandler()

    const handle = await requestHandler

    console.log(process.hrtime(t))
    return handle(req, res)
  })

  app.listen(3000, () => {
    console.log('server running on port 3000')
  })
})
