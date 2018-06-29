angular.module('sisponto',[]).controller('sisponto-controller-funcionarioprojeto', function ($scope, $http, $window) {

    $scope.projetos = [];
    $scope.funcionarios = [];
    $scope.relUsuProj = {};
    $scope.relacoes = [];
    $scope.relacaoSelecionada = {};

    $window.onload = function() {
        $http.post('/admin/projetos').success(function (data, status) {
            if(status === 200){
                $scope.projetos = data.listaProjetos;
            } else {
                alert('Erro ao listar projetos, tente novamente mais tarde.');
            }
        });

        $http.post('/admin/funcionarios').success(function (data, status) {
            if(status === 200){
                $scope.funcionarios = data.listaFuncionarios;
            } else {
                alert('Erro ao listar funcionários, tente novamente mais tarde.');
            }
        });

        $http.post('/funcionario-projeto').success(function (data, status) {
            if(status === 200){
                $scope.relacoes = data.listaRelacoes;
                for(let i = 0; i < $scope.relacoes.length; i++)
                {
                    $scope.relacoes[i].descricaoSubstr = $scope.relacoes[i].descProj;
                    if($scope.relacoes[i].descricaoSubstr.length > 50)
                    {
                        $scope.relacoes[i].descricaoSubstr = $scope.relacoes[i].descricaoSubstr.substring(0, 50);
                        $scope.relacoes[i].descricaoSubstr += '...'
                    }
                }
            } else {
                alert('Erro ao listar funcionários em projetos.');
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
        $http.put('/funcionario-projeto', $scope.relUsuProj).success(function (data, status) {
            if(status === 200 && data.result){
                alert(data.mensagem);
                location.reload();
            } else {
                alert(data.mensagem);
            }
        });
    }

    $scope.delRelacao = function(relacao) {
        $scope.relacaoSelecionada.idUsu = relacao.relacao.codigoUsu;
        $scope.relacaoSelecionada.idProj = relacao.relacao.codigoProj;

        $('#txtDesc').prop('disabled', true);
        $('#txtFunc').prop('disabled', true);
        $('#txtDesc').val(relacao.relacao.descProj);
        $('#txtFunc').val(relacao.relacao.nomeFunc);
    }

    $scope.deletarRelacao = function() {
        $http({
            method: 'DELETE',
            url: '/funcionario-projeto',
            data: {
                idUsu: $scope.relacaoSelecionada.idUsu,
                idProj: $scope.relacaoSelecionada.idProj
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
