angular.module("readerApp")
    .controller("readerCtrl", ['$scope', 'readerFactory', function($scope, readerFactory) {


    $scope.test = "Hullo";
    $scope.middleContent = new Object();
    $scope.availableDocs = ["Clan Calderini", "Post Forum", "Jeux adaptés à WoW"];

    $scope.authorList = [{ name: "Kalifryn", id: 1 }, { name: "Zeff", id: 2 }, { name: "Tireks", id: 3 }];
    $scope.selectedAuthor = $scope.authorList[1];

/*$scope.options = [{ name: "a", id: 1 }, { name: "b", id: 2 }];
$scope.selectedOption = $scope.options[1];*/


// ---------------------- METHODES AFFICHAGE -----------------------------------------------

    $scope.updateDocs = function()  {
        /*$scope.selectedAuthor = */
        if ($scope.selectedAuthor.name == "Kalifryn") {
            $scope.availableDocs = ["Système PK", "Vie à bord du Lycan Borgne", "Renaissance", "Carmen & Jacob"];
        } else if ($scope.selectedAuthor.name == "Zeff") {
            $scope.availableDocs = ["Clan Calderini", "Post Forum", "Jeux adaptés à WoW"];
        } else if ($scope.selectedAuthor.name == "Tireks") {
            $scope.availableDocs = ["Clayton Whyn : Journal de bord", "Jakes Thielor : la poisse de l'alcoolique teubé", "Jedrôk, le tauren sympa"];
        }
     };  

// ---------------------------------------- METHODE EN POST ---------------------------------------
    $scope.search = function () {


        $scope.errorMsg = "Recherche en cours...";
        $scope.article = new Object();

        critere = {
            ref: $scope.IDRecherche
        };

        readerFactory.get(critere, function(value, responseHeaders){
            // Fonction en cas de réussite (code de 200 à 299)
            $scope.errorMsg = "";
            $scope.article = value;
            // Toutes les propriétés nulles de la réponse sont remplacées
            for (var property in $scope.article) {
                if ($scope.article[property] == undefined || $scope.article[property] == '') {
                    $scope.article[property] = "Non renseigné";
                } 
                // // TODO : A TESTER
                else {
                    if( Object.prototype.toString.call( $scope.article[property] ) === '[object Object]' ) {
                        for (var arrayProperty in $scope.article[property]) {
                            if ($scope.article[property][arrayProperty] == undefined || $scope.article[property][arrayProperty] == '') {
                                $scope.article[property][arrayProperty] = "Non renseigné";
                            }
                        }
                    }                
                }
            }


        }, function(httpResponse){
            // Fonction en cas d'erreur (code non compris entre 200 et 299)
            if (httpResponse.status == "404") {                
                $scope.errorMsg = "Aucun article ne correspond à cette référence. Veuillez vérifier votre critère.";
            } else {
                if (httpResponse.status == "500") { 
                    $scope.errorMsg = "Erreur interne au serveur, veuillez réessayer ultérieurement.";
                } else {
                    if (httpResponse.status == "0") { 
                    $scope.errorMsg = "Aucune réponse du serveur. Contactez la DSI.";
                    } else {
                        $scope.errorMsg = "Erreur inconnue. Are you a wizard ?!";
                    }
                }
            }
            
        })

    };


}]);