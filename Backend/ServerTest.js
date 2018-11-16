const express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get('/initDatabase', function (req, res) {
  res.send('Hello World!')
})

app.post('/afficher', function(req, res) {
    console.log("got smt");
    console.log(req.body.st);
    res.send("Test Succss");
});





app.listen(3000,"127.0.0.1", function () {
  console.log('Start...');


  var myJSONObject = { 
    data : "game of throne"
  };
  
  request({
    url: "http://localhost:4000/proposition",
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
    }, function (error, response, body){
        console.log(body);
    });

})


/*
  var request = require('request');
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     'http://localhost/test2.php',
    body:    "mes=heydude"
  }, function(error, response, body){
    console.log(body);
  });


  var request = require('request');
  request('http://www.google.com', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });

*/