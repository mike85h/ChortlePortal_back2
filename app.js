const express = require('express')
const app = express();
const body-parser = require('body-parser')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const port = process.env.PORT || 8080
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

Schema = new mongoose.Schema({
      id       : String,
      title    : String,
      completed: Boolean
    }),

    Todo = mongoose.model('Chortle', Schema);

/*
 * I’m sharing my credential here.
 * Feel free to use it while you’re learning.
 * After that, create and use your own credential.
 * Thanks.
 *
 * MONGOLAB_URI=mongodb://example:example@ds053312.mongolab.com:53312/todolist
 * 'mongodb://example:example@ds053312.mongolab.com:53312/todolist'
 */
mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});


  .get('/', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

  .get('/chortles', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Todo.find( function ( err, todos ){
      res.json(200, todos);
    });
  })

  .post('/chortles', function (req, res) {
    var todo = new Todo( req.body );
    todo.id = todo._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.json(200, todo);
    });
  })

  .del('/chortles', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    Todo.remove({ completed: true }, function ( err ) {
      res.json(200, {msg: 'OK'});
    });
  })

  .get('/chortles/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Todo.findById( req.params.id, function ( err, todo ) {
      res.json(200, todo);
    });
  })

  .put('/chortles/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Todo.findById( req.params.id, function ( err, todo ) {
      todo.title = req.body.title;
      todo.completed = req.body.completed;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      todo.save( function ( err, todo ){
        res.json(200, todo);
      });
    });
  })

  .del('/chortles/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Todo.findById( req.params.id, function ( err, todo ) {
      // http://mongoosejs.com/docs/api.html#model_Model.remove
      todo.remove( function ( err, todo ){
        res.json(200, {msg: 'OK'});
      });
    });
  })


  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);
module.exports = app
