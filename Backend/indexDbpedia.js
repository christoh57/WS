var dps = require("dbpedia-sparql-client").default;

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
  .asXml() // or asXml()
  .then(function(r) {
    console.log(r);
  })
  .catch(function(e) {
    /* handle error */
  });

dps.client();
