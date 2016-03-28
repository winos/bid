(function(angular){

	var dependencies = []

	angular
		.module('bid.auction', dependencies)
		.config(Configuration)
		.config(Run)

	function Configuration () {}
	function Run () {}

})(angular, null)
