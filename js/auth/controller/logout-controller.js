(function() {
	'use strict'

	// definition module
	angular
		.module('bid.auth')
		.controller('LogoutController', LogoutController)

	LogoutController.$inject = ['$state', 'AuthService']

	function LogoutController ($state, AuthService) {

		this.logout = function () {
			AuthService.storage.remove('jwt')
			$state.go('login')
		}

		this.logout()
	}
})()
