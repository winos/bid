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
			console.log(user)
			AuthService.loginPassword(user.username, user.password)
				.then(function (data) {
					alert(data.message)
				}, function (err) {
					alert(err.message)
				})
			//$state.go('dash.auction')
		}
	}

})()