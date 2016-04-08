(function() {
	'use strict'

	// Define service
	angular
		.module('bid.auth')
		.service('AuthService', AuthService)

	AuthService.$inject = [
        '$q', 'store', 'API', 'RequestService', 'jwtHelper'
    ]

	function AuthService ($q, store, API, RequestService, jwtHelper) {

		function loginPassword (username, password) {
			var data = {email: username,password: password}
			return RequestService('post', data, API.authenticate)
		}

		function me () {
			return RequestService('get',{}, API.me)
		}

		function signup (user) {
			return RequestService('post', user, API.signup)
		}

		function userLogged () {
			return  store.storage.get('jwt')
                        ? jwtHelper.decodeToken(store.get('jwt'))
                        : null
		}

		return {
			signup: signup,
			loginPassword: loginPassword,
			storage: store,
			userLogged: userLogged,
			me: me
		}
	}
})()
