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

    favoriteController.$inject = ['$state', '$scope', 'apiService'];
    function favoriteController($state, $scope, apiService) {
        var vm = this;

    }

})();
