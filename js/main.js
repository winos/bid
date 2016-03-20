(function(){
	'use strict'

	var dependencies = [
		'ui.router',
		'bid.auth'
	]

	// Create Module
	angular
		.module('bid', dependencies)
		.config(Config)
		.run(Run)
        

	function Config ($urlRouterProvider, $stateProvider, APP_PERMISSION) {

		$urlRouterProvider.otherwise('/404');
		
		$stateProvider
			.state('home', {
            	url: '/',
            	views: {
            		'': {
        				templateUrl: 'views/home/home-tpl.html'
            		},
            		'nav@home': {
        				templateUrl: 'views/partials/header.html'
            		},
            		'footer@home': {
        				templateUrl: 'views/partials/footer.html'
            		}
            	}
        	})

        	// dashboard
        	.state('dash', {
        		url: '/dash',
        		abstract: true,
        		templateUrl: 'views/dashboard-tpl.html',
                data: {
                    permissions : [APP_PERMISSION.viewDashboard]
                }
        	})
        	.state('dash.profile', {
        		url: '/profile',
        		templateUrl: 'views/profile/info-tpl.html'
        	})
        	.state('dash.invitation', {
        		url: '/invitation',
        		templateUrl: 'views/invite/invitation-tpl.html'
        	})
        	.state('dash.auction', {
        		url: '/auction',
        		templateUrl: 'views/auctions/auctions-tpl.html'
        	})
        	
        	.state('dash.gifts', {
        		url: '/gifts',
        		templateUrl: 'views/gifts/gifts-tpl.html'
        	})
        	.state('dash.credits', {
        		url: '/credits',
        		templateUrl: 'views/credits/credits-tpl.html'
        	})
        	// help
        	.state('dash.help', {
        		url: '/help',
        		templateUrl: 'views/help/help-tpl.html'
        	})

        	// error redirect
        	.state('404', {
        		url : '/404',
        		templateUrl: 'views/errors/404.html'
        	})
	}

	function Run ($rootScope, $templateCache ) {
        $rootScope.$on('$viewContentLoaded', function() {
            $templateCache.removeAll();
        });
    }

})()
