const express = require('express')
const bodyParser = require("body-parser")
const PlacesRouter = require('./Routes/places-routes')
const UserRouter = require('./Routes/users-routes')
const app = express()


app.use('/api/places',PlacesRouter)
// app.use('/api/user', UserRouter)
app.use((error, req, res, next) => {
    if(res.headerSent)
    {
        return next(error)
    }
    res.status(error.code || 500)
})
app.listen(5000)
