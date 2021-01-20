const { GraphQLApp } = require("@keystonejs/app-graphql")
const { AdminUIApp } = require("@keystonejs/app-admin-ui")
const KeystoneInit = require("./keystone-init")
const { UserSchema } = require("./schema")

const userIsAdmin = require("./access-control/is-admin")
const KeystoneConstants = require("./constants/keystone.constants")

const { keystone, authStrategy } = new KeystoneInit()
  .initAdapter()
  .initLists([{ name: "users", schema: UserSchema, }])
  .initAuthStrategy()

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: KeystoneConstants.PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
      isAccessAllowed: userIsAdmin
    }),
  ],
};
