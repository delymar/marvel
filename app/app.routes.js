(function() {

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

        $urlRouterProvider.otherwise('/');
    }
})();
