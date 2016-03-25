(function() {
	'use strict'

	// Define service
	angular
		.module('bid.auth')
		.service('AuthService', AuthService)

	AuthService.$inject = [
        '$q', 'store', '$http', 'API'
    ]

	function AuthService ($q, store, $http, API ) {
				
		function loginPassword (username, password) {
			//console.log(API.authenticate)
	
			return $http({
				method: 'POST',
				url: API.authenticate,
				data: {
					email: username,
					password: password
				}
			})
		}

		function signup (user) {

			return $q(function (resolve, reject) {						
				resolve({token: emulateToken})
			})
		}

		// save credentials localstorage
		return {
			signup: signup,
			loginPassword: loginPassword,
			// this is angular-storage
			storage: store
		}
	}
})()