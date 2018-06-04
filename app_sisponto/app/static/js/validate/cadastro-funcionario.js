angular.module('sisponto',[]).controller('sisponto-controller-cadastroFuncionario', function ($scope, $http, $window) {

    $scope.user = {};

    $(document).ready(function () { 
        $('#cpf').mask('000.000.000-00', {reverse: true});
    });

    $scope.cadastrarFuncionario = function(){
        $scope.user.name = $('#nome').val();
        $scope.user.cpf = $('#cpf').val().replace(/\D/g, "").padStart(11, '0');
        $scope.user.email = $('#email').val();
        $scope.user.password = $('#password').val();
        $scope.user.jornada = $('#jornada').val();
        $scope.user.username = $('#username').val();
        if($('input[name=chkAdmin]:checked', '#formCadFuncionario').val() == "T")
        {
            $scope.user.is_admin = true;
        }
        else
        {
            $scope.user.is_admin = false;
        }
        $http.post('/cadastro-funcionario', $scope.user).success(function (data, status) {
            if(status === 200 && data.result){
                alert(data.mensagem);
                location.reload();
            } else {
                alert(data.mensagem);
            }
        });

    }
    
});
