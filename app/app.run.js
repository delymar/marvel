(function() {

    angular.module('app')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state'];

    function runBlock($rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log('view change Start ')
            $rootScope.currentState = toState.name;
        });

        $rootScope.$on('$viewContentLoaded', function (){
          console.log('view Loaded');
        });
    }

}());
