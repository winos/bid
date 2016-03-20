(function () {
	'use strict'

	angular
		.module('bid.auth')
		.service('AuthorizerService', AuthorizerService)
	
	function AuthorizerService (APP_PERMISSION, APP_ROLES) {

		return function (user) {
			
			function canAccess (permissions) {

				var permission
				,   access = false
				for (var i in permissions) {
					permission = APP_PERMISSION[permissions[i]]
					
					if ( !permission ) 
						throw 'Bad Permission'					

					if (user && user.role) 
						switch (permission) {
							case APP_PERMISSION.viewDashboard :
								access = (user.role === APP_ROLES.user)
							break
							case APP_PERMISSION.viewSite :
								access = (user.role === APP_ROLES.anon)
							break
						}

				}
				
				return access
			}

			return  {
				canAccess: canAccess
			}
		}
	}
})()