var dps = require("dbpedia-sparql-client").default;

var query = `
select distinct ?uriserie (group_concat(DISTINCT ?nom,' ') as ?names) (group_concat(DISTINCT ?genre,' ') as ?genres) (group_concat(DISTINCT ?actor,' ') as ?actors)

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
 FILTER(regex(?v4, "into_television_series")).
}



OPTIONAL {
 ?uriserie rdfs:label ?nom
 FILTER(lang(?nom) = 'en')

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
}}
ORDER BY ?names
`;

dps
  .client()
  .query(query)
  .timeout(15000) // optional, defaults to 10000
  .asXml() // or asXml()
  .then(function(r) {
    console.log(r);
  })
  .catch(function(e) {
    /* handle error */
  });

dps.client();
