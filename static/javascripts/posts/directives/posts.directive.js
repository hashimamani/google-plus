(function(){
	'use strict';

	angular
	  .module('thinkster.posts.directives')
	  .directives('posts',posts);

	function posts(){

		var directive = {
			controller:'PostsController',
			controllerAs:'vm',
			restrict:'E',
			scope:{
				posts: '='
			},

			templateUrl:'/static/templates/posts/posts.html'
		};

		return directive;
	}  
})();