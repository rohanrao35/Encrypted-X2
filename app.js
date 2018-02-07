var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());
//Connect to mongoose
mongoose.connect('mongodb://rohanrao35:fitracker@ds121588.mlab.com:21588/encryptedx2')
//mongoose.connect('mongodb://localhost/')
//mongodb://<dbuser>:<dbpassword>@ds121588.mlab.com:21588/encryptedx2
//mongoose.connect('mongodb://rohanrao35:fitracker1@ds129946.mlab.com:29946/fitracker');
var db = mongoose.connection;
User =require('./models/user');

app.get('/', function(req, res){
  res.send('Hello ');
});




app.listen(3000);


app.get('/users', function(req, res){

  User.getUsers(function(err, users){
      if(err){
        throw err;
      }
      res.json(users);
  });
});


app.post('/api/users', (req, res) => {
	var user = req.body;
  console.log(req.body);
	User.addUser(user, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.delete('/api/users/:id', (req, res) => {
	var id = req.params.id;


	User.removeUser(id, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

module.exports = app;
