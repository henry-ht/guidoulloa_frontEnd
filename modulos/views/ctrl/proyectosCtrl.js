/**
* proyectos Module
*
* Description
*/
angular.module('proyectos', []).
controller('proyectosCtrl', ['$scope', 'FileUploader', 'helpers', '$timeout', function($scope, FileUploader, helpers, $timeout){
	var d = new Date(); 
    $scope.timeView =  d.getTime();

    $scope.appDisabled = false;
	$scope.viewsData = [];
	$scope.uploader_uno = new FileUploader({
		url: 'http://localhost/guidoulloa_backEnd/api/sliders?nombre=slider_1'
	});
	$scope.uploader_dos = new FileUploader({
		url: 'http://localhost/guidoulloa_backEnd/api/sliders?nombre=slider_2'
	});
	$scope.uploader_tres = new FileUploader({
		url: 'http://localhost/guidoulloa_backEnd/api/sliders?nombre=slider_3'
	});
	$scope.uploader_cuatro = new FileUploader({
		url: 'http://localhost/guidoulloa_backEnd/api/sliders?nombre=slider_4'
	});

	$scope.uploader_uno.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

	$scope.uploader_uno.onAfterAddingFile = function(fileItem) {
        if ($scope.uploader_uno.queue.length>1) {
        	$scope.uploader_uno.queue[0].remove();
        }
    };

    $scope.uploader_dos.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

	$scope.uploader_dos.onAfterAddingFile = function(fileItem) {
        if ($scope.uploader_dos.queue.length>1) {
        	$scope.uploader_dos.queue[0].remove();
        }
    };

    $scope.uploader_tres.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

	$scope.uploader_tres.onAfterAddingFile = function(fileItem) {
        if ($scope.uploader_tres.queue.length>1) {
        	$scope.uploader_tres.queue[0].remove();
        }
    };

    $scope.uploader_cuatro.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

	$scope.uploader_cuatro.onAfterAddingFile = function(fileItem) {
        if ($scope.uploader_cuatro.queue.length>1) {
        	$scope.uploader_cuatro.queue[0].remove();
        }
    };



    $scope.indexFuncion = function () {
		$scope.appDisabled = true;
		helpers.request('sliders')
		.get()
		.$promise.then(function(resp){
			$scope.viewsData = resp.respuesta;
			
		},function(error){
			
		})
		.finally(function () {
			$timeout(function(){
				$scope.appDisabled = false;
			},500);
		});
	};

	$scope.storeFuncion = function (datos) {
		$scope.appDisabled = true;

		datos.onCompleteAll = function() {
			$timeout(function(){
				$scope.appDisabled = false;
			},200);
        };
		datos.queue[0].upload();
		
	};

	$scope.deleteFuncion = function (output, index) {

		$scope.appDisabled = true;
		helpers.request('sliders/:id')
		.delete(output)
		.$promise.then(function(resp){
			console.log('eliminado: ', resp);
			$scope.indexFuncion();
		},function(error){
		})
		.finally(function () {
			$timeout(function(){
				$scope.appDisabled = false;
			},1000);
		});
	}

	$scope.indexFuncion();
	
}])