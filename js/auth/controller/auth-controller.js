(function() {
	'use strict'

	// definition module
	angular
		.module('bid.auth')
		.controller('LoginController', LoginController)

	LoginController.$inject = ['$state', 'AuthService', 'AuthorizerService', '_']

	function LoginController ($state, AuthService, AuthorizerService, _) {
		
		// login access
		this.login = function (user) {		
			// validate user
			AuthService.loginPassword(user.username, user.password)
				.then(function (data) {
					var response  = data.data.data
					AuthService.storage.set('jwt', response.token)

					$state.go('dash.auction', {}, {reload: true})
				}).catch(function (data) {
					alert(data.data.message)
				})
		}

		this.signup = function (user) {

			var data = _.omit(user, 'birthday')

			AuthService.signup(data)
				.then(function (data) {
					var response  = data.data.response
					AuthService.storage.set('jwt', response.token)
					$state.go('dash.auction')
				}).catch(function (data) {
					alert(data.data.message)
				})
		}

		this.logout = function () {
			$state.go('login')
			AuthService.storage.remove('jwt')
		}
	}
})()