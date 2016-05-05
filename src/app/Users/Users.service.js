(function(){
	angular
		.module('pcui')
		.service('Users', Users)

	function Users(Auth){

		var _currentUser = function(){
			 Auth.currentUser().then(function(user){
			 	return user
			})
		}

		return {
			currentUser: _currentUser
		};
	}
})();