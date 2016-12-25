(function(){
    'use strict';
    angular.module('app')
        .directive('comicsDetails',function(){
            return {
                templateUrl:'app/components/comicsDetails/comicsDetails.html',
                restrict: 'E',
                replace: true,
                controller: comicsDetailsController
            }
        });

    comicsDetailsController.$inject = ['$state', '$scope', 'apiService', '$uibModal'];
    function comicsDetailsController($state, $scope, apiService, $uibModal) {


    }

})();
