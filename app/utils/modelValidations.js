const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

// 1 lowercase letter (?=.*[a-z]), 1 uppercase letter (?=.*[A-Z]), 1 digit (?=.*[0-9]), 1 special character (?=.*[^A-Za-z0-9]), and 8 characters long(?=.{8,}).
const validatePassword = (password) => {
  const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
  return regex.test(password)
}

module.exports = {
  validateEmail,
  validatePassword
}
