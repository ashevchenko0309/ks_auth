const { Keystone } = require("@keystonejs/keystone")
const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex")
const { PasswordAuthStrategy } = require("@keystonejs/auth-password")

const KeystoneConstants = require("./constants/keystone.constants")

const initialiseData = require("./initial-data")

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
      onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
    });

    return this
  }

  initAuthStrategy() {
    const auth = this.keystone.createAuthStrategy({
      type: PasswordAuthStrategy,
      list: KeystoneConstants.AUTH_DB_LIST,
      config: { protectIdentities: process.env.NODE_ENV === "production" },
    });

    this.authStrategy = auth

    return this
  }

  initLists(lists){
    lists.forEach(({name, schema}) => {
      this.keystone.createList(name, schema)
    })
    return this
  }
}

module.exports = KeystoneInit