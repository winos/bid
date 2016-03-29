(function() {
	'use strict'

	// definition module
	angular
		.module('bid.auction')
		.controller('AuctionController', AuctionController)

	AuctionController.$inject = ['$state', 'AuctionService', '_']

	function AuctionController ($state, AuctionService, _) {
		var self = this

		self.bid = {
			//user:  {name:'Dawin Ossa', credits: 100}
		}
		
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

		this.giveMore = giveMore

		function giveMore (auction) {
			if (!self.bid.user) {
				self.bid.user = {name:'Dawin Ossa', credits: 100}
			} else {

				var credits = self.bid.user.credits
				
				if (credits > 0) {
					self.auctions[0].price += 1
					self.auctions[0].time_rules.init = 20 
					self.bid.user.credits -= 3 
				} else {
					alert('se te acabaron los creditos')
					self.bid = {}
				}
			}
		}

		this.list()
	}
})()