(function() {
    'use strict';
    angular.module('app')
        .controller('characterController', characterController);

    characterController.$inject = ['$scope', '$state', 'apiService', '$uibModal'];
    /* @ngInject */
    function characterController($scope, $state, apiService, $uibModal) {
        var vm = this;

        vm.characterId = $state.params.id;
        console.log(vm.characterId);

        apiService.getCharacterDetails().then(
            function success (resp) {
                $scope.CharacterDetails = resp;
                console.log("aqui me muestra los detalles", $scope.CharacterDetails);
            },
            function error (err) {
                console.log("err",err)
              }
          );

          $scope.actions= {
            OpenComicsDetailsModal: function (comicsId) {
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
                                comicsId: comicsId
                            };
                            return comicsInfo;
                        }
                    }
                })
            },
          };
    }
})();
