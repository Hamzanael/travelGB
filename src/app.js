const express = require('express')
const configureApp = require('./config/appConfig')
const port = process.env.PORT
const app = express()
const routes = require('./api/api')
const mainRouter = require('./api/router/viewRouter')
configureApp(app)

app.use('/api', routes())
app.use('/', mainRouter())


app.listen(port || 3000, function() {
    console.log('system is work on http://localhost:3000')
})