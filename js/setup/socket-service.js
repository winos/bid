(function () {
	'use strict'

	angular
		.module('bid')
		.service('SocketService', SocketService)

	SocketService.$inject = ['$rootScope']

	function SocketService ($rootScope) {
		
		var _socket = io.connect('http://localhost:8080');
		
		function checkEvent(eventName) {
			return typeof eventName === 'string'
		}

		return {
			on: function (eventName, callback) {
				if (checkEvent(eventName)) {
					_socket.on(eventName, function () {
						var args = arguments
						$rootScope.$apply(function () {
							callback.apply(_socket, args)
						})
					})
				} else {
					throw 'EventName should be a string'
				}
			}, 	
			
			emit: function (eventName, data, callback) {
				if (checkEvent(eventName)) {
					_socket.emit(eventName, data, function () {
						var args = arguments
						if (callback) {
							$rootScope.$apply(function () {
								callback.apply(_socket, args)
							})
						}
					})
				}

			} 	
		}
	}
})()