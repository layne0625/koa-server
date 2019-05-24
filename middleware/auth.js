const _ = require('lodash')

// POST:/user/create => POST: /user/create
const formatUrl = (urlStr) => {
  if (!urlStr || !_.isString(urlStr)) {
    return ''
  }
  const [method, url = ''] = urlStr.split(':')
  return `${method.trim()}: ${url.trim()}`
}

module.exports = (options) => {
  const whiteList = options.whiteList || []
  return async (ctx, next) => {
    if (!_.isEmpty(whiteList)) {
      const request = whiteList.find(item => formatUrl(item) === `${ctx.method}: ${ctx.path}`)
      if (request) {
        await next()
        return
      }
    }

    if (!ctx.session.userId) {
      ctx.status = 401
      ctx.body = 'Unauthorized'
      return
    }
    await next()
  }
}