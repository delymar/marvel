(function() {
    'use strict';
    angular.module('app')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', '$state', 'apiService'];
    /* @ngInject */
    function dashboardController($scope, $state, apiService) {
        var vm = this;
    }
})();
