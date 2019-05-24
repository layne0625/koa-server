module.exports = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      ctx.status = error.status || 500
      ctx.body = {
        message: error.message || 'Internet Server Error'
      }
      return 
    }
  }
}