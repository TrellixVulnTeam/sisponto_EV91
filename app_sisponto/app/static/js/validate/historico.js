angular.module('sisponto',[]).controller('sisponto-controller-historico', function ($scope, $http, $window) {

    $scope.registroSelecionado = {};

    $window.onload = function() {
        
    }

    $scope.confirmarExclusao = function(registro) {
        $scope.registroSelecionado.id = registro;

        $.confirm({
            title: 'Confirmação',
            content: 'Deseja excluir esse lançamento?',
            useBootstrap: false,
            buttons: {
                confirmar: function () {
                    $http({
                        method: 'DELETE',
                        url: '/historico',
                        data: {
                            id: $scope.registroSelecionado.id
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
                },
                cancelar: function () {
                    $.alert('Cancelado!');
                }
            },
        });
    }

});
