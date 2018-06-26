angular.module('sisponto',[]).controller('sisponto-controller-atividades', function ($scope, $http, $window) {

    $scope.atividade = {};
    $scope.listaAtividades = [];
    $scope.atividadeSelecionada = {};

    $window.onload = function() {
        $http.post('/admin/atividades').success(function (data, status) {
            if(status === 200){
                $scope.listaAtividades = data.listaAtividades;
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

    $scope.cadastrarAtividade = function() {

        $scope.atividade.descricao = $('#txtAtividade').val()

        $http.put('/admin/atividades', $scope.atividade).success(function (data, status) {
            if(status === 200){
                alert(data.mensagem);
                location.reload();
            } else {
                alert('Erro, tente novamente mais tarde.');
            }
        });
    }

    $scope.delAtividade = function(atividade) {
        $scope.atividadeSelecionada.id = atividade.atividade.id;

        $('#txtDesc').prop('disabled', true);
        $('#txtDesc').val(atividade.atividade.descricao);
    }

    $scope.deletarAtividade = function() {
        $http({
            method: 'DELETE',
            url: '/admin/atividades',
            data: {
                id: $scope.atividadeSelecionada.id
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

});
