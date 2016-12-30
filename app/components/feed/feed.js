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
        init()

        function init() {
            getCharacters(1);
        }


        function getCharacters(n){
            apiService.getCharacters(n).then(
                function success (resp) {
                    _.each(resp, function (character) {
                    if(!_.isEmpty(character.comics.items)) {
                        _.each(character.comics.items, function(comic) {
                        var str = comic.resourceURI.split('/');
                        comic.id = str[6];
                        return comic;
                        })
                    }
                    return character;
                    });
                    $scope.characters = resp;
                },
                function error (err) {
                    console.log("err",err)
                    }
                );

        }

        $scope.actions= {
            OpenComicsDetailsModal: function (comicId) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/components/comicsDetails/comicsDetails.html',
                    controller: 'comicsDetailsController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        comic: function(){
                            var comic = {
                                id: comicId
                            };
                            return comic;
                        }
                    }
                })
            },
        };
    }

})();
