(function() {
	'use strict'

	angular
		.module('bid')
		.constant('API', ConfigApi())

	function ConfigApi () {

		var api =  {
			url : {
				endpointApi: 'localhost:8080',
				protocol: 'http'
			},
			point: function (endpoint) {
				return `${this.url.protocol}://${this.url.endpointApi}/${endpoint}`
			}
		}

		return  {
			host: api.url.endpointApi,
			//Routes
			auctions: api.point('auctions'),
			authenticate: api.point('authenticate'),
			signup: api.point('users'),
			me: api.point('users/me')
		}
	}
})()