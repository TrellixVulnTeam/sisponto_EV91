angular.module('sisponto',['angularUtils.directives.dirPagination']).controller('sisponto-controller-listaFuncionarios', function ($scope, $http, $window) {

    $scope.lista = [
        {
            'id': 1,
            'nome': 'William Spader',
            'email': 'spaderwilliam@hotmail.com',
            'jornada': 'x'
        },
        {
            'id': 2,
            'nome': 'Spader William',
            'email': 'william.cabral@ulbra.inf.br',
            'jornada': 'y'
        }]
        
    $scope.ordenar = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
});
