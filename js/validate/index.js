angular.module('sisponto',[]).controller('sisponto-controller-index', function ($scope, $http, $window) {

    $scope.lista = [
        {
            'id': 1,
            'descricao': 'teste ',
            'perfil': 'coordenador',
            'cliente': 'will'
        },
        {
            'id': 2,
            'descricao': 'testando novamente',
            'perfil': 'colaborador',
            'cliente': 'spader'
        }]

});
