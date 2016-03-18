(function() {

	'use strict'

	// definition module
	angular
		.module('bid.auth')
		.controller('LoginController', LoginController)

	// 
	LoginController.$inject = ['$state', 'AuthService']

	function LoginController ($state, AuthService) {
		
		// login access
		this.login = function (user) {		
			// validate user
			AuthService.loginPassword(user.username, user.password)
				.then(function (data) {
					$state.go('dash.auction')
				}).catch(function (msg) {
					console.log(msg)
				})
		}

		this.signup = function (user) {

			AuthService.signup(user)
				.then(function (data) {
					AuthService.storage.set('jwt', data.token)
				})
		}
	}

})()