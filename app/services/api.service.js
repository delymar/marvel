/**
 * Created by Delymar on 23/10/2016.
 */
(function () {
    'use strict'

    angular.module('app').
    factory('apiService', apiService);

    apiService.$inject = ['$http', '$q', 'API', 'APIKEY'];

    function apiService($http, $q, API, APIKEY) {

        var apiService = {
            getCharacters: getCharacters,
            getCharacterById: getCharacterById,
            getComics: getComics,
            getComicById: getComicById,
            getResourceFromCharacter: getResourceFromCharacter
        };
        return apiService;

        function getCharacters(page) {
            var deferred = $q.defer();
            var limit = '&limit=10';
            page = page === undefined ? 0 : page * 10;
            var offset = '&offset=' + page;
            $http.get(API + '/v1/public/characters' + APIKEY + limit + offset)
                .success(function (value, status, headers, config) {
                    deferred.resolve(value.data);
                })
                .error(function (status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        };

        function getCharacterById(characterId) {
            var deferred = $q.defer();
            $http.get(API + '/v1/public/characters/' + characterId + APIKEY)
                .success(function (value, status, headers, config) {
                    deferred.resolve(value.data.results);
                })
                .error(function (status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        };

        function getResourceFromCharacter(characterId, resource) {
            var deferred = $q.defer();
            $http.get(API + '/v1/public/characters/' + characterId + '/' + resource + APIKEY)
                .success(function (value, status, headers, config) {
                    deferred.resolve(value.data.results);
                })
                .error(function (status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        };

        function getComics(page) {
            var deferred = $q.defer();
            var limit = '&limit=10';
            page = page === undefined ? 0 : page * 10;
            var offset = '&offset=' + page;
            $http.get(API + '/v1/public/comics' + APIKEY + limit + offset)
                .success(function (value, status, headers, config) {
                    deferred.resolve(value.data.results);
                })
                .error(function (status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        };

        function getComicById(comicId) {
            var deferred = $q.defer();
            $http.get(API + '/v1/public/comics/' + comicId + APIKEY)
                .success(function (value, status, headers, config) {
                    deferred.resolve(value.data.results);
                })
                .error(function (status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        };


    }
})();
