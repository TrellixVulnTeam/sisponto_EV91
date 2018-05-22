angular.module('sisponto',[]).controller('sisponto-controller-login', function ($scope, $http, $window) {

    $scope.usuario = {};
    $scope.message = '';
    $scope.user={};

    $scope.efetuarLogin = function () {

        $scope.usuario.username = $('#username').val();
        $scope.usuario.senha = $('#password').val();

        $http.post('/login', {email: $scope.usuario.username, password: $scope.usuario.senha})
            // handle success
            .success(function (data, status) {
                if(status === 200 && data.result){
                    alert('funcionou');
                    window.location.href="index";
                    user = true;
                } else {
                    alert('erro');
                    user = false;
                }     
            })
            // handle error
            .error(function (data) {
                alert('function error');
                user = false;
            });
    };

});
