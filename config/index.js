const whiteList = [
  'POST: /login',
  'GET: /signUp'
]

module.exports = {
  session: {
    key: 'uuid',
    maxAge: 1000 * 60 * 10,
    domain: ''
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  whiteList,
}