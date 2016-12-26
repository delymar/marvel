(function(){
    'use strict';
    angular.module('app')
        .directive('feed',function(){
            return {
                templateUrl:'app/components/feed/feed.html',
                restrict: 'E',
                replace: true,
                controller: feedController
            }
        });

    feedController.$inject = ['$state', '$scope', 'apiService', '$uibModal'];
    function feedController($state, $scope, apiService, $uibModal) {
        var vm = this;

            apiService.getAll().then(
                function success (resp) {
                    $scope.characters = resp;
                    console.log("characters", $scope.characters)
                },
                function error (err) {
                    console.log("err",err)
                  }
              );

              $scope.actions= {
                OpenComicsDetailsModal: function (nameComics) {
                    console.log("estoy en comicsDetailsController", nameComics)
                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/components/comicsDetails/comicsDetails.html',
                        controller: 'comicsDetailsController',
                        size: 'md',
                        resolve: {
                            items: function(){
                                var comicsInfo = {
                                    nameComics: nameComics
                                };
                                return comicsInfo;
                            }
                        }
                    })
                },
              };
    }

})();
