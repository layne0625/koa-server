const Redis = require('ioredis');
const uid = require('uid-safe');
const {
  getDomain
} = require('tldjs');


module.exports = (config) => {
  class RedisStore {
    constructor() {
      this.redis = new Redis(config.redis);
    }
  
    async get(sid, options) {
      const uuid = await this.redis.get(`sessionsid:${sid}`);
      return !uuid ? {} : JSON.parse(uuid);
    }
  
    async del(sid) {
      await this.redis.del(`sessionsid:${sid}`);
    }
  
    async set(sid, data, options) {
      const aaa = await this.redis.set(`sessionsid:${sid}`, JSON.stringify(data), 'PX', options.maxAge);
    }
  
    async refresh(sid, options) {
      await this.redis.pexpire(`sessionsid:${sid}`, options.maxAge);
    }
  }

  const options = {
    ...config.session,
    store: new RedisStore()
  }

  return async (ctx, next) => {
    const cookieOpts = options.domain ? options : Object.assign({}, options, {
      domain: getDomain(ctx.hostname)
    })
    let id = ctx.cookies.get(cookieOpts.key, cookieOpts);
    if (!id) {
      ctx.session = {};
    } else {
      ctx.session = await cookieOpts.store.get(id, cookieOpts);
      ctx.session = typeof ctx.session === 'string' ? {} : ctx.session;
    }

    Object.defineProperties(ctx.session, {
      maxAge: {
        set(val) {
          this._MAXAGE_ = val;
        },
        get() {
          return this._MAXAGE_ || cookieOpts.maxAge;
        },
        enumerable: false,
        configurable: true,
      },
    });

    const old = JSON.stringify(ctx.session);

    await next();

    const onlyRefresh = old === JSON.stringify(ctx.session);

    if (onlyRefresh && id) {
      await cookieOpts.store.refresh(id, cookieOpts);
      ctx.cookies.set(cookieOpts.key, id, cookieOpts);
      return;
    }
    if (!id) {
      id = uid.sync(24);
    }
    await cookieOpts.store.set(id, ctx.session, cookieOpts);
    ctx.cookies.set(cookieOpts.key, id, cookieOpts);
  };
}