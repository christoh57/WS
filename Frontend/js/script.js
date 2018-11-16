/* Fonction appelée au chargement de la page. Sert à mettre à jour la BD ElasticSearch */
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


        listeElem = ['Alex', 'Adele', 'Agnes', 'Billy','Alex', 'Adcfefele', 'Agnes', 'Billy','Alex', 'Adele', 'Agnes', 'Billy','Alex', 'Adele', 'Agnes', 'Billy'];


        switch(currentFilter) {
            case "Catégorie":
                //Requête avec la cétégorie
                console.log("cat");
                break;
            case "Nom":
                //Requête avec le nom
                console.log("nom");
                break;
            default:
                //Requête avec le nom de l'acteur
                console.log("nomAc");
        }

        listeElem.forEach(function (item) {
            var newLi = document.createElement("li");
            var newContent = document.createTextNode(item);
            newLi.appendChild(newContent);
            newLi.addEventListener("click", function () {
                displayInformation(item);
            }, false);
            root.appendChild(newLi);
        });
    }
}

function displayInformation(serieName) {
    console.log(serieName);
    document.getElementById("search").value = serieName;
}

function search() {
    var searchText = document.getElementById("search").value;

    if(searchText != '')
        console.log(searchText);
}