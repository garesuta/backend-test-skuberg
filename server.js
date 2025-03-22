require('dotenv').config()
const express = require('express')
const Router = require('./router/Router')

const app = express()

app.use(express.json());

app.use('/api/v1/', Router);
app.all('*', (req, res, next) => {
    const err = new Error(`Path ${req.originalUrl} not found in the server`);
    next(err);
})

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})