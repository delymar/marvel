(function () {
    'use strict';

    angular
        .module('app')
        .directive('footerDirective', footerDirective);

    function footerDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/footer/footer.html',
            controller: footerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    footerController.$inject = [];

    /* @ngInject */
    function footerController() {
        var vm = this;

        activate();

        function activate() {
            //console.log('footer Activate');
        }
    }
})();
