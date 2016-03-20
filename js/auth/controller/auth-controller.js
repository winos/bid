(function() {

	'use strict'

	// definition module
	angular
		.module('bid.auth')
		.controller('LoginController', LoginController)

	LoginController.$inject = ['$state', 'AuthService', 'AuthorizerService']

	function LoginController ($state, AuthService, AuthorizerService) {
		
		// login access
		this.login = function (user) {		
			// validate user
			AuthService.loginPassword(user.username, user.password)
				.then(function (data) {
					AuthService.storage.set('jwt', data.token)
					$state.go('dash.auction', {}, {reload: true});
				}).catch(function (data) {
					alert(data.message)
				})
		}

		this.signup = function (user) {

			AuthService.signup(user)
				.then(function (data) {
					AuthService.storage.set('jwt', data.token)
					$state.go('dash.auction')
				})
		}


		this.logout = function () {
			$state.go('login')
			AuthService.storage.remove('jwt')
		}
	}

})()