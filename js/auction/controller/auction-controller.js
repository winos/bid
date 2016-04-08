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

		function findAuction (data) {
			return _.find(self.auctions, function(auction) {
				return auction[Object.keys(data)[0]] === data[Object.keys(data)[0]]
			})
		}

		SocketService.on('auction:refresh', function (data) {

			var auction = findAuction({_id: data.auction_id})

			auction.price = data.price
			auction.time_rules.init = data.time_init
			auction.bids = {user: data.username, time:data.time}
		})

		SocketService.on('auction:winner', function (data) {
			var auction = findAuction({_id: data.auction_id})

			if (data.status) {
				auction.active = false
				alert('El usuario: '+data.winner.user.user+' ha ganado la subasta')
			}

		})

		SocketService.on('auction:changetime', function (data) {
			var auction = findAuction({_id: data.id})
			auction.time_rules.init = data.countdown
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
			} else {
				alert('Usted no posee creditos suficientes para pujar, por favor recarga')
			}
		}

		this.list.apply(this)
	}
})()
