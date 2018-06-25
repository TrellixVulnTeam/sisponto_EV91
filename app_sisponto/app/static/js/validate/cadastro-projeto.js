angular.module('sisponto',[]).controller('sisponto-controller-cadastroProjeto', function ($scope, $http, $window) {

    $scope.projeto = {};

    $window.onload = function() {
        $http.post('/admin/clientes').success(function (data, status) {
            if(status === 200){
                $scope.clientes = data.listaClientes;
                for(let i = 0; i < $scope.clientes.length; i++)
                {
                    if($scope.clientes[i].tipoPessoa == "F")
                    {
                        $scope.clientes[i].cpfCnpj = $scope.clientes[i].cpfCnpj.substring(3);
                    }
                }
            } else {
                alert('Erro! Tente novamente mais tarde.');
            }
        });
    }
    
    $scope.confirmarCadastroProjeto = function()
    {
        let clienteSelecionado;
        let table = document.getElementById('tableClientes');
        let cont = 0;
        for(let i = 0; i < table.rows.length; i++)
        {
            if(cont > 1)
            {
                alert('Selecione apenas um cliente');
                return false;
            }
            if(table.rows[i].cells[0].childNodes[0].checked)
            {
                cont++;
            }
        }
        if(!cont)
        {
            alert('Selecione pelo menos um cliente');
            return false;
        }

        for(let i = 0; i < table.rows.length; i++)
        {
            if(table.rows[i].cells[0].childNodes[0].checked)
            {
                clienteSelecionado = table.rows[i].cells[1].childNodes[0].nodeValue + ' - ' + table.rows[i].cells[2].childNodes[0].nodeValue + ' - ' + table.rows[i].cells[4].childNodes[0].nodeValue;
                break;
            }
        }

        descricaoProjeto = $('#descricao').val();

        $.confirm({
            title: 'Deseja adicionar esse projeto?',
            content: `<strong>Descrição: </strong> ${descricaoProjeto}<br /><br /><strong>Cliente: </strong> ${clienteSelecionado}`,
            useBootstrap: false,
            buttons: {
                confirmar: function () {
                    $scope.projeto.descricao = descricaoProjeto;
                    $scope.projeto.cliente = clienteSelecionado[0];

                    $http.post('/admin/cadastro-projeto', $scope.projeto).success(function (data, status) {
                        if(status === 200 && data.result){
                            alert(data.mensagem);
                            location.reload();
                        } else {
                            alert(data.mensagem);
                        }
                    });
                },
                cancelar: function () {
                    $.alert('Cancelado!');
                }
            },
        });
    }
});
