(function() {
	'use strict'

	angular
		.module('bid')
		.constant('API', ConfigApi())

	function ConfigApi () {

		var apiObj =  {
			url : {
				endpointApi: 'localhost:8080',
				protocol: 'http'
			},
			point: function (endpoint) {
				return `${this.url.protocol}://${this.url.endpointApi}/${endpoint}`
			}
		}

		return  {
			host: apiObj.url.endpointApi,
			//Routes
			auctions: apiObj.point('auctions'),
			authenticate: apiObj.point('authenticate')
		}
	}
})()