angular.module('sisponto',['angularUtils.directives.dirPagination', 'ui.bootstrap']).controller('sisponto-controller-listaProjetos', function ($scope, $http, $window) {

    $scope.projetos = [];
    $scope.projetoSelecionado = {};

    $window.onload = function() {
        $http.post('/admin/projetos').success(function (data, status) {
            if(status === 200){
                $scope.projetos = data.listaProjetos;
                for(let i = 0; i < $scope.projetos.length; i++)
                {
                    $scope.projetos[i].descricaoSubstr = $scope.projetos[i].descricao;
                    if($scope.projetos[i].descricaoSubstr.length > 50)
                    {
                        $scope.projetos[i].descricaoSubstr = $scope.projetos[i].descricaoSubstr.substring(0, 50);
                        $scope.projetos[i].descricaoSubstr += '...'
                    }
                }
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

    $scope.visuProjeto = function(projeto) {
        $('#txtDescVisuProj').val(projeto.projeto.descricao).prop('disabled', true);
    }

    $scope.editProjeto = function(projeto) {
        $scope.projetoSelecionado = projeto.projeto;

        $('#txtEditDescProj').val(projeto.projeto.descricao);
        $('#txtCodProj').val(projeto.projeto.id).prop('disabled', true);
    }

    $scope.atualizarProjeto = function() {
        $scope.projetoSelecionado.id = $('#txtCodProj').val();
        $scope.projetoSelecionado.descricao = $('#txtEditDescProj').val();

        $http.put('/admin/projetos', $scope.projetoSelecionado).success(function (data, status) {
            if(status === 200 && data.result){
                alert(data.mensagem);
                location.reload();
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

    $scope.delProjeto = function(projeto) {
        $scope.projetoSelecionado = projeto.projeto;

        $('#txtDescProjExc').val(projeto.projeto.descricao).prop('disabled', true);
        $('#txtCodProjExc').val(projeto.projeto.id).prop('disabled', true);
    }

    $scope.deletarProjeto = function() {
        $http({
            method: 'DELETE',
            url: '/admin/projetos',
            data: {
                id: $scope.projetoSelecionado.id
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
