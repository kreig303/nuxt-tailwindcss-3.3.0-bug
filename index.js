'use strict'

const Koa = require('koa')
const KoaBodyParser = require('koa-bodyparser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = new Koa()
app.use(KoaBodyParser())

// import nuxt config and set dev flag accordingly (affects build)
const nuxtConfig = require('./nuxt.config')

async function start() {
  let server // exportable server object
  const nuxt = new Nuxt(nuxtConfig)
  const {
    host = process.env.HOST,
    port = process.env.PORT,
  } = nuxt.options.server
  await new Builder(nuxt).build()
  // set up listener
  server = app.listen(port, host)
  // ensure we're using nuxt to render
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })
  consola.ready({
    message: `App running on http://${host}:${port}/`,
    badge: true,
  })
  server.on('error', (err) => {
    console.error(err)
  })
  return server
}

module.exports = start()
