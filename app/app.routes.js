(function () {

    angular.module('app').config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('dashboard', {
                url: '/',
                views: {
                    "main": {
                        controller: 'dashboardController',
                        controllerAs: 'vm',
                        templateUrl: 'app/dashboard/dashboard.html'
                    }
                }
            })
            .state('character', {
                url: '/character/:id',
                views: {
                    "main": {
                        controller: 'characterController',
                        controllerAs: 'vm',
                        templateUrl: 'app/dashboard/character/character.html'
                    }
                }
            })

        $urlRouterProvider.otherwise('/');
    }
})();
