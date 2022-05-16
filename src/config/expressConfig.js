const bodyParser = require('body-parser')
const express = require('express')
const compression = require('compression')
const session = require('express-session')
const expressConfig = (app) => {

    app.use(bodyParser.urlencoded({
        extended: true,
    }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    app.use(compression())

    app.set('view engine', 'ejs')

    app.use(session({
        secret: 'Restaurant',
        resave: false,
        saveUninitialized: false,
        expires: new Date(Date.now() + (30 * 86400 * 1000)),
    }))

}

module.exports = expressConfig