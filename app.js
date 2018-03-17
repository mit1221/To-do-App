var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');
app.use(express.static('./public'));

//fire controllers
//todoController(app);

app.get('/', (req, res) => {
  res.end('Welcome!');
});

//listen to port
app.listen(process.env.PORT || 3000, () => {
  console.log('You are listening to port 3000...');
});
