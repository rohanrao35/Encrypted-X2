
var AWS = require('aws-sdk'),
    fs = require('fs');

// For dev purposes only
AWS.config.update({ accessKeyId: 'AKIAJCPVDRRNNHSBYYHA', secretAccessKey: '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' });

// Read in the file, convert it to base64, store to S3
function upload({
  
  if (err) { throw err; }

  var base64data = new Buffer(req.body.data, 'binary');

  var s3 = new AWS.S3();
  s3.putObject({
    Bucket: 'encryptedx2_content',
    Key: 'img',
    Body: base64data,
    ACL: 'public-read'
  },function (resp) {
    console.log(arguments);
    console.log('Successfully uploaded package.');
  });

});







//////////////////////////////////////////////////////
// var AWS = require('aws-sdk');
// var s3 = new AWS.S3();
//
// // AWS.config.update({
// //   credentials: new AWS.CognitoIdentityCredentials({
// //     IdentityPoolId: 'us-east-2-foo-bar'
// //   }),
// //   region: 'us-east-2'
// // });
//
//
//
// var myBucket = 'encryptedx2_content';
// //var myKey = 'AKIAIAAUQZYU4H26QLXQ';
// var fs = require('fs');
// // function getfile(String filename) {
// //   if (filename == null || err)
// //       console.log(err);
// //   fs.readFile(filename, function (err, data) {
// //   if (err)
// //      throw err;
// //   return data;
// // }
//
//
//
//
//
// //blob:http://fiddle.jshell.net/88b2a11f-aab0-49c7-8ebb-6518f94bc031
//
// fs.readFile("Hello.txt", function (err, data) {
//
//   console.log("HERE\n");
// if (err)
//    throw err;
//
// var base64data = new Buffer(data, 'plain');
// params = {Bucket: myBucket, Key: "Hello.txt", Body: base64data};
//
// s3.putObject(params, function(err, data) {
//
//   if (err) {
//     console.log(err)
//   }
//
//   else {
//          console.log("Successfully uploaded data to myBucket/myKey");
//   }
//
// });
//
// });
//
// module.exports = fs;


///////////////////////////////////////////



//
//
// var AWS = require('aws-sdk'),
//     fs = require('fs');
//
// // For dev purposes only
// //AWS.config.update({ accessKeyId: '...', secretAccessKey: '...' });
//
// // Read in the file, convert it to base64, store to S3
// fs.readFile('Hello.txt', function (err, data) {
//   if (err) { throw err; }
//
//   var base64data = new Buffer(data, 'binary');
//
//   var s3 = new AWS.S3();
//   s3.putObject({
//     Bucket: 'encryptedx2_content',
//     Key: 'Hello.txt',
//     Body: base64data,
//     ACL: 'public-read'
//   },function (resp) {
//     console.log(arguments);
//     console.log('Successfully uploaded package.');
//   });
//
// });
//
//
// module.exports = fs;
