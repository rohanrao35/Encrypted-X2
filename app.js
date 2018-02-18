var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());
//var filepath = require('filepath');
var fs = require('./test_bucket.js');
//Connect to mongoose
const bcrypt = require('bcrypt');
//var ObjectId = require('mongodb').ObjectID;
mongoose.connect('mongodb://rohanrao35:fitracker@ds121588.mlab.com:21588/encryptedx2');
//mongoose.connect('mongodb://localhost/')
//mongodb://<dbuser>:<dbpassword>@ds121588.mlab.com:21588/encryptedx2
//mongoose.connect('mongodb://rohanrao35:fitracker1@ds129946.mlab.com:29946/fitracker');

//mongoose.connect('mongodb://rohanrao35:fitracker@ds129946.mlab.com:29946/fitracker')



var db = mongoose.connection;
User =require('./models/user');
Files =require('./models/file');

app.get('/', function(req, res){
  res.send('Hello ');
});



app.listen(3000);




app.get('/users', function(req, res){
  //var path = filepath.create('jsmn.gcda');
  console.log(path);
  User.getUsers(function(err, users){
      if(err){
        throw err;
      }
      res.json(users);
  });
});


app.post('/createaccount', (req, res) => {

  var collection = db.collection('users');
  var _email = req.body.email;

  collection.find({email: req.body.email}).toArray(function (err, items) {

   var user = items[0];

   if (err) {
    return res.status(500).json({message: "Internal Server Error"});
  }

   if (user) {
     console.log('User already exists');
     return res.status(401).json({message: "User already exists"});
   }

   else  {
      var user = req.body;
      user.password = bcrypt.hashSync(req.body.password, req.body.password.length);

      console.log(user);

      User.addUser(user, (err, user) => {
        if(err){
          throw err;
        }
        return res.status(200).json({message: "Success"});
        //res.json(user);
      });
   }
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






app.post('/login/', function(req, res){
  //console.log(req.body.email);

  var collection = db.collection('users');
  var _email = req.body.email;
  var first;

   //collection.find({password: req.body.password}).toArray(function (err, items) {
   collection.find({email: req.body.email}).toArray(function (err, items) {

       var user = items[0];

       if(!user){
         console.log('No user');
         return res.status(401).json({message: "User does not exit"});
       }

      else if(bcrypt.compareSync(req.body.password, user.password)) {
        console.log('Passwords match');
        return res.status(200).json({message: "Success"});

      }
      else if (!bcrypt.compareSync(req.body.password, user.password)){
      //
         console.log('Wrong password');
         return res.status(401).json({message: "Invalid credentials"});
      }

 	});

});



/////////////////////////FILES///////////////////////////



app.get('/files', function(req, res){

  Files.getFiles(function(err, files){
      if(err){
        throw err;
      }
      res.json(files);
  });
});

app.delete('/api/files/:_link', (req, res) => {
	var _link = req.params._link;
  //id = "5a7a4e9c52e1bf1e8c1c4076";
	Files.removeFile(_link, (err, _link) => {
		if(err){
			throw err;
		}
		res.json(_link);
	});
});



app.post('/addfile', (req, res) => {
	//var file = req.body;
  //user.password = bcrypt.hashSync(req.body.password, req.body.password.length);


  // fs.readFile("Hello.txt", (err, _link) => {
  //
  //   if(err){
  //     throw err;
  //   }
  //   res.json("Hello.txt");
  // });

  upload();

  //console.log(file);

	Files.addFile(file, (err, file) => {
		if(err){
			throw err;
		}
		res.json(file);
	});
});




module.exports = app;
