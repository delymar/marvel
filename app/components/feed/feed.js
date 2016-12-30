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
        
        $scope.totalCharacters = 1;
        $scope.currentPage = 1;
       
        init()

        function init() {
            getCharacters(1);
        }


        function getCharacters(n){
            console.log("pagina:",n);
            apiService.getCharacters(n).then(
                function success (resp) {
                    _.each(resp.results, function (character) {
                    if(!_.isEmpty(character.comics.items)) {
                        _.each(character.comics.items, function(comic) {
                        var str = comic.resourceURI.split('/');
                        comic.id = str[6];
                        return comic;
                        })
                    }
                    return character;
                    });
                    $scope.characters = resp.results;
                    $scope.totalCharacters = resp.total;
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

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
            getCharacters(pageNo);
        };
    }

})();
