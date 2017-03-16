(function (){
	'use strict';

	angular
	    .module('thinkster.authentication.controllers')
	    .controller('RegisterController',RegisterController);

	RegisterController.$inject = ['$location','$http','$scope','Authentication'];
	
	function RegisterController($location,$http,$scope,Authentication){
		var vm = this;

		vm.register = register;

		activate();

		function activate(){
			if(Authentication.isAuthenticated()){
				$location.url('/');
			}
		}


		function register(email,password,username) {			

			Authentication.register(vm.email,vm.password,vm.username);
		}
	}    
})();