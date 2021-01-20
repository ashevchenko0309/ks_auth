const { Text, Password, Checkbox, Select } = require("@keystonejs/fields")
const { AutoIncrement } = require("@keystonejs/fields-auto-increment");
const { atTracking } = require("@keystonejs/list-plugins")
const isAdmin = require("../access-control/is-admin")

module.exports = {
  fields: {
    email: {
      type: Text,
      isUnique: true,
      isRequired: true,
    },
    role: {
      type: Select,
      options: ["trainee", "trainer", "admin"],
      isRequired: true,
      defaultValue: "trainer",
      access: {
        update: isAdmin,
      },
    },
    password: {
      type: Password,
      isRequired: true,
    },
    isEmailConfirmed: {
      type: Checkbox,
      defaultValue: false,
    },
    usersPkey: {
      type: AutoIncrement,
      gqlType: "Int",
      isUnique: true,
    }
  },
  plugins: [
    atTracking(),
  ],
  // List-level access controls
  access: {
    read: isAdmin,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    auth: true,
  },
}