const express = require('express');
const router = require('./routes');
const allRoutes = require('express-list-endpoints');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan') 
const path = require('path')
require('dotenv').config()
const createError = require('http-errors')

const port =process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/Shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database!!!");
    })
    .catch((err) => {
        console.log("Not Connected to Database ERROR!!!", err);
    });
app.use('/storage',express.static(path.join(__dirname, '../storage')));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors())
// app.use(bodyParser.json());

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
router.use((req, res, next) => next(createError.NotFound()))

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(allRoutes(app));
});