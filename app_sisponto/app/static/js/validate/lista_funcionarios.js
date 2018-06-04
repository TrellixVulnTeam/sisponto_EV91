angular.module('sisponto',['angularUtils.directives.dirPagination', 'ui.bootstrap']).controller('sisponto-controller-listaFuncionarios', function ($scope, $http, $window) {

    $scope.funcionarios = [];
    $scope.funcionarioSelecionado = {};

    $window.onload = function() {
        $http.post('/funcionarios').success(function (data, status) {
            if(status === 200){
                $scope.funcionarios = data.listaFuncionarios;
                for(let i = 0; i < $scope.funcionarios.length; i++)
                {
                    if($scope.funcionarios[i].jornada)
                    {
                        $scope.funcionarios[i].jornadaDesc = $scope.funcionarios[i].jornada + 'h';
                    }
                    else
                    {
                        $scope.funcionarios[i].jornadaDesc = '-';
                    }
                    if($scope.funcionarios[i].perfil)
                    {
                        $scope.funcionarios[i].perfilDesc = "Administrador";
                    }
                    else
                    {
                        $scope.funcionarios[i].perfilDesc = "Funcionário";
                    }
                }
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

    $scope.editFuncionario = function(funcionario) {
        $scope.funcionarioSelecionado = funcionario.funcionario;

        if(funcionario.funcionario.perfil)
        {
            $('#txtPerfilFuncEdit').prop('checked', true);
        }
        $('#txtEditEmailFunc').val(funcionario.funcionario.email);
        $('#jornada').val(funcionario.funcionario.jornada);
    }

    $scope.atualizarFuncionario = function() {
        if($('#txtPerfilFunc').prop('checked')) {
            $scope.funcionarioSelecionado.perfil = true;
        } else {
            $scope.funcionarioSelecionado.perfil = false;
        }
        $scope.funcionarioSelecionado.jornada = $('#jornada').val();
        $scope.funcionarioSelecionado.email = $('#txtEditEmailFunc').val();

        $http.put('/funcionarios', $scope.funcionarioSelecionado).success(function (data, status) {
            if(status === 200 && data.result){
                alert(data.mensagem);
                location.reload();
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

    $scope.delFuncionario = function(funcionario) {
        $scope.funcionarioSelecionado = funcionario.funcionario;

        $('#txtMatFunc').val(funcionario.funcionario.id);
        $('#txtNomeFunc').val(funcionario.funcionario.nome);
        $('#txtMatFunc').prop('disabled', true);
        $('#txtNomeFunc').prop('disabled', true);
        if(funcionario.funcionario.perfil)
        {
            $('#perfilFuncExc').prop('checked', true);
        }
        $('#perfilFuncExc').prop('disabled', true);
    }

    $scope.deletarFuncionario = function() {
        $http({
            method: 'DELETE',
            url: '/funcionarios',
            data: {
                id: $scope.funcionarioSelecionado.id
            },
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        })
        .then(function(response) {
            alert(response.data.mensagem);
            location.reload();
        }, function(rejection) {
            alert('Erro! Tente novamente mais tarde.');
        });
    }
        
    $scope.ordenar = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
});
