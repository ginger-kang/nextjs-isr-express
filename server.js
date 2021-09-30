// client/server.js

const { createServer } = require('http')
const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) => {
    return app.render(req, res, '/')
  })

  server.get('*', (req, res) => {
    const t = process.hrtime()

    const handle = app.getRequestHandler()

    console.log(process.hrtime(t), req.params, res)
    return handle(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('listening to 3000')
  })
})
