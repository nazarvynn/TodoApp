var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended':'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


//MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todoApp');

//Database model
var Todo = mongoose.model('TodoList', {
    text : String
});


//Routes
app.get('/api/todos', function (request, response) {
    Todo.find(function (error, todos) {
        if (error) response.send(error);

        response.json(todos);
    });
});

app.post('/api/todos', function (request, response) {
    Todo.create({
        text: request.body.text,
        done: false
    }, function (error, todo) {
        if (error) response.send(error);

        Todo.find(function (error, todos) {
            if (error) response.send(error);

            response.json(todos);
        });
    });
});

app.delete('/api/todos/:todo_id', function (request, response) {
    Todo.remove({
        _id : request.params.todo_id
    }, function (error, todo) {
        if (error) response.send(error);

        Todo.find(function (error, todos) {
            if (error) response.send(error);

            response.json(todos);
        });
    });
});

// Routes for AngularJS
app.get('*', function(request, response) {
    // load the single view file (angular will handle the page changes on the front-end)
    response.sendfile('./public/index.html');
});

// Run NodeJS server
app.listen(5000);
console.log('Application is available on "http://localhost:5000" ');
