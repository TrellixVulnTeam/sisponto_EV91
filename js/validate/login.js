angular.module('sisponto',[]).controller('sisponto-controller-login', function ($scope, $http, $window) {

    $scope.usuario = {};
    $scope.message = '';
    $scope.user={};

    $scope.efetuarLogin = function () {
        
        $http({
            method: 'POST',
            url: '/efetuarLogin',
            data {
                usuario = $scope.usuario
            }
        }).then(function(response){
            
        }, function(error){

        });

    };

});
