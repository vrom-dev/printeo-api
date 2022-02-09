const { createUser } = require('./createUser')
const { getUser } = require('./getUser')
const { loginUser } = require('./loginUser')
const { getUserId } = require('./getUserId')
const { editUser } = require('./editUser')

module.exports = {
  createUser,
  getUser,
  loginUser,
  editUser,
  getUserId
}
