module.exports = {
  //Abstract d’une série selon la langue
  abstractFromSerie: `select *
    where {
    dbr:Friends dbo:abstract ?abstract.
    Filter(lang(?abstract) = "en")
    }`,

  //Get runtimes pour une ressource donnée (renvoie une valeur si elles sont proches et toutes sinon)
  getRuntimeForData: `select distinct  ?runtime where 
    {
        {
            select round(avg(abs(xsd:integer(?p)))) as ?runtime where 
            {
                dbr:Clangers <http://dbpedia.org/ontology/Work/runtime> ?p.
                {
                    select max(abs(xsd:integer(?p))) as ?max, min(abs(xsd:integer(?p))) as ?min where 
                    {
                        dbr:Clangers <http://dbpedia.org/ontology/Work/runtime> ?p.
                    }
                }
                FILTER( ?max < ?min +15)
            }
        }
        UNION
        {
            select abs(xsd:integer(?p)) as ?runtime where 
            {
                dbr:Clangers <http://dbpedia.org/ontology/Work/runtime> ?p.
                {
                    select max(abs(xsd:integer(?p))) as ?max, min(abs(xsd:integer(?p))) as ?min where 
                    {
                        dbr:Clangers <http://dbpedia.org/ontology/Work/runtime> ?p.
                    }
                }
                FILTER( ?max > ?min +15)
            }
        }
    }`,


  //Récupérer le nom wikipédia d’une URI dans toutes les langues
  getWikiNameOfUriInAllLanguage:
  `select *
  where {
  dbr:Friends rdfs:label ?name
  }`,

  //Nom wiki d’une URI selon la langue
  wikiNameAccordingToLanguage:
  `select *
  where {
    dbr:Friends rdfs:label ?name.
    filter(lang(?p) = "en")
  }`,

  //Nom d’une ressource
  ressourceName:
  `select *
  where {
  dbr:Friends foaf:name ?name.
  }`,
  

  //Lien vers la page officielle d’une serie
  linkToOfficialSeriePage:
  `select *
  where {
  dbr:Friends foaf:homepage ?link.
  }`,
  
  //Récupérer le compositeur de musique de la série (uri, nom, lien wiki)
  retrieveSerieMusicCompositor:
  `select *
  where {
  dbr:Friends dbo:composer ?uri.
  ?uri foaf:name ?name.
  ?uri foaf:isPrimaryTopicOf ?wikilink.
  }`,

  //Genre de série (uri, name) en fonction de la langue
  serieTypeAccordingToLanguage:
  `select * where
  {
  dbr:Friends dbo:genre ?uri.
  ?uri rdfs:label ?name.
  filter(lang(?name) = "en")
  }`,

  //Récupérer les sociétés de production (uri, nom, lien wiki)
  retrieveProductionSociety:
  `select *
  where {
  dbr:Friends dbo:company ?uri.
  ?uri foaf:name ?name.
  ?uri foaf:isPrimaryTopicOf ?wikilink.
  }`,

  //Récupérer le nombre d’épisodes d’une serie
  retrieveEpisodeNumberFromSerie:
  `select *
  where {
  dbr:Friends dbo:numberOfEpisodes ?number.
  }`,

  //Récupérer le nombre de saison d’une serie
  retrieveSaisonNumberFromSerie:
  `select * where
  {
  dbr:Friends dbo:numberOfSeasons ?number.
  }`,

  //Lien Wiki des réalisateurs d’une série
  wikiRealisatorFromSerie:
  `select * where
  {
  dbr:Friends dbo:executiveProducer ?wikilink.
  }`,

  //Récupérer les acteurs d’une série (uri, nom, lien wiki)
  retrieveActorFromSerie:
  `select *
  where 
  {
  {
    select * where {
    dbr:Friends dbo:starring ?uri.
    ?uri foaf:name ?name;
    foaf:isPrimaryTopicOf ?wikilink; 
    dbo:abstract ?abstract.
    Filter(lang(?abstract) = "en") }
  }
  UNION
  {
    select * where {
    dbr:Friends dbo:executiveProducer ?uri.
    ?uri foaf:name ?name;
    foaf:isPrimaryTopicOf ?wikilink; 
    dbo:abstract ?abstract;
    foaf:depiction ?photo.
    Filter(lang(?abstract) = "en")}
  }
  }`,

  //Récupérer les réalisateurs de la série (uri, nom, lien wiki)
  retrieveRealisatorFromSerie:
  `select *
  where 
  {
    {
    select * where {
    dbr:Friends dbo:executiveProducer ?uri.
    ?uri foaf:name ?name;
    foaf:isPrimaryTopicOf ?wikilink; 
    dbo:abstract ?abstract.
    Filter(lang(?abstract) = "en") }
    }
    UNION
    {
      select * where {
      dbr:Friends dbo:executiveProducer ?uri.
      ?uri foaf:name ?name;
      foaf:isPrimaryTopicOf ?wikilink; 
      dbo:abstract ?abstract;
      foaf:depiction ?photo.
      Filter(lang(?abstract) = "en")}
    }
  }`,

  //Récupérer les créateurs de la série (uri, nom, lien wiki)
  retrieveCreatorFromSerie:
  `select *
  where 
  {
    {
      select * where {
      dbr:Friends dbo:creator ?uri.
    ?uri foaf:name ?name;
      foaf:isPrimaryTopicOf ?wikilink; 
      dbo:abstract ?abstract.
      Filter(lang(?abstract) = "en") }
    }
    UNION
    {
      select * where {
      dbr:Friends dbo:executiveProducer ?uri.
      ?uri foaf:name ?name;
      foaf:isPrimaryTopicOf ?wikilink; 
      dbo:abstract ?abstract;
      foaf:depiction ?photo.
      Filter(lang(?abstract) = "en")}
    }
  }`,

  //Récupérer la date de diffusion de la série
  retrieveStartDateFromSerie:
  `select *
  where {
  dbr:Friends dbo:completionDate ?date.
  }`,

  //Récupérer le pays d’origine d’une série
  retrieveOriginCountryFromSerie:
  `select *
  where {
  dbr:Friends dbp:country ?name.
  }`,

  //Récupérer le lien du logo d’une série
  retrieveLinkLogoFromSerie:
  `select *
  where {
  dbr:Friends foaf:depiction ?url.
  }`,

  //Récupérer la chaîne de diffusion (uri, name, wikilink)
  retrieveDiffusionChannel:
  `select *
  where 
  {
    {
      select * where {
      dbr:BrainSurge dbo:network ?uri.
      ?uri foaf:name ?name;
      foaf:isPrimaryTopicOf ?wikilink. }
    }
    UNION
    {
      select * where {
      dbr:BrainSurge dbo:channel ?uri.
      ?uri foaf:name ?name;
      foaf:isPrimaryTopicOf ?wikilink. }
    }
  }`,


//-----------------------------
//    Elastic search query
//-----------------------------
  initDatabaseQuery:
  `select distinct ?uriserie (group_concat(DISTINCT ?nom,' ') as ?names) (group_concat(DISTINCT ?genre,' ') as ?genres) (group_concat(DISTINCT ?actor,' ') as ?actors)

  where {
  {
  ?uriserie a dbo:TelevisionShow.
  {
  ?uriserie <http://purl.org/linguistics/gold/hypernym> dbr:Series.
  ?uriserie dct:subject ?v.
  FILTER(regex(?v, "[Tt]elevision_series" )).
  
  }
  
  
  UNION
  
  {?uriserie  a umbel-rc:TVShow_IBT.
  ?uriserie <http://purl.org/linguistics/gold/hypernym> dbr:Series.}
  
  UNION
  
  {?uriserie <http://purl.org/linguistics/gold/hypernym> dbr:Sitcom.}
  
  UNION
  
  {?uriserie  a umbel-rc:TVShow_IBT.
  ?uriserie <http://purl.org/linguistics/gold/hypernym> dbr:Opera.}
  
  UNION
  
  {?uriserie <http://purl.org/linguistics/gold/hypernym> dbr:American.
  ?uriserie dbo:numberOfSeasons ?v}
  
  UNION
  
  {?uriserie dct:subject dbc:Anime_series_based_on_manga.}
  
  }
  MINUS {
   ?uriserie dct:subject ?v2.
   FILTER(regex(?v2, "[L,l]ists*_of")).
  }
  
  MINUS {
   ?uriserie dct:subject ?v3.
   FILTER(regex(?v3, "[W,w]eb_series")).
  }
  
  MINUS {
   ?uriserie dct:subject ?v4.
   FILTER(regex(?v4, "[I,i]nto_television_series")).
  }
  
  
  
  OPTIONAL {
   ?uriserie rdfs:label ?nom.
   FILTER(lang(?nom) = 'en').
  
  }
  
  OPTIONAL {
   ?uriserie dbo:genre ?urigenre.
   ?urigenre rdfs:label ?genre.
   FILTER(lang(?genre) = 'en')
  }
  
  OPTIONAL {
   ?uriserie dbo:starring ?uristarring.
   ?uristarring rdfs:label ?actor.
   FILTER(lang(?actor) = 'en').
   OPTIONAL {
    FILTER(regex(?actor, "[L,l]ist of")).
    ?uristarring dbp:caption ?actor.
   }
  
  }
  
  }`
};
