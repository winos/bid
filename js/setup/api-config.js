(function() {
	'use strict'

	angular
		.module('bid')
		.constant('API', ConfigApi())

	function ConfigApi () {

		var apiObj =  {
			url : {
				endpointApi: 'apibidking.heroku.com'
			},
			point: function (endpoint) {
				return `${this.url.endpointApi}/${endpoint}`
			}
		}

		return  {
			host: apiObj.url.endpointApi
			// Routes
			auctions: apiObj.point('auctions'),
		}
	}
})()