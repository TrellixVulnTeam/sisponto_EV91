angular.module('sisponto',['angularUtils.directives.dirPagination']).controller('sisponto-controller-index', function ($scope, $http, $window) {
    
    $scope.listaProjetosFunc = [];

    $window.onload = function() {
        $http.post('/listaProjFuncIndex').success(function (data, status) {
            if(status === 200){
                $scope.listaProjetosFunc = data.listaProjFunc;
                alert($scope.listaProjetosFunc);
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }

    $scope.ordenar = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
});
