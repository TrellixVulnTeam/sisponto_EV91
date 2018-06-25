angular.module('sisponto',[]).controller('sisponto-controller-lancamentos', function ($scope, $http, $window) {

    $scope.registro = {};
    var flag = false;
    var d1;
    var d2;

    $window.onload = function() {
        document.getElementById('tmpTrab').style.display = 'none';
        document.getElementById('tmpTrab').disabled = true;
    }

    $scope.controlarTarefa = function(identificaBotaoBool) {
        if(flag && identificaBotaoBool) {
            alert('Erro! Existe uma tarefa em andamento, finalize se for o caso.');
            return false;
        }
        if(!flag && !identificaBotaoBool) {
            alert('Erro! Não existe uma tarefa em andamento.');
            return false;
        }
        if(identificaBotaoBool) {
            alert('Tarefa iniciada');
            d1 = new Date(); //"now"
            flag = true;
        }
        else {
            alert('Tarefa finalizada');
            d2 = new Date(); //"now"
            flag = false;
            let diff = d2 - d1;
            var msec = diff;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            document.getElementById('tmpTrab').value = 'Tempo trabalhado: ' + hh + ':' + mm + 'h';
            document.getElementById('tmpTrab').style.display = '';
        }
        let d = new Date();
        let ano = d.getFullYear();
        let mes = d.getMonth() + 1;
        let dia = d.getDate();

        if(mes < 10) {
            mes = '0' + mes;
        }

        let hora = d.getHours();
        if(hora < 10) {
            hora = '0' + hora;
        }

        let min = d.getMinutes();
        if(min < 10) {
            min = '0' + min;
        }

        if(identificaBotaoBool)
        {
            $scope.registro.dataInicio = ano + '-' + mes + '-' + dia;
            $scope.registro.horaInicio = hora + ':' + min;
        }
        else
        {
            $scope.registro.dataFim = ano + '-' + mes + '-' + dia;
            $scope.registro.horaFim = hora + ':' + min;
        }
    }

    $scope.gravarTarefa = function() {
        $scope.registro.idAtividade = $('#slctAtividades').val()
        $scope.registro.idProjeto = $('#slctProjs').val()
        if($scope.registro.dataInicio == undefined && $scope.registro.horaInicio == undefined && $scope.registro.dataFim == undefined && $scope.registro.horaFim == undefined) {
            $scope.registro.dataInicio = $('#txtDataInicio').val()
            $scope.registro.horaInicio = $('#txtHoraInicio').val()
            $scope.registro.dataFim = $('#txtDataFim').val()
            $scope.registro.horaFim = $('#txtHoraFim').val()
        }
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
