const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOpts = { origin: '*', methods: ['GET', 'POST', 'DELETE', 'PUT'], allowedHeaders: ['Content-Type']};
app.use(cors(corsOpts));

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


const usersRouter = require('./routes/usersRoutes')
const spotsRouter = require('./routes/spotsRoutes')
const userMessagesGroups = require('./routes/userMessageGroupsRoutes')
const groups = require('./routes/groupsRoutes')
const messages = require('./routes/messagesRoutes')
const userMessages = require('./routes/userMessagesRoutes')
const image = require('./routes/images')
const tags = require('./routes/tagsRoutes')
const spotEvaluations = require('./routes/spotEvaluationsRoutes')
const favSpots = require('./routes/favSpotsRoutes')
const ph = require('./routes/photoRoutes')






app.use('/api/users', usersRouter);
app.use('/api/spots', spotsRouter);
app.use('/api/userMessagesGroups', userMessagesGroups);
app.use('/api/groups', groups)
app.use('/api/messages', messages)
app.use('/api/userMessages', userMessages)
app.use('/api/image', image)
app.use('/api/tags', tags)
app.use('/api/spotEvaluations', spotEvaluations)
app.use("/api/favSpots", favSpots)
app.use("/api/photo", ph)






module.exports = app;

/**
 *
 * Cmd:
 * git push heroku main
 * heroku dyno:restart
 * heroku logs --tail
 *
 * */


// const users = require('./routes/user')

// app.get('/api/users', users.getUsers)
// app.get('/api/users/login', users.getLoginAuthentication)
// app.post('/api/users', users.createUser)
// app.put('/api/users/:id(\\d+)', users.updateUser)
// app.get('/api/users/:id(\\d+)', users.getUserById)
// app.delete('/api/users/:id(\\d+)', users.deleteUser)

// const spots = require('./routes/spot')
//
// app.get('/api/spots', spots.getSpots)
// app.get('/api/spots/lat/:lat/long/:long/dist/:dist', spots.getSpotsArea)
// app.get('/api/spots/:id(\\d+)', spots.getSpotById)
// app.post('/api/spots(\\d+)', spots.createSpot)
// app.put('/api/spots/:id(\\d+)', spots.updateSpot)
// app.delete('/api/spots/:id(\\d+)', spots.deleteSpot)