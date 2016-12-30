(function() {
    'use strict';
    angular.module('app')
        .controller('characterController', characterController);

    characterController.$inject = ['$scope', '$state', 'apiService', '$uibModal'];
    /* @ngInject */
    function characterController($scope, $state, apiService, $uibModal) {
        var vm = this;
        init();

        function init () {
          vm.characterId = $state.params.id;
          getCharacterData(vm.characterId);
          vm.comics = getCharacterResource(vm.characterId, 'comics');
          vm.events = getCharacterResource(vm.characterId, 'events');
          vm.series = getCharacterResource(vm.characterId, 'series');
          vm.stories = getCharacterResource(vm.characterId, 'stories');
        }

        function getCharacterData (characterId) {
          apiService.getCharacterById(characterId).then(
            function success (resp) {
                if(!_.isEmpty(resp[0].comics.items)) {
                    _.each(resp[0].comics.items, function(comic) {
                    var str = comic.resourceURI.split('/');
                    comic.id = str[6];
                    return comic;
                    })
                }
                vm.characterDetails = resp[0];
                console.log("hola mundooo")
            },
            function error (err) {
                console.log("err",err)
              }
          );
        }

        function getCharacterResource(characterId, resource) {
          return apiService.getResourceFromCharacter(characterId, resource).then(
            function success (resp) {
                return resp;
            },
            function error (err) {
                console.log("err",err)
                return;
              }
          );
        }

          vm.actions= {
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
