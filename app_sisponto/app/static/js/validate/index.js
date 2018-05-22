angular.module('sisponto',['angularUtils.directives.dirPagination']).controller('sisponto-controller-index', function ($scope, $http, $window) {
        
    $scope.ordenar = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
});
