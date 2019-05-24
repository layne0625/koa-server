const Koa = require('koa')
const Router = require('koa-router')
const morgan = require('koa-morgan')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
const session = require('./middleware/session')
const auth = require('./middleware/auth')
const errorHandle = require('./middleware/error-handle')
const router = new Router()
const app = new Koa()

app.use(morgan('combined'))
app.use(errorHandle())
app.use(session(config))
app.use(bodyParser())
app.use(auth(config))

require('./routes')(router)
app.use(router.routes()).use(router.allowedMethods({
  throw: true
}))


app.listen(8088)