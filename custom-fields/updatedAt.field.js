const { DateTimeUtc } = require("@keystonejs/fields")

module.exports = {
  type: DateTimeUtc,
  access: {
    read: false,
    update: false,
    delete: false
  },
  hooks: {
    resolveInput: async ({ operation }) => {
      if (operation === "update") {
        return new Date().toISOString()
      }
      return new Date().toISOString()
    },
  }
}