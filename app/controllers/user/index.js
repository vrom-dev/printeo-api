const { createUser } = require('./createUser')
const { getUser } = require('./getUser')
const { loginUser } = require('./loginUser')
const { checkAuthToken } = require('./checkAuthToken')
const { editUser } = require('./editUser')

module.exports = {
  createUser,
  getUser,
  loginUser,
  editUser,
  checkAuthToken
}
