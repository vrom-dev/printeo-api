const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

// 1 lowercase letter , 1 uppercase letter , 1 digit, 1 special character, and 8 characters long
const validatePassword = (password) => {
  const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
  return regex.test(password)
}

const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9]{4}$/
  return regex.test(username)
}

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername
}
