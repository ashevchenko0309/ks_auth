const { Keystone } = require("@keystonejs/keystone")
const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex")
const { PasswordAuthStrategy } = require("@keystonejs/auth-password")

const KeystoneConstants = require("./constants/keystone.constants")

class KeystoneInit {
  constructor() {
    this.keystone = null
    this.authStrategy = null
    this.projectName = KeystoneConstants.PROJECT_NAME;
    this.adapterConfig = {
      dropDatabase: process.env.CREATE_TABLES === "true",
      knexOptions: {
        connection: KeystoneConstants.DB_PATH,
      },
    }
    this.authStrategy = null
  }

  initAdapter() {
    this.keystone = new Keystone({
      adapter: new Adapter(this.adapterConfig),
    });

    return this
  }

  initAuthStrategy() {
    const auth = this.keystone.createAuthStrategy({
      type: PasswordAuthStrategy,
      list: KeystoneConstants.AUTH_DB_LIST,
      config: {
        protectIdentities: process.env.NODE_ENV === "production",
        secretField: KeystoneConstants.SECRET_USER_COLUMN,
        
      },
      hooks: {
        afterAuth: ({ item, context }) => {
          if(context.req.headers.referer.indexOf(KeystoneConstants.ADMIN_REFERER) && item.role !== "admin"){
            throw new Error("[passwordAuth:identity:access_not_allowed]")
          }
        }
      }
    });

    this.authStrategy = auth

    return this
  }

  initLists(lists) {
    lists.forEach(({ name, schema }) => {
      this.keystone.createList(name, schema)
    })
    return this
  }
}

module.exports = KeystoneInit