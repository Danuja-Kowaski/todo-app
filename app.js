const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');
const { rawListeners } = require('./database/models/taskList');

//try using async await instead


/*
CORS - Cross Origin Request Security
Backend - http://localhost:3000
Frontend - http://localhost:4200
*/
// 3rd party library, app.use(cors());
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'Origin', 'X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // Pass to next layer of middleware
    next();
});

app.use(express.json());// Or 3rd party bodyParser

//CRUD methods for tasklists
app.get('/tasklists', (req, res) => {
    TaskList.find({})
        .then((lists) => {
            res.status(200).send(lists);
        })
        .catch((error) => {
            res.status(500).send(console.log(error));
        });
});

app.get('/tasklists/:tasklistId', (req, res) => {
    let tasklistId = req.params.tasklistId;
    TaskList.find({_id : tasklistId})
    .then((tasklist) =>{
        res.status(200).send(tasklist);
    })
    .catch((error) => {
        res.status(500).send(console.log(error));
    })
});

app.post('/tasklists', (req, res) => {
    console.log(req.body);

    let taskListObj = { 'title': req.body.title };
    TaskList(taskListObj).save()
        .then((taskList) => {
            res.send(taskList);
        })
        .catch((error) => {
            res.status(500).send(console.log(error));
        });

});

app.put('/tasklists/:tasklistId', (req, res)  => {
    TaskList.findOneAndUpdate({_id : req.params.tasklistId}, {$set : req.body})
    .then((tasklist) => {
        res.status(200).send(tasklist);
    })
    .catch ((error) => {
        console.log(error);

    })
});

app.patch('/tasklists/:tasklistId', (req, res)  => {
    TaskList.findOneAndUpdate({_id : req.params.tasklistId}, {$set : req.body})
    .then((tasklist) => {
        res.status(200).send(tasklist);
    })
    .catch ((error) => {
        console.log(error);
    })
});

app.delete('/tasklists/:tasklistId', (req, res) => {
    TaskList.findByIdAndDelete(req.params.tasklistId)
    .then((tasklist) => {
        res.status(200).send(tasklist);
    })
    .catch ((error) => {
        console.log(error)
    })
});


//CRUD methods for task and asssigning to tasklists

app.get('/tasklists/:tasklistId/tasks', (req, res) => {
    Task.find({_taskListId : req.params.tasklistId})
    .then((tasks) => {
        res.status(200).send(tasks);
    })
    .catch ((error) => {
        res.status(500).send(console.log(error));
    })
});

app.post('/tasklists/:tasklistId/tasks', (req, res) => {
    let taskObj = {'title' : req.body.title, '_taskListId' : req.params.tasklistId}
    Task(taskObj).save()
    .then((task) => {
        res.status(200).send(task);
    })
    .catch ((error) => {
        res.status(500).send(console.log(error));
    })
});

app.get('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOne({_taskListId : req.params.tasklistId , _id : req.params.taskId})
    .then((tasks) => {
        res.status(200).send(tasks);
    })
    .catch ((error) => {
        res.status(500).send(console.log(error));
    })
});

app.patch('/tasklists/:tasklistId/tasks/:taskId' , (req, res) => {
    Task.findOneAndUpdate({ _taskListId : req.params.tasklistId , _id : req.params.taskId}, { $set: req.body})
    .then((tasks) => {
        res.status(200).send(tasks);
    })
    .catch ((error) => {
        res.status(500).send(console.log(error));
    })
});


app.delete('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({_taskListId : req.params.tasklistId , _id : req.params.taskId})
    .then((tasks) => {
        res.status(200).send(tasks);
    })
    .catch ((error) => {
        res.status(500).send(console.log(error));
    })
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});