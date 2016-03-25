(function() {
	'use strict'

	// Define service
	angular
		.module('bid.auth')
		.service('AuthService', AuthService)

	AuthService.$inject = [
        '$q', 'store', 'API', 'RequestService'
    ]

	function AuthService ($q, store, API, RequestService ) {
				
		function loginPassword (username, password) {
			var data = {email: username,password: password} 
			return RequestService('post', data, API.authenticate)
		}

		function signup (user) {
			return RequestService('post', user, API.signup)
		}

		return {
			signup: signup,
			loginPassword: loginPassword,
			// this is angular-storage
			storage: store
		}
	}
})()