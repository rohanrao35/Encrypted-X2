var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var myBucket = 'encryptedx2_content';
//var myKey = 'AKIAIAAUQZYU4H26QLXQ';
var fs = require('fs');
// function getfile(String filename) {
//   if (filename == null || err)
//       console.log(err);
//   fs.readFile(filename, function (err, data) {
//   if (err)
//      throw err;
//   return data;
// }

fs.readFile("test.txt", function (err, data) {
if (err)
   throw err;

var base64data = new Buffer(data, 'plain');
params = {Bucket: myBucket, Key: "test2.txt", Body: base64data};

s3.putObject(params, function(err, data) {

  if (err) {
    console.log(err)
  }

  else {
         console.log("Successfully uploaded data to myBucket/myKey");
  }

});

});
