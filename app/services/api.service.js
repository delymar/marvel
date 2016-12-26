/**
 * Created by Delymar on 23/10/2016.
 */
(function() {
    'use strict'

    angular.module('app').
    factory('apiService', apiService);

    apiService.$inject = ['$http', '$q'];

    function apiService($http, $q) {

        var apiService = {
            getAll: getAll,
            getComics: getComics
        };
        return apiService;

        function getAll() {
                  var deferred = $q.defer();
                  $http.get('/apiData/value.json')
                      .success(function(value, status, headers, config) {
                          deferred.resolve(value.results);
                      })
                      .error(function(status) {
                          deferred.reject(status);
                      });
                  return deferred.promise;
              };
              function getComics() {
                        var deferred = $q.defer();
                        $http.get('/apiData/value.json')
                            .success(function(value, status, headers, config) {
                                deferred.resolve(value.comic);
                            })
                            .error(function(status) {
                                deferred.reject(status);
                            });
                        return deferred.promise;
                    };


    }
})();
