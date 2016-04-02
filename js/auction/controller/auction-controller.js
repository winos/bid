(function() {
	'use strict'

	// definition module
	angular
		.module('bid.auction')
		.controller('AuctionController', AuctionController)

	AuctionController.$inject = [
	'$rootScope', 'AuctionService',	'_', 'SocketService', 'AuthService']

	function AuctionController ($rootScope,AuctionService, _, 
		SocketService, AuthService) {
		var self = this

		// collection of auctions		
		self.auctions = []

		SocketService.on('auction:refresh', function (data) {

			var auction = _.find(self.auctions, function(auction){
				return auction._id === data.auction_id
			})

			auction.price = data.price
			auction.time_rules.init = data.time_init
			auction.bids = {user: data.username, time:data.time}
		})

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
			var currentUser = AuthService.userLogged() 
			
			var data =  { 
				user: currentUser, 
				auction: auction._id
			} 

			var differenceCredits =  $rootScope.user.credits.general - auction.credits_required 

			if (differenceCredits >= 0 ) {
				SocketService.emit('auction:newbid', data, function(data) {
					if (data.reset) {
						$rootScope.user.credits.general -= auction.credits_required 
					}
				})			
			}
			else {
				alert('Señor usted no posee creditos suficientes para pujar, por favor recargue :D')
			}
		}

		this.list()
	}
})()