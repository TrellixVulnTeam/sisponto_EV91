angular.module('sisponto',[]).controller('sisponto-controller-atividades', function ($scope, $http, $window) {

    $scope.atividade = {};

    $scope.cadastrarAtividade = function() {

        $scope.atividade.descricao = $('#txtAtividade').val()

        $http.post('/atividades', $scope.atividade).success(function (data, status) {
            if(status === 200){
                alert(data.mensagem);
                location.reload();
            } else {
                alert('Erro, tente novamente mais tarde.');
            }
        });
    }

});
