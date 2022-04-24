var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const users = require('./routes/user')
const spots = require('./routes/spot')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


app.use('/api/teste', usersRouter);
app.use('/', indexRouter);

app.get('/api/users', users.getUsers)
app.get('/api/users/login', users.getLoginAuthentication)
app.post('/api/users/creat', users.createUser)
app.put('/api/users/:id', users.updateUser)
app.get('/api/users/:id', users.getUserById)
app.delete('/api/users/:id', users.deleteUser)


app.get('/api/spots', spots.getSpots)
app.get('/api/spots/lat/:lat/long/:long/dist/:dist', spots.getSpotsArea)
app.get('/api/spots/:id', spots.getSpotById)
app.post('/api/spots', spots.createSpot)
app.put('/api/spots/:id', spots.updateSpot)
app.delete('/api/spots/:id', spots.deleteSpot)

module.exports = app;
