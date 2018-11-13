module.exports = {
  //Lien Wiki de toutes les séries d’un acteur
  allWikiSeriesFromActor: `select *
    where {
    ?uri a dbo:TelevisionShow.
    ?uri dbo:starring dbr:Jennifer_Aniston.
    ?uri foaf:isPrimaryTopicOf ?wikilink.
     }`,

  //Lien Wiki des acteurs d’une série
  wikiOfActorFromSerie: `select *
    where {
    dbr:Friends dbo:starring ?uri.
    ?uri foaf:isPrimaryTopicOf ?wikilink.
    }`,

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

  //Récupérer lien wiki d’une URI
  retrieveWikiLinkFromURI: 
  `select *
  where {
  dbr:Jennifer_Aniston foaf:isPrimaryTopicOf ?wikilink
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
  where {
  dbr:Friends dbo:starring ?uri.
  ?uri foaf:name ?name.
  ?uri foaf:isPrimaryTopicOf ?wikilink.
  }`,

  //Récupérer les réalisateurs de la série (uri, nom, lien wiki)
  retrieveRealisatorFromSerie:
  `select *
  where {
  dbr:Friends dbo:executiveProducer ?uri.
  ?uri foaf:name ?name.
  ?uri foaf:isPrimaryTopicOf ?wikilink.
  }`,

  //Récupérer les créateurs de la série (uri, nom, lien wiki)
  retrieveCreatorFromSerie:
  `select *
  where {
  dbr:Friends dbo:creator ?uri.
  ?uri foaf:name ?name.
  ?uri foaf:isPrimaryTopicOf ?wikilink.
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
  where {
  dbr:Friends dbo:network ?uri.
  ?uri foaf:name ?name.
  ?uri foaf:isPrimaryTopicOf ?wikilink.
  }`,


  PierreQuery:
  `select distinct ?uriserie ?nom (group_concat(DISTINCT ?genre,' ') as ?genres) (group_concat(DISTINCT ?actor,' ') as ?actors)
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
  } GROUP BY ?uriserie ?nom`

};
