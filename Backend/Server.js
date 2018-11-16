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
    .timeout(0) // <----- Ne pas enlever
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
        console.log(array);
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

function askDbPedia(query,callback){
  console.log("askDbPedia");
  dps
    .client()
    .timeout(0) // <----- Ne pas enlever
    .query(query) 
    .asJson() 
    .then(function(r) {
      callback(r);
    })
    .catch(function(e) {});
}

function retrieveDataAccordingToURI(URI,callback){
  const promisall = [];


  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.abstractFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.getRuntimeForData.replace("Clangers",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.getWikiNameOfUriInAllLanguage.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.linkToOfficialSeriePage.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.ressourceName.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveActorFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveCreatorFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveDiffusionChannel.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveEpisodeNumberFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveLinkLogoFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveOriginCountryFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveProductionSociety.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveRealisatorFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveSaisonNumberFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveSerieMusicCompositor.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.retrieveStartDateFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.serieTypeAccordingToLanguage.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.wikiNameAccordingToLanguage.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));

  promisall.push(new Promise(function(resolve,reject){
    askDbPedia(libVar.wikiRealisatorFromSerie.replace("Friends",URI),
    function(r){
      resolve(r)
    });
  }));
 
  Promise.all(promisall).then(function(array){
    console.log(array);
    callback(array);
  });

}

function cleanDatabase(callback) {
  
  db.delete(
    {
      index: "ws",
      type: "shows"
    },
    function(err, resp) {
      callback();
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
  Promise.all(promises).then(function() {

    console.log(result);
    result = result.substring(0, result.length - 1);
    console.log(result);
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
        callback(resp);
      }
    );
  });
}



app.post("/search", function(req, res) {
  var chaine = req.body.data;
  dbQuery(chaine, function(rest) {
    res.send(rest);
  });
});

app.post("/getDataFromUri", function(req, res) {
  retrieveDataAccordingToURI(req.body.data,function(data){
    res.send(data);
  });
});


app.listen(4000, function() {
  console.log("Start...");

  console.log("sending ping");
  cleanDatabase(function(){
    fillDatabase(function(response){
      console.log(response);
    });
  });

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

