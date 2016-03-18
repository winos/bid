(function() {
	'use strict'

	// define service
	angular
		.module('bid.auth')
		.service('AuthService', AuthService)

	AuthService.$inject = [
        '$q'
    ]

	function AuthService ($q) {
		
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

		// save credentials localstorage
		

		return {
			loginPassword : loginPassword
		}
	}
})()