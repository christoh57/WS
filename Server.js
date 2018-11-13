const express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var dps = require("dbpedia-sparql-client").default;
var elasticsearch = require("elasticsearch");
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var db = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});

app.get("/initDatabase", function(req, res) {
  res.send("Hello World!");
});

app.post("/search", function(req, res) {
  var searchString = req.body.aDefinirParAlex;

  var data = {
    search: "game of throne",
    urlElastic: "http://elastic/get"
  };

  request(
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: "http://localhost/BDDDePierre",
      json: true,
      body: data
    },
    function(error, response, body) {
      console.log(body);
    }
  );

  res.send(searchString);
});

function getEntete() {
  var query = `
  select distinct ?uriserie ?nom (group_concat(DISTINCT ?genre,' ') as ?genres) (group_concat(DISTINCT ?actor,' ') as ?actors)
where {
{
?uriserie a dbo:TelevisionShow.
 {
 ?uriserie <http://purl.org/linguistics/gold/hypernym> dbr:Series.
 ?uriserie dct:subject ?subject.
 FILTER(regex(?subject, "[Tt]elevision_series" )).
 }
UNION
 {?uriserie  a umbel-rc:TVShow_IBT.
 ?uriserie <http://purl.org/linguistics/gold/hypernym> dbr:Series.}
UNION
 {?uriserie  a umbel-rc:TVShow_IBT.
 ?uriserie <http://purl.org/linguistics/gold/hypernym> dbr:Opera.}
UNION
 {?uriserie <http://purl.org/linguistics/gold/hypernym> dbr:American.
 ?uriserie dbo:numberOfSeasons ?n}
UNION
 {?uriserie dct:subject dbc:Anime_series_based_on_manga.}
}
MINUS {
?uriserie dct:subject ?subject2.
FILTER(regex(?subject2, "[L,l]ists*_of")).
}
?uriserie foaf:name ?nom.
?uriserie dbo:genre ?urigenre.
?urigenre rdfs:label ?genre.
FILTER(lang(?genre) = 'en')
?uriserie dbo:starring ?uristarring.
?uristarring rdfs:label ?actor.
FILTER(lang(?actor) = 'en').
} GROUP BY ?uriserie ?nom
`;

  dps
    .client()
    .query(query)
    .timeout(15000) // optional, defaults to 10000
    .asJson() // or asXml()
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
        console.log(array);
        db.bulk(
          {
            body: array
          },
          function(err, resp) {
            console.log("resp");
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

function cleanDatabase() {
  db.delete(
    {
      index: "ws",
      type: "shows"
    },
    function(err, resp) {
      console.log(resp);
    }
  );
}

function parseQuery(query, callback) {
  query = query.toLowerCase();
  var keywords = query.split(" ");
  console.log(keywords);
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

app.post("/proposition", function(req, res) {
  var chaine = req.body.data;
  dbQuery(chaine, function(rest) {
    res.send(rest.hits);
  });
});

app.get("/cleanDb", function(req, res) {
  cleanDatabase();
  res.body = "Database cleaned";
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
  //cleanDatabase();
});

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
