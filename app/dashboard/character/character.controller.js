(function() {
    'use strict';
    angular.module('app')
        .controller('characterController', characterController);

    characterController.$inject = ['$scope', '$state', 'apiService'];
    /* @ngInject */
    function characterController($scope, $state, apiService) {
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
    }
})();
