(function() {
	'use strict'

	// definition module
	angular
		.module('bid.credits')
		.controller('CreditController', CreditController)

	CreditController.$inject = ['$scope','CreditService', '_']

  function CreditController ($scope,CreditService, _) {
    var self = this
    $scope.credits = {}

    this.save = function (credit) {
      CreditService.save(credit.code).then(function (response) {
        var result = response.data
        self.reset()
        if (result.status)
          alert('Se ha enviado el codigo de pago. ' +
                'En el termino de un dia se veran '+
                'reflejados los nuevos creditos.')

      })
    }

    this.reset = function () {
      $scope.credits =  angular.copy({})
    }
	}
})()
