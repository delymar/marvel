(function(){
    'use strict';
    angular.module('app')
        .directive('favorite',function(){
            return {
                templateUrl:'app/components/favorite/favorite.html',
                restrict: 'E',
                replace: true,
                controller: favoriteController,
                controllerAs: 'vm'
            }
        });

    favoriteController.$inject = ['$state', '$scope', 'favoriteService'];
    function favoriteController($state, $scope, favoriteService) {
        var vm = this;

        init();

        function init() {
            favoriteService.list().then(function success(favoriteList) {
                $scope.favoriteList = favoriteList;
            });
        }

        $scope.addComic = function (comicId) {
            favoriteService.add(comicId).then(function success(favoriteList){
                $scope.favoriteList = favoriteList;
            });
        }

        $scope.removeComic = function (comicId) {
            favoriteService.remove(comicId).then(function success(favoriteList){
                $scope.favoriteList = favoriteList;
            });
        }

        function loadFavorite($event, favorite){
         favoriteService.list().then(function success(favoriteList) {
             $scope.favoriteList = favoriteList;
         });
       }

       $scope.$on('favorite', loadFavorite)


    }

})();
