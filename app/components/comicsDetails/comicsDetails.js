
(function() {
    'use strict';
    var app = angular.module('app')
        .controller('comicsDetailsController', ['$scope', '$uibModalInstance',  'apiService', 'items',
            function ($scope, $uibModalInstance, apiService, items) {
                var vm = this;

                apiService.getComics().then(
                    function success (resp) {
                        $scope.comic = resp;
                    },
                    function error (err) {
                        console.log("err",err)
                      }
                  );
                  $scope.actions = {
                  CloseModal: function () {
                      $uibModalInstance.close();
                  }
              };

            }]
        );
})();
