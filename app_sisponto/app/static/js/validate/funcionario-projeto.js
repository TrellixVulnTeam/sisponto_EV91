angular.module('sisponto',[]).controller('sisponto-controller-funcionario-projeto', function ($scope, $http, $window) {

    $scope.projetos = [];
    $scope.funcionarios = [];
    $scope.relUsuProj = {};

    $window.onload = function() {
        $http.post('/projetos').success(function (data, status) {
            if(status === 200){
                $scope.projetos = data.listaProjetos;
            } else {
                alert('Erro ao listar projetos, tente novamente mais tarde.');
            }
        });

        $http.post('/funcionarios').success(function (data, status) {
            if(status === 200){
                $scope.funcionarios = data.listaFuncionarios;
            } else {
                alert('Erro ao listar funcionários, tente novamente mais tarde.');
            }
        });
    }

    $scope.cadastrarRelUsuProj = function() {
        $scope.relUsuProj.id_user = $('#slctFuncionarios').val()
        $scope.relUsuProj.id_projeto = $('#slctProjetos').val()
        if($('#checkboxCoordenador').prop('checked'))
        {
            $scope.relUsuProj.is_coordenador = true;
        }
        else
        {
            $scope.relUsuProj.is_coordenador = false;
        }
        $http.post('/funcionario-projeto', $scope.relUsuProj).success(function (data, status) {
            if(status === 200){
                alert(data.mensagem);
                location.reload();
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

});
