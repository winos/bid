(function() {
	'use strict'

	// definition module
	angular
		.module('bid.auction')
		.controller('AuctionController', AuctionController)

	AuctionController.$inject = ['$state', 'AuctionService', '_']

	function AuctionController ($state, AuctionService, _) {

		var self = this
		// list all auctions
		this.list = function () {		
			// validate user
			AuctionService.list()
				.then(function (data) {
					self.auctions = data.data.response					
				}).catch(function (data) {
					alert(data.data.message)
				})
		}
		this.list()
		
	}
})()