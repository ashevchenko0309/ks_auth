const { DateTimeUtc } = require("@keystonejs/fields")

module.exports = {
  type: DateTimeUtc,
  access: {
    read: false,
    update: false,
    delete: false
  },
  hooks: {
    resolveInput: async ({ operation, resolvedData }) => {
      if (operation === "create") {
        return new Date().toISOString()
      }
      return resolvedData.createdAt
    },
  }
}