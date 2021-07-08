const express = require('express');
const router = require('./routes');
const allRoutes = require('express-list-endpoints');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan') 
require('dotenv').config()

const port =process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/Shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database");

    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors())
app.use(bodyParser.json());

app.use((req, res , next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Reqested-With, Content-Type, Accept, Authorization')
    if(req.method=== 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/api', router);

// Handler errors
app.use((req, res, next) => {
    const error = new Error('404 NOT FOUND!!')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(allRoutes(app));
});