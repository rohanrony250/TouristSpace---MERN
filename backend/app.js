const express = require('express')
const bodyParser = require("body-parser")
const PlacesRouter = require('./Routes/places-routes')
const UserRouter = require('./Routes/users-routes')
const app = express()


app.use('/api/places',PlacesRouter)
app.use('/api/user', UserRouter)
app.listen(5000)
