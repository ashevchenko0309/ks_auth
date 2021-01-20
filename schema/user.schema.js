const { Text, Password, Checkbox, Select, DateTimeUtc } = require("@keystonejs/fields")
const createdAt = require("../custom-fields/createdAt.field")
const updatedAt = require("../custom-fields/updatedAt.field")
const isAdmin = require("../access-control/is-admin")

module.exports = {
  fields: {
    email: {
      type: Text,
      isUnique: true,
      isRequired: true,
    },
    passwordHash: {
      type: Password,
      isRequired: true,
    },
    createdAt: { ...createdAt, },
    updatedAt: { ...updatedAt, },
    role: {
      type: Select,
      options: ["trainee", "trainer", "admin"],
      isRequired: true,
      defaultValue: "trainer",
      access: {
        update: isAdmin,
      },
    },
    isEmailConfirmed: {
      type: Checkbox,
      defaultValue: false,
    },
  },
  plural: "_Users",
  label: "Users",
  access: {
    read: true,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    auth: true,
  },
}