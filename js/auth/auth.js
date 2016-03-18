(function(angular){

	var dependencies = [
		'ui.router',
        'angular-storage'
	]

	angular
		.module('bid.auth', dependencies)
		.config(Configuration)
        .run(Run)

    function Configuration ($stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    '': {
                        templateUrl: 'views/auth/login-tpl.html',
                        controller: 'LoginController',
                        controllerAs: 'lc'
                    },
                    'nav@login': {
                        templateUrl: 'views/partials/header.html'
                    },
                    'footer@login': {
                        templateUrl: 'views/partials/footer.html'
                    }
                },
                data: {
                    role: 4 
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/auth/signup-tpl.html',
                controller: 'LoginController',
                controllerAs: 'lc'

            })
            .state('forgot', {
        		url: '/forgot',
        		templateUrl: 'views/auth/forgot-tpl.html'
        	})
	}

	function Run ($rootScope, $state) {

        // listen event stateChange
		/*$rootScope.$on('$stateChangeStart', 
			function (event, toState, toParams) { 

                var roles = {
                    anonRole: 4
                }

                if ( !toState.hasOwnProperty('data') ) {
                    toState.data = { role : 8 }
                }

                var Auth = {
                        userLogged: function () {
                            return true
                        }
                    }
            
                if((toState.data.role === roles.anonRole) && Auth.userLogged()){
                    $state.go('dash.auction');
                    console.log('has access')
                    //event.preventDefault();
                }
                console.log(toState.data)
		})*/
	}

})(angular, undefined)
