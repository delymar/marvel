/**
 * Created by Delymar on 23/10/2016.
 */
(function() {
    'use strict'

    angular.module('app').
    factory('favoriteService', favoriteService);

    favoriteService.$inject = ['apiService', '$q'];

    function favoriteService(apiService, $q) {

        var favoriteService = {
            add: add,
            list: list,
            remove: remove,
            isFavorite: isFavorite
        };
        return favoriteService;

        function verify(){
            return JSON.parse(localStorage.getItem('favorites'));
        }

        function add(comicId) {
            var deferred = $q.defer();
            apiService.getComicById(comicId)
                .then(function success(value, status, headers, config){
                    var storage = new Array();
                    if (verify() != 'null' || verify() != null)
                        storage = _.map(verify(), _.clone);
                    if (_.isEmpty(_.find(storage, function(o){ return o.id === value[0].id })))
                    {
                        storage.push(value[0]);
                        localStorage.setItem('favorites', JSON.stringify(storage));
                        deferred.resolve(storage);
                    }
                    else {
                        deferred.reject({err: 'Ya es favorito'});
                    }
                }, function error(err){
                    deferred.reject(status);
                });

            return deferred.promise;
        };

        function list() {
            var deferred = $q.defer();
            var storage = new Array();
            if (verify() != 'null' || verify() != null)
                storage = _.map(verify(), _.clone);
            deferred.resolve(storage);
            return deferred.promise;
        };

        function isFavorite(comicId) {
          var storage = new Array();
          if (verify() != 'null' || verify() != null)
              storage = _.map(verify(), _.clone);
          if (_.isEmpty(_.find(storage, function(o){ return o.id === comicId.id })))
          {
              return false;
          }
          else {
              return true
          }
        };

        function remove(comicId) {
            var deferred = $q.defer();
            var storage = new Array();
            if (verify() != 'null' || verify() != null){
                storage = _.map(verify(), _.clone);
                _.remove(storage, function(comic) { return comic.id === comicId });
                localStorage.setItem('favorites', JSON.stringify(storage));
            }
            deferred.resolve(storage);
            return deferred.promise;
        };

    }
})();
