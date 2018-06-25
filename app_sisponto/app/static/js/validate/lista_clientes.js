angular.module('sisponto',['angularUtils.directives.dirPagination', 'ui.bootstrap']).controller('sisponto-controller-listaClientes', function ($scope, $compile, $http, $window) {

    $scope.clientes = [];
    $scope.clienteSelecionado = {};

    $window.onload = function() {
        $http.post('/admin/clientes').success(function (data, status) {
            if(status === 200){
                $scope.clientes = data.listaClientes;
                for(let i = 0; i < $scope.clientes.length; i++)
                {
                    if($scope.clientes[i].tipoPessoa == "F")
                    {
                        $scope.clientes[i].cpfCnpj = $scope.clientes[i].cpfCnpj.substring(3);
                    }
                }
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

    $scope.editCliente = function(cliente) {
        $scope.clienteSelecionado = cliente.cliente;

        $('#txtEditNomeCli').val(cliente.cliente.nome);
        $('#txtEditEmailCli').val(cliente.cliente.email);
    }

    $scope.atualizarCliente = function() {
        $scope.clienteSelecionado.nome = $('#txtEditNomeCli').val();
        $scope.clienteSelecionado.email = $('#txtEditEmailCli').val();

        $http.put('/admin/clientes', $scope.clienteSelecionado).success(function (data, status) {
            if(status === 200 && data.result){
                alert(data.mensagem);
                location.reload();
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

    $scope.delCliente = function(cliente) {
        $scope.clienteSelecionado = cliente.cliente;

        $('#txtNomeCli').val(cliente.cliente.nome);
        $('#txtCpfCnpjCli').val(cliente.cliente.email);
        $('#txtNomeCli').prop('disabled', true);
        $('#txtCpfCnpjCli').prop('disabled', true);
    }
    $scope.deletarCliente = function() {
        $http({
            method: 'DELETE',
            url: '/admin/clientes',
            data: {
                id: $scope.clienteSelecionado.id
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
