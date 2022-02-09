const express = require('express')
const { PORT } = require('./config')
const app = express()
const cors = require('cors')
const { connect } = require('mongoose')
const { MONGODB_CONFIG, MONGODB_URI } = require('./config')

// MIDDLEWARES
const errorHandler = require('./middlewares/errorHandler')

// ROUTES
const fileRouter = require('./routes/file')
const printRouter = require('./routes/print')
const userRouter = require('./routes/user')
const printerRouter = require('./routes/printer')
const orderRouter = require('./routes/order')

connect(MONGODB_URI, MONGODB_CONFIG)

app.use(express.json())
app.use(cors())

app.use(fileRouter)
app.use(printRouter)
app.use(userRouter)
app.use(printerRouter)
app.use(orderRouter)

app.use(express.urlencoded({ extended: true }))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
