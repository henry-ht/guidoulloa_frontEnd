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
					'node_modules/angular-file-upload/dist/angular-file-upload.min.js',
					'modulos/views/ctrl/proyectosCtrl.js'
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
												'ngResource',
												'angular-button-spinner',
												'oc.lazyLoad'
											])
		.constant('URLBASE', 'http://localhost/guidoulloa_backEnd/api/')
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
			
		}])

		.factory('helpers', ['$rootScope','$resource', 'URLBASE', '$q', '$timeout', function($rootScope, $resource, URLBASE, $q, $timeout){
			helpers = {};
			helpers.request = function(finalUrl) {
				deferr = $q.defer();
				return $resource(URLBASE+finalUrl, null, {
					update: {
						method: "PUT",
						params: {
		                    id: "@id",
		                }
					},
					store: {
		          method: 'POST',
		      		headers: {
		      			'Content-Type': undefined
		      		}
		      }
				});
			};

		  helpers.reload = function (){
		    window.location.reload();
		  };

			return helpers;
		}])

		.directive('ngThumb', ['$window', function($window) {
		    var helper = {
		        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
		        isFile: function(item) {
		            return angular.isObject(item) && item instanceof $window.File;
		        },
		        isImage: function(file) {
		            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
		            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		        }
		    };

		    return {
		        restrict: 'A',
		        template: '<img  />',
		        link: function(scope, element, attributes) {
		            if (!helper.support) return;

		            var params = scope.$eval(attributes.ngThumb);

		            if (!helper.isFile(params.file)) return;
		            if (!helper.isImage(params.file)) return;

		            var img = element.find('img');
		            var reader = new FileReader();

		            reader.onload = onLoadFile;
		            reader.readAsDataURL(params.file);

		            function onLoadFile(event) {
		                var img = new Image();
		                img.onload = onLoadImage;
		                img.src = event.target.result;
		            }

		            function onLoadImage() {
		            	img.attr({src: this.src, class: attributes.addClass});
		            }
		        }
		    };
		}]);


		setTimeout(function(){
			// lanzamos la APP
			angular.bootstrap(document.body, ['appHt'], {
				strictDi: true
			});
		},500);

	}
} 