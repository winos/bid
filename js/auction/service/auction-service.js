(function() {
	'use strict'

	// Define service
	angular
		.module('bid.auction')
		.service('AuctionService', AuctionService)

	AuctionService.$inject = [
        'API', 'RequestService'
    ]

	function AuctionService (API, RequestService) {
				
		function listAuction (data) {
			return RequestService('get', data, API.auctions)
		}

		return {
			list: listAuction
		}
	}
})()