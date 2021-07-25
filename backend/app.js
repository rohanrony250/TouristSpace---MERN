const express = require('express')
const mongoose = require ('mongoose')
const bodyParser = require("body-parser")
const PlacesRouter = require('./Routes/places-routes')
const UsersRouter = require('./Routes/users-routes')
const HttpError = require('./models/http-error')
const app = express()
const mongoUrl = 'mongodb+srv://Rohan:6rztkqYYPCIm6ZkO@cluster0-touristspace.nmdjw.mongodb.net/places_database?retryWrites=true&w=majority'

app.use(bodyParser.json())

//dealing with headers and CORS policy

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

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

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(5000)
})
.catch((err) => {
    console.log(err)
})

