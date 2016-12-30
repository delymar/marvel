
(function() {
    'use strict';
    var app = angular.module('app')
        .controller('comicsDetailsController', ['$scope', '$uibModalInstance',  'apiService', 'favoriteService', 'comic', '$rootScope',
            function ($scope, $uibModalInstance, apiService, favoriteService, comic, $rootScope) {
                var vm = this;
                vm.isFavorite = isFavorite;
                vm.changeFavorite = changeFavorite;
                init();

                function init() {
                  vm.isFav = vm.isFavorite(comic.id);
                  vm.isFavText = vm.isFavorite(comic.id) ? 'Added to favourites' : 'Add to favourites';
                  apiService.getComicById(comic.id).then(
                    function success (resp) {
                      vm.comic = resp[0];
                    },
                    function error (err) {
                      console.log("err",err)
                    }
                  );
                }

                function isFavorite (comicId) {
                  return favoriteService.isFavorite(comicId);
                };

                function changeFavorite (comicId, toFavorite) {
                  if(toFavorite){
                    favoriteService.add(comicId)
                      .then(function (storage) {
                        vm.isFav = true;
                        vm.isFavText = 'Added to favourites';
                        $rootScope.$broadcast('favorite', true);
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                  }
                  else {
                    favoriteService.remove(comicId)
                      .then(function (storage) {
                        vm.isFav = false;
                        vm.isFavText = 'Add to favourites';
                        $rootScope.$broadcast('favorite', true);
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                  }
                }

                vm.actions = {
                  CloseModal: function () {
                    $uibModalInstance.close();
                  },
                };

            }]
        );
})();
