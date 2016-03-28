(function () {

angular
	.module('bid')
	.service('RequestService', RequestService)

	RequestService.$inject = ['$http']

	function RequestService ($http) {

		function request(method, params, url) {

			console.log('request params', params)
			switch(method) {
				case 'post':
					return $http({method:'POST', data:params, url:url})
				break

				case 'get':
					return $http({method:'GET', data:params, url:url})
				break

				default:
					throw {error: 'Can not find method'}
				break
			}
		}
		
		return  request
	}
})()
