(function() {
    'use strict';

    angular
        .module('app')
        .directive('headerDirective', headerDirective);

    function headerDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/header/header.html',
            controller: headerController,
            controllerAs: 'headerController',
            bindToController: true
        };

        return directive;
    }

    headerController.$inject = ['$state', '$scope', '$window'];

    /* @ngInject */
    function headerController($state, $scope, $window) {
        var vm = this;
    }
})();