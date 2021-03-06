(function(){
	'use strict';

	angular
	    .module('thinkster.authentication.services')
	    .factory('Authentication', Authentication);

	Authentication.$inject = ['$cookies','$http'];
	
	function Authentication($cookies,$http){

		var Authentication = {
			getAuthenticatedAccount:getAuthenticatedAccount,
			isAuthenticated:isAuthenticated,
			login:login,
			logout:logout,
			register : register,						
			setAutheticatedAccount:setAutheticatedAccount,
			unauthenticate:unauthenticate
		}

		return Authentication;


	    function register(email,password,username) {

            
	     	return $http.post('/api/v1/accounts/',{

	     		email:email,
	     		username:username,
	     		password:password
	     		

	     	}).then(registerSuccessFn,registerErrorFn);


			function registerSuccessFn(data,status,headers,config){
				Authentication.login(email,password);
			}

			function registerErrorFn(data,status,headers,config){
				console.log(data);
				console.error('Epic failure!');
			};
	     }

	    function login(email,password){

	     	return $http.post('/api/v1/auth/login/',{

	     		email:email,
	     		password:password

	     	}).then(loginSuccessFn,loginErrorFn);



	     	function loginSuccessFn(data,status,headers,config){

	     		Authentication.setAutheticatedAccount(data.data);
	     		window.location = '/';
	     	}

	     	function loginErrorFn(data,status,headers,config){ 
	     	    console.log(data);    		

	     		console.error('Epic failure!');
	     	}
	     }

	    function getAuthenticatedAccount(){
	     	if(!$cookies.authenticatedAccount){
	     		return;
	     	}

	     	return JSON.parse($cookies.authenticatedAccount);
	     }

	    function isAuthenticated(){
	     	return !!$cookies.authenticatedAccount;
	     }

	    function setAutheticatedAccount(account) {
	     	$cookies.authenticatedAccount = JSON.stringify(account);

	     } 
	    function unauthenticate(){
	     	delete $cookies.authenticatedAccount;
	     }

	    function logout(){
	    	return $http.post('/api/v1/auth/logout/')
	    	.then(logoutSuccessFn,LogoutErrorFn);

	    	function logoutSuccessFn(data,status,headers,config){
	    		Authentication.unauthenticate();

	    		window.location = '/';
	    	}

	    	function logoutErrorFn(data,status,headers,config){
	    		console.error('Epic failure!');
	    	}
	    } 
			
		} 

})();