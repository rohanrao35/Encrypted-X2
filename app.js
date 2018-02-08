var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());
//Connect to mongoose
const bcrypt = require('bcrypt');
//var ObjectId = require('mongodb').ObjectID;
mongoose.connect('mongodb://rohanrao35:fitracker@ds121588.mlab.com:21588/encryptedx2');
//mongoose.connect('mongodb://localhost/')
//mongodb://<dbuser>:<dbpassword>@ds121588.mlab.com:21588/encryptedx2
//mongoose.connect('mongodb://rohanrao35:fitracker1@ds129946.mlab.com:29946/fitracker');
var db = mongoose.connection;
User =require('./models/user');

app.get('/', function(req, res){
  res.send('Hello ');
});

app.post('/login'){

  //req.email
  //req.password

}


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
  user.password = bcrypt.hashSync(req.body.password, req.body.password.length);

//   if(bcrypt.compareSync('qqqqqq', user.password)) {
//   console.log('Passwords match');
//   } else {
//  // Passwords don't match
//  console.log('NO');
// }

	User.addUser(user, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.delete('/api/users/:_email', (req, res) => {
	var _email = req.params._email;
  //id = "5a7a4e9c52e1bf1e8c1c4076";
	User.removeUser(_email, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

module.exports = app;
