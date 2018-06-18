angular.module('sisponto',[]).controller('sisponto-controller-lancamentos', function ($scope, $http, $window) {

    $scope.registro = {};

    $scope.gravarTarefa = function() {
        $scope.registro.idAtividade = $('#slctAtividades').val()
        $scope.registro.idProjeto = $('#slctProjs').val()
        $scope.registro.dataInicio = $('#txtDataInicio').val()
        $scope.registro.horaInicio = $('#txtHoraInicio').val()
        $scope.registro.dataFim = $('#txtDataFim').val()
        $scope.registro.horaFim = $('#txtHoraFim').val()
        $scope.registro.descricao = $('#descricao').val()

        $http.post('/lancamentos', $scope.registro).success(function (data, status) {
            if(status === 200 && data.result){
                alert(data.mensagem);
                location.reload();
            } else {
                alert(data.mensagem);
            }
        });
    }

});
