const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('book-code:server');
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express();

const mongoUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.PW}@cluster0-9ptgq.mongodb.net/mean-posts-app?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database')
    console.log(mongoUrl)
}).catch(() => {
    console.log('Connection failed')
    console.log(mongoUrl)
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(morgan('dev'));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/posts', postsRoutes)
app.use('/api/user', userRoutes)

module.exports = app;