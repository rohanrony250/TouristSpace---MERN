const express = require('express')
const bodyParser = require("body-parser")
const PlacesRouter = require('./Routes/places-routes')
const UsersRouter = require('./Routes/users-routes')
const HttpError = require('./models/http-error')
const app = express()

app.use(bodyParser.json())
app.use('/api/places',PlacesRouter)
app.use('/api/users', UsersRouter)

// error handling for unsupported routes
app.use((req, res, next) => {
    const Error = new HttpError('Could not find this route', 404)
    throw Error;
})

// general error handling
app.use((error, req, res, next) => {
    if(res.headerSent)
    {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || "unknown error occurred... "})
})
app.listen(5000)
