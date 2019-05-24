const models = require('../models')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const saltRounds = 10

module.exports = (router) => {
  router.get('/user', async (ctx) => {
    const userId = ctx.session.userId
    const userInfo = await models.User.findOne({
      where: {
        id: userId
      },
      attributes: ['username', 'createdAt', 'avatar', 'points']
    })
    ctx.body = userInfo
  })

  router.get('/signUp', async (ctx) => {
    const {
      username,
      password
    } = ctx.query
    const userInfo = await models.User.findOne({
      where: {
        username,
      },
    })
    if (userInfo) {
      throw new Error('用户名已存在')
    } else {
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const userInfo = await models.User.create({
        username,
        password: passwordHash
      })
      ctx.session.userId = userInfo.id
      ctx.body = {
        success: true
      }
    }
  })

  router.post('/login', async (ctx) => {
    const {
      username,
      password,
      wechatId
    } = ctx.request.body
    if (wechatId) {
      const userInfo = await models.User.findOne({
        where: {
          wechatId
        },
      })
      ctx.session.userId = userInfo.id
      ctx.body = {
        success: true
      }
    } else {
      const userInfo = await models.User.findOne({
        where: {
          username,
        },
      })
      if (userInfo) {
        const valid = await bcrypt.compare(password, userInfo.password)
        if (valid) {
          ctx.session.userId = userInfo.id
          ctx.body = {
            success: true
          }
        } else {
          throw new Error('用户名或密码不正确')
        }
      } else {
        throw new Error('用户名不存在')
      }

    }
  })

  router.get('/logout', (ctx) => {
    ctx.session = {}
    ctx.body = {
      success: true
    }
  })
}