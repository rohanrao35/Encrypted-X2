var express = require('express');
var app = require();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to mongoose
//mongoose.connect('mongodb://rohanrao35:e@ds121588.mlab.com:21588/encryptedx2')
mongoose.connect('mongodb://localhost/')
var db = mongoose.connection;


app.get('/', function(req, res){
  res.send('Hello World');
});
