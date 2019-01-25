jsonHt = {
	app: [],
	onInit: function () {

		config = {
			urlInit: '/',
			views: [{
				state: 'inicio',
				file: [
					'modulos/views/ctrl/inicioCtrl.js'
				],
				config: {
					url: '/',
					// abstract: true,
					templateUrl: 'modulos/views/inicio.html',
					controller: 'inicioCtrl'
				}
			},{
				state: 'proyectos',
				file: [
					'modulos/views/ctrl/inicioCtrl.js'
				],
				config: {
					url: '/proyectos',
					// abstract: true,
					templateUrl: 'modulos/views/proyectos.html',
					controller: 'proyectosCtrl'
				}
			}]
		};


		this.onLaunch(config);
		
	},
	onLaunch: function (config) {
		/**
		* appHT Module
		*
		* Description
		*/
		jsonHt.app = angular.module('appHt', [
												'ui.router',
												'angular-loading-bar',
												'oc.lazyLoad'
											])

		.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider',function($locationProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

			cfpLoadingBarProvider.includeSpinner = false;
			
			angular.forEach(config.views, function(value, key) {
				if(value.file.length){
					value.config.resolve = {
						dependncias: ['$ocLazyLoad',function  ($ocLazyLoad) {
							return $ocLazyLoad.load([{serie: true, files: value.file }]);
						}]
					}
				}
				$stateProvider.state(value.state, value.config);
			});

			$urlRouterProvider.otherwise(config.urlInit);
			$locationProvider.html5Mode(true);
		}])

		.controller('appCtrl', ['$scope', function($scope){
			console.log("princiapl 2356")
		}]);


		setTimeout(function(){
			// lanzamos la APP
			angular.bootstrap(document.body, ['appHt'], {
				strictDi: true
			});
		},500);

	}
} 