(function(angular) {

angular
	.module('bid')
	.directive('bidkingCounter', function($interval) {
  		'use strict'

		var properties = {}

		properties.template =  '<span id="counterLabel">{{time}}</span>'
		properties.restrict = 'E'
		properties.scope = {
			time: '=',
		}
		
		properties.link = function (scope, element, attrs) {

			var timeoutId
			,	time

			//start()

    		function updateTime() {
    			scope.time--

    			if (scope.time === 0)
    				stop()
    		}

			//run counter

			function start () {
				timeoutId = $interval(function() {
      				updateTime() // update DOM
	    		}, 1000)
			}

			element.on('$destroy', function() {
      			$interval.cancel(timeoutId)
    		})

			function stop() {
				if (timeoutId)
					$interval.cancel(timeoutId)

				alert('termino')
				//clearInterval(timer)
			}	
		}

		return properties 
	})
})(angular, null)