angular.module('sisponto',['angularUtils.directives.dirPagination']).controller('sisponto-controller-index', function ($scope, $http, $window) {
    
    $scope.listaProjetosFunc = [];

    $window.onload = function() {
        $http.post('/listaProjFuncIndex').success(function (data, status) {
            if(status === 200){
                $scope.listaProjetosFunc = data.listaProjFunc;
                for(let i = 0; i < $scope.listaProjetosFunc.length; i++)
                {
                    $scope.listaProjetosFunc[i].descricaoSubstr = $scope.listaProjetosFunc[i].descricao;
                    if($scope.listaProjetosFunc[i].descricaoSubstr.length > 50)
                    {
                        $scope.listaProjetosFunc[i].descricaoSubstr = $scope.listaProjetosFunc[i].descricaoSubstr.substring(0, 50);
                        $scope.listaProjetosFunc[i].descricaoSubstr += '...'
                    }
                    if($scope.listaProjetosFunc[i].perfil)
                    {
                        $scope.listaProjetosFunc[i].showPerfil = 'Administrador';
                    }
                    else
                    {
                       $scope.listaProjetosFunc[i].showPerfil = 'Colaborador'; 
                    }
                }
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

    $scope.visualizarProjeto = function(projeto)
    {
        $('#descricao').val(projeto.item.descricao).prop('disabled', true);
    }

    $scope.ordenar = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
});
