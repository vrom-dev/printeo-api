require('dotenv').config()
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

module.exports = {
  AWS_BUCKET_NAME,
  AWS_DEFAULT_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
}
