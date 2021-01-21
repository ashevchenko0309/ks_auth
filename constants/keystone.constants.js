module.exports = {
  PROJECT_NAME: "auth_app",
  DB_PATH: "postgres://postgres:admin@localhost:5432/auth_app",
  AUTH_DB_LIST: "users",
  SECRET_USER_COLUMN: "passwordHash",
  ADMIN_REFERER: "/admin/signin"
}