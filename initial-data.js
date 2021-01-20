module.exports = async keystone => {
  const {
    data: {
      _allUsersMeta: { count = 0 },
    },
  } = await keystone.executeGraphQL({
    context: keystone.createContext({ skipAccessControl: true }),
    query: `
      query {
        _allUserssMeta {
          count
        }
      }
    `,
  });

  if (count === 0) {
    const password = "adminadmin";
    const email = 'admin@example.com';
    const role = "admin"

    const { errors } = await keystone.executeGraphQL({
      context: keystone.createContext({ skipAccessControl: true }),
      query: `
        mutation initialUser($password: String, $email: String, $role: String) {
          createUser(data: {email: $email, role: $role, passwordHash: $password}) {
            id
          }
        }
      `,
      variables: { password, email, role },
    });

    if (errors) {
      console.log('failed to create initial user:');
      console.log(errors);
    } else {
      console.log(`

      User created:
        email: ${email}
        password: ${password}
      `);
    }
  }
};
