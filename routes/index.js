module.exports = (router) => {
  require('./user')(router)
  require('./common')(router)
}