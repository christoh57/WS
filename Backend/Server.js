const express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var dps = require("dbpedia-sparql-client").default;
var elasticsearch = require("elasticsearch");

var libVar = require("./dbpediaRQ");

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

function askDbPedia(query, callback) {
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

function retrieveDataAccordingToURI(URI, callback) {
  const promisall = [];
  URI = "<" +URI +">";
  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(libVar.abstractFromSerie.replace("dbr:Friends", URI), function(r) {
        resolve(r.results.bindings);
      });
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(libVar.getRuntimeForData.replace("dbr:Clangers", URI), function(
        r
      ) {
        resolve(r.results.bindings);
      });
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.linkToOfficialSeriePage.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(libVar.ressourceName.replace("dbr:Friends", URI), function(r) {
        resolve(r.results.bindings);
      });
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveActorFromSerie.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveCreatorFromSerie.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveDiffusionChannel.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveEpisodeNumberFromSerie.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveLinkLogoFromSerie.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveOriginCountryFromSerie.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveProductionSociety.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveRealisatorFromSerie.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveSaisonNumberFromSerie.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveSerieMusicCompositor.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.retrieveStartDateFromSerie.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.serieTypeAccordingToLanguage.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.wikiNameAccordingToLanguage.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  promisall.push(
    new Promise(function(resolve, reject) {
      askDbPedia(
        libVar.wikiRealisatorFromSerie.replace("dbr:Friends", URI),
        function(r) {
          resolve(r.results.bindings);
        }
      );
    })
  );

  Promise.all(promisall).then(function(array) {
    console.log(array);
    var data = {
      abstract: array[0],
      Runtime: array[1],
      linkOfficialSeriePage: array[2],
      ressourceName: array[3],
      ActorFromSerie: array[4],
      CreatorFromSerie: array[5],
      DiffusionChannel: array[6],
      EpisodeNumberFromSerie: array[7],
      LinkLogoFromSerie: array[8],
      OriginCountryFromSerie: array[9],
      ProductionSociety: array[10],
      RealisatorFromSerie: array[11],
      SaisonNumberFromSerie: array[12],
      SerieMusicCompositor: array[13],
      StartDateFromSerie: array[14],
      serieTypeAccordingToLanguage: array[15],
      wikiNameAccordingToLanguage: array[16],
      wikiRealisatorFromSerie: array[17]
    };

    callback(data);
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

function dbQueryActor(cc, callback) {
  db.search(
    {
      index: "ws",
      type: "shows",
      body: {
        from: 0,
        size: 30,
        query: {
          match: {
            "actor.value": {
              query: cc.toLowerCase(),
              operator: "and",
              fuzziness: 2
            }
          }
        }
      }
    },
    function(err, resp) {
      callback(resp);
    }
  );
}

function dbQueryCategorie(cc, callback) {
  db.search(
    {
      index: "ws",
      type: "shows",
      body: {
        from: 0,
        size: 30,
        query: {
          match: {
            "nom.value": {
              query: cc.toLowerCase(),
              fuzziness: 2
            }
          }
        }
      }
    },
    function(err, resp) {
      callback(resp);
    }
  );
}

function dbQueryName(cc, callback) {
  db.search(
    {
      index: "ws",
      type: "shows",
      body: {
        from: 0,
        size: 30,
        query: {
          match: {
            "nom.value": {
              query: cc.toLowerCase(),
              fuzziness: 2
            }
          }
        }
      }
    },
    function(err, resp) {
      callback(resp);
    }
  );
}

app.post("/searchName", function(req, res) {
  var chaine = req.body.data;
  dbQueryName(chaine, function(rest) {
    res.send(rest.hits);
  });
});

app.post("/searchActor", function(req, res) {
  var chaine = req.body.data;
  dbQueryActor(chaine, function(rest) {
    res.send(rest.hits);
  });
});

app.post("/searchCategorie", function(req, res) {
  var chaine = req.body.data;
  dbQueryCategorie(chaine, function(rest) {
    res.send(rest.hits);
  });
});

app.post("/getDataFromUri", function(req, res) {
  retrieveDataAccordingToURI(req.body.data, function(data) {
    res.send(data);
  });
});

app.listen(4000, function() {
  console.log("Start...");

  console.log("sending ping");
  cleanDatabase(function() {
    fillDatabase(function(response) {
      console.log(response);
    });
  });
});
