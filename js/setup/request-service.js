(function () {

angular
	.module('bid')
	.service('RequestService', RequestService)

	RequestService.$inject = ['$http']

	function RequestService ($http) {

		function request(method, params, url) {

			switch(method) {
				case 'post':
					return $http({method:'POST', data:params, url:url})
				break

				case 'get':
					return $http({method:'GET', params:params, url:url})
				break

				default:
					throw {error: 'Can not find method'}
				break
			}
		}
		
		return  request
	}
})()
