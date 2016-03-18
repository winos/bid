// Create Component
	angular
		.module('bid')
		.component('userInfo', {
			templateUrl: 'js/user/tpl/user-item-component.html',
			controller: UserInfoController,
			controllerAs: 'vm',
			bindings: {
				title: '@'
			}
		});

	function UserInfoController (User) {
		this.user = User.getPerson()
	}