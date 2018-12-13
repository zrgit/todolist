const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const router = require('./server/routes/index')
const jwt = require('koa-jwt')
const cors = require('koa2-cors');
const secret = require('./server/config/secret.json')
const err = require('./server/middlreware/error')
const app = new Koa()

app.use(err())
app.use(logger())
app.use(bodyParser())
app.use(cors())

app.use(jwt({
  secret: secret.sign
}).unless({
  path: [/^\/api\/login/, /^\/api\/createUser/]
}))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log(`server running success....`)
})
