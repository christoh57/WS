const express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var dps = require("dbpedia-sparql-client").default;
var elasticsearch = require("elasticsearch");
var libVar = require('./dbpediaRQ');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var db = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});

function fillDatabase(callback) {
  var query = libVar.initDatabaseQuery;
  
  dps
    .client()
    .query(query) 
    .asJson() 
    .then(function(r) {
      var bindings = r.results.bindings;
      var array = [];
      var index = { index: { _index: "ws", _type: "shows" } };

      const promiseall = [];
      bindings.forEach(element => {
        promiseall.push(
          new Promise(function(resolve, reject) {
            array.push(index);
            array.push(element);
            resolve();
          })
        );
      });

      Promise.all(promiseall).then(function() {
        db.bulk(
          {
            body: array
          },
          function(err, resp) {
            callback(resp);
          }
        );
      });
    })
    .catch(function(e) {
      /* handle error */
    });
}

/*
  request({
    url: "http://localhost:9200/ws/shows/_bulk",
    method: "POST",
    json: true,   // <--Very important!!!
    body: element
    }, function (error, response, body){

        console.log("OK");
        console.log(body);
    });

*/

function cleanDatabase(callback) {
  db.delete(
    {
      index: "ws",
      type: "shows"
    },
    function(err, resp) {
      callback;
    }
  );
}

function parseQuery(query, callback) {
  query = query.toLowerCase();
  var keywords = query.split(" ");
  var result = "";

  const promises = [];

  keywords.forEach(elem => {
    promises.push(
      new Promise(function(resolve, reject) {
        result += "(" + elem + "~1)+";
        resolve();
      })
    );
  });

  //result = result.substring(0, result.length - 1);

  Promise.all(promises).then(function() {
    result = result.substring(0, result.length - 1);
    callback(result);
  });
}

function dbQuery(cc, callback) {
  parseQuery(cc, function(queryString) {
    db.search(
      {
        index: "ws",
        type: "shows",
        body: {
          query: {
            simple_query_string: {
              query: queryString,
              fields: ["name.value"]
            }
          }
        }
      },
      function(err, resp) {
        console.log(resp);
        callback(resp);
      }
    );
  });
}

app.post("/entete", function(req, res) {
  request(
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: "http://localhost/BDDDePierre"
    },
    function(error, response, body) {
      console.log(body._shards.hits);
      res.send(body._shards.hits);
    }
  );
});

app.post("/search", function(req, res) {
  var chaine = req.body.data;
  dbQuery(chaine, function(rest) {
    res.send(rest.hits);
  });
});


app.get("/",function(req,res){
  cleanDatabase(function(){
    fillDatabase(function(response){
      console.log(response);
    });
  });
});

app.get("/fillDb", function(req, res) {
  getEntete();
});

app.listen(4000, function() {
  console.log("Start...");

  console.log("sending ping");

  /* 
    var myJSONObject = { 
      st : "game of throne"
    };
    request({
      url: "http://127.0.0.1:3000/afficher",
      method: "POST",
      json: true,   // <--Very important!!!
      body: myJSONObject
      }, function (error, response, body){
          console.log(body);
      });
  */

});


