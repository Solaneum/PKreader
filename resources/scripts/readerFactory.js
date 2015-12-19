angular.module("readerApp")
    .factory('readerFactory', function ($resource) {

        var serverAddress = 'http://localhost:8080';
        var url = serverAddress + '/disponibilitearticle/services/reference/:ref';
        
        return $resource( url , {ref:'@ref'} );

});
