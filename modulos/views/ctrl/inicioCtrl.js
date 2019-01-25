/**
* princiapl Module
*
* Description
*/
angular.module('inicio', []).
controller('inicioCtrl', ['$scope', '$timeout', 'helpers', function($scope, $timeout, helpers){
	var d = new Date(); 
    $scope.timeView =  d.getTime();

	$scope.appDisabled = false;
	$scope.viewsData = [];

	$scope.indexFuncion = function (datos) {

		$scope.appDisabled = true;

		helpers.request('sliders')
		.get()
		.$promise.then(function(resp){
			console.log('basica: ', resp);

			$scope.viewsData = resp.respuesta;
			
		},function(error){
		})
		.finally(function () {
			$timeout(function(){
				$scope.appDisabled = false;
			},3000);
		});
	};

	$scope.indexFuncion();
}])