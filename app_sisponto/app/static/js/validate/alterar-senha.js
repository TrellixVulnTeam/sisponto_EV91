angular.module('sisponto',[]).controller('sisponto-controller-alterarSenha', function ($scope, $http, $window) {

    $scope.user = {};

    $scope.alterarSenha = function() {
        if($('#novaSenha').val() === '' || $('#senhaAtual').val() === '' || $('#novaSenhaConfirm').val() === ''){
            alert('Todos os campos são obrigatórios');
            return false;
        }

        if($('#novaSenha').val() === $('#novaSenhaConfirm').val()) {
            $scope.user.password = $('#novaSenha').val()
            $scope.user.old = $('#senhaAtual').val()

            $http.put('/alterarsenha', $scope.user).success(function (data, status) {
                if(status === 200 && data.result){
                    alert(data.mensagem);
                    location.reload();
                } else {
                    alert(data.mensagem);
                }
            });
        } else {
            alert('Nova senha e confirmação não são iguais');
        }
    }
    
});
