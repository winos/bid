(function() {
	'use strict'

	// Define service
	angular
		.module('bid.credits')
		.service('CreditService', CreditService)

	CreditService.$inject = ['$q', 'store', 'API', 'RequestService']

	function CreditService ($q, store, API, RequestService) {

		function list () {
			return RequestService('get',{}, API.credits)
		}

    function save (code) {
      var data = {code: code}
      return RequestService('post', data, API.credits)
    }

		return {
			list: list,
      save: save
		}
	}
})()
