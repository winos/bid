(function(){
	'use strict'

	angular
		.module('bid.auth')
		.factory('AuthInterceptor', AuthInterceptor)

	AuthInterceptor.$inject = ['$q', 'store', '$injector', 'API']

	function AuthInterceptor ($q, store, $injector, API) {
		
		return {
			'request' : function (config) {

				if ( !config.headers['Authorization'] 
					&& config.url.includes(API.host) ) {

					var token = store.get('jwt') || null
					
					if (token) 
						config.headers.Authorization = 'Bearer '+ token 
				}
				return config
			}
		}
	}
})()