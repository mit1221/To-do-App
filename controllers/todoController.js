var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

//Database connection
mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PASS + '@ds249398.mlab.com:49398/mit1221');

//Schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk'}, {item: 'coding'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  app.get('/todo', function(req, res){
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.get('*', function(req, res){
    res.end('404! There is no webpage with the url: ' + __dirname + req.url);
  });

  app.post('/todo', urlencodedParser, function(req, res){
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
};
