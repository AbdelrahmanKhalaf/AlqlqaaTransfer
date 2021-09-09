var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const db = require('mongoose');
const cors = require('cors');
const services = require('./routes/services');
const business = require('./routes/business');
const myServices = require('./routes/myServices');
const offers = require('./routes/ourOffers');
const users = require('./routes/users');
const auth = require('./routes/auth');
const evaluation = require('./routes/evaluation');
const rentals = require('./routes/rentals');
const rentalsoffers = require('./routes/rentalsOffers');
const rentalsBusiness = require('./routes/rentalsBusiness');
const errors = require('./middleware/error');
const config = require('config');
const winston = require('winston');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
global.__basedir = require('path').resolve(__dirname, '..');
const alqaqaa = express();
var flash = require('connect-flash');
require('./model/prod')(alqaqaa)
db.connect('mongodb+srv://abdo2020:01123689625@temwork-vxavl.mongodb.net/alqaqaa?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connected to mongoDB...')

    })
    .catch((err) => console.log(`Could not connect to mongoDB...${err.message}`));
PORT = process.env.PORT || 5000
alqaqaa.use(flash())
alqaqaa.use("/uploads", express.static('./uploads'))
alqaqaa.use(logger('dev'))
alqaqaa.use(bodyParser.json())
alqaqaa.use(bodyParser.urlencoded({ extended: true }))
alqaqaa.use(express.json())
alqaqaa.use(cookieParser())
alqaqaa.use(expressSession({ secret: "max", saveUninitialized: false, resave: false }))
alqaqaa.use(cors())
alqaqaa.use('/api/service', services)
alqaqaa.use('/api/business', business)
alqaqaa.use('/api/myservices', myServices)
alqaqaa.use('/api/offers', offers)
alqaqaa.use('/api/login', auth)
alqaqaa.use('/api/users', users)
alqaqaa.use('/api/evaluation', evaluation)
alqaqaa.use('/api/rentals', rentals)
alqaqaa.use('/api/rentalsOffers', rentalsoffers)
alqaqaa.use('/api/rentalsBusiness', rentalsBusiness)
alqaqaa.listen(PORT, console.log(`Listing on port ${PORT}....`))
alqaqaa.use(errors)
    // if (!config.get('jwtPrivatKey')) {
    //     console.log('FALAT ERROR : Privat Key Not Set ');
    //     process.exit(1);
    // };
module.exports = alqaqaa;