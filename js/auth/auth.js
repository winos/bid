(function(angular){

	var dependencies = [
        'angular-storage',
        'angular-jwt'
	]

	angular
		.module('bid.auth', dependencies)
		.config(Configuration)
        .run(Run)
        .constant('APP_PERMISSION', {
            viewDashboard : 'viewDashboard',
            viewSite: 'viewSite'
        })
        .constant('APP_ROLES', {
            anon: 'anon',
            user: 'user',
            administrator: 'administrator'
        })

    function Configuration ($stateProvider, $httpProvider, APP_PERMISSION) {
        
        $httpProvider.interceptors.push('AuthInterceptor')

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
                    permissions: [APP_PERMISSION.viewSite]  
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/auth/signup-tpl.html',
                controller: 'LoginController',
                controllerAs: 'lc',
                data: {
                    permissions: [APP_PERMISSION.viewSite]  
                }
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutController',
                controllerAs: 'lc',
                data: {
                    permissions: [APP_PERMISSION.viewDashboard]  
                }
            })
            .state('forgot', {
        		url: '/forgot',
        		templateUrl: 'views/auth/forgot-tpl.html',
                data: {
                    permissions: [APP_PERMISSION.viewSite]  
                }
        	})
	}

	function Run (
        $rootScope, $templateCache, $state, store, 
        AuthorizerService, jwtHelper, APP_ROLES) {

        // listen event stateChange
        $rootScope.$on('$stateChangeStart', 
            function (event, toState, toParams) { 

                var permissions = (toState.data && toState.data.permissions ) 
                                    ? toState.data.permissions
                                    : null

                
                var user = store.storage.get('jwt') 
                            ? jwtHelper.decodeToken(store.storage.get('jwt'))
                            : null

                $rootScope.user = user

                if (!user) {
                    user  = {role: APP_ROLES.anon}
                }

                var authenticator = new AuthorizerService(user) 
                
                if ( permissions && !authenticator.canAccess(permissions) ) {
                
                    if ( !user || user.role === APP_ROLES.anon ) {   
                        event.preventDefault()
                        $state.go('login')
                    }
                }
            })
    }

})(angular, undefined)
