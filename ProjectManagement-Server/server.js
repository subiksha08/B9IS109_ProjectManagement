const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
userRepo = require('./repo/user-repo')
projectRepo = require('./repo/project-repo'),
    parentTaskRepo = require('./repo/parentTask-repo')
taskRepo = require('./repo/task-repo');

var app = express();

// configuring port
let PORT = 3000;

// to parse
app.use(bodyparser.json());

// using cors for connecting server & client
app.use(cors());

// connecting to mongoose database
mongoose.Promise = global.Promise;
const atlasConnectionString = 'mongodb+srv://subhiksharaj08:ewRN7qZuFCkktvP5@projectmanagement.4fooxxt.mongodb.net/';

mongoose.connect(atlasConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => { 
        console.log('Connected to MongoDB Atlas');
    },
    err => { 
        console.error('Error connecting to MongoDB Atlas:', err);
    }
);

// routing layer for models
app.use('/users', userRepo);
app.use('/projects', projectRepo);
app.use('/parenttasks', parentTaskRepo);
app.use('/tasks', taskRepo);

app.listen(PORT, () => {
    console.log('Server listening Port ' + PORT);
})

