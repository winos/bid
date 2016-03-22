(function() {
	'use strict'

	// Define service
	angular
		.module('bid.auth')
		.service('AuthService', AuthService)

	AuthService.$inject = [
        '$q', 'store'
    ]

	function AuthService ($q, store) {
		
		var emulateToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGF3aW4iLCJlbWFpbCI6ImRhd2lub3NAZ21haWwuY29tIiwiYWdlIjoyMywicm9sZSI6InVzZXIifQ.ETloeG4F8NolKAtKaS66LnG0VYkTr-ono-fKeQuA9_Q'
		
		function loginPassword (username, password) {

			return $q(function (resolve, reject) {
				if ( username === 'dawinos@gmail.com' 
					&& password === '1234'
				   ) {
					resolve({
						success: true,
						message: 'login success',
						token:emulateToken
					})
				} else {
					reject({success: false, message: 'login failed'})
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