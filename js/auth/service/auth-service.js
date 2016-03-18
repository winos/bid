(function() {
	'use strict'

	// define service
	angular
		.module('bid.auth')
		.service('AuthService', AuthService)

	AuthService.$inject = [
        '$q', 'store'
    ]

	function AuthService ($q, store) {
		
		function loginPassword (username, password) {

			return $q(function (resolve, reject) {
				if ( username === 'dawinos@gmail.com' 
					&& password === '1234'
				   ) {
					resolve({success: true, message: 'login success'})
				} else {
					reject({success: false, message: 'login failed'})
				}
			})
		}

		function signup (user) {

			return $q(function (resolve, reject) {						
				resolve({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indpbm9zQGdtYWlsLmNvbSIsImFnZSI6MjMsImFkbWluIjp0cnVlfQ.fKl68NwSYOudJoSGG7B7QmJsQgR_IRcSpZgTdqfVdbY'})
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