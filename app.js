var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//<<<<<<< HEAD
//var passport = require('passport');
//var passport = require('./config/passport.js');
//=======
var AWS = require('aws-sdk');
//>>>>>>> 390935765f672cc5a6b242ebf5ae3d566cda7ca1
app.use(bodyParser.json());
//var filepath = require('filepath');
//var cloud = require('./test_bucket.js');
//Connect to mongoose
//user for mlab: rohanrao35
//pass for mlab: password1234
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

/* Google Code */
/*
app.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'https://www.googleapis.com/auth/plus.login',
  	, 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
    function(req, res) {
        res.redirect('http://localhost:3000/'); // Link to go whne log in is successfull.
      }
}));
*/
/* Google Code */

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

app.post('/editaccount', (req, res) => {

  var collection = db.collection('users');

    collection.find({email: req.body.email}).toArray(function (err, items) {
    var user = items[0];
    console.log(user);
    console.log(user.password);
    user.password = bcrypt.hashSync(req.body.password, req.body.password.length);
    console.log(user.password);
    collection.updateOne({email: req.body.email}, {$set:{password: user.password}});

    return res.status(200).json({message: "Success"});
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

  var file = req.body;
  var encryptor = require('file-encryptor');
  var key = 'Encrypted';

  // // Encrypt file.
  // encryptor.encryptFile('Hello.txt', 'Hello.crypt', key, {algorithim: 'aes256'}, function(err) {
  //   // Encryption complete.
  // });
  //
  // encryptor.decryptFile('Hello.crypt', 'output.txt', key, {algorithim: 'aes256'},  function(err) {
  // // Decryption complete.
  // });

  // var key = 'My Super Secret Key';
  // var options = { algorithm: 'aes256' };
  //
  // encryptor.encryptFile('Hello.txt', 'encrypted.dat', key, options, function(err) {
  //   // Decryption complete;
  // });
  //
  //
  //
  // encryptor.decryptFile('encrypted.dat', 'outputfile.txt', key, options, function(err) {
  //   // Encryption complete;
  // });


  var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');


var encryptedString = cryptr.encrypt(req.body.data);
//var decryptedString = cryptr.decrypt(encryptedString);

console.log(req.body.data);
console.log(encryptedString);  // e74d7c0de21e72aaffc8f2eef2bdb7c1
//console.log(decryptedString);


  var a = 'AKIAJIWL4ZC';
  var b = '3S26DRGPQ';
  var c = 'GRna0iPyNPBG5FTsIOUeD';
  var d = 'CsmkVQ8A1q2oL+RWddc';
  var ab = a + b;
  var cd = c + d;
  AWS.config.update({ accessKeyId: ab, secretAccessKey: cd });

  var base64data = new Buffer(encryptedString, 'binary');
  var s3 = new AWS.S3();
    s3.putObject({
    Bucket: 'encryptedx2_content',
    Key: 'Encrypted',
    Body: base64data,
          ACL: 'public-read'
    },function (resp) {
      console.log(arguments);
      console.log('Successfully uploaded package.');
    });
	Files.addFile(file, (err, file) => {
		if(err){
			throw err;
		}
		res.json(file);
	});
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}







// Decrypt file.
//encryptor.decryptFile('encrypted.dat', 'output_file.txt', key, function(err) {
  // Decryption complete.
//});


module.exports = app;
