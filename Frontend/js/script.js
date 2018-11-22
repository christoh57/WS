/* Fonction appelée au chargement de la page. */
function init() {
    document.getElementById("searchButton").addEventListener("click",search);
}

/* Fonction appelée à chaque fois qu'un caractère est tapé dans la barre de recherche */
function dropdown() {
    var root = document.getElementById("listeRes");
    var searchText = document.getElementById("search");

    //On vide la balise avec les anciens résultats
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    //Récupération des résultats
    if(searchText.value != '') {
        //Récupération du filtre courant
        var filterSelected = document.getElementById( "catOrname" );
        var currentFilter = filterSelected.options[filterSelected.selectedIndex].value;

        var listeElem = null;
        var listeUri = null

        var xhr = new XMLHttpRequest();
        var url = '';

        switch(currentFilter) {
            case "Catégorie": {
                //Requête avec la cétégorie
                url = "http://localhost:4000/searchCategorie";
                break;
            }
            case "Nom": {
                //Requête avec le nom
                url = "http://localhost:4000/searchName";
                break;
            }
            default: {
                //Requête avec le nom de l'acteur
                url = "http://localhost:4000/searchActor";
            }
        }

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                listeElem = [];
                listeUri = [];
                var json = JSON.parse(xhr.responseText);
                json.hits.forEach(function (item) {
                    listeElem.push(item._source.names.value);
                    listeUri.push(item._source.uriserie.value);
                });

                listeElem.forEach(function (item) {
                    var newLi = document.createElement("li");
                    newLi.setAttribute("uri",listeUri[listeElem.indexOf(item)]);
                    var newContent = document.createTextNode(item);
                    newLi.appendChild(newContent);
                    newLi.addEventListener("click", function () {
                        displayInformation(item,listeUri[listeElem.indexOf(item)]);
                    }, false);
                    root.appendChild(newLi);
                });
            }
        };
        var data = JSON.stringify({"data": searchText.value});
        xhr.send(data);


    }
}

function displayInformation(serieName,uri) {
    document.getElementById("search").value = serieName;
    document.getElementById("search").setAttribute("uri",uri);
}

function search() {
    var searchText = document.getElementById("search").value;
    var uri = document.getElementById("search").getAttribute("uri");

    if(searchText != '') {
        console.log(uri);

        window.location = 'detail/index.html?uri=' + uri;

    }

}