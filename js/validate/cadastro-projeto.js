angular.module('sisponto',[]).controller('sisponto-controller-cadastroProjeto', function ($scope, $http, $window) {

    $scope.listaClientes = [
        {
            'id': 1,
            'codigo': '04506725069',
            'nome': 'William Spader'
        },
        {
            'id': 2,
            'codigo': '00000000000191',
            'nome': 'National Security Agency - United States of America'
        },
        {
            'id': 3,
            'codigo': '00000000000192',
            'nome': 'Central Intelligence Agency - United States of America'
        }]
    
    $scope.confirmarCadastroProjeto = function()
    {
        let clienteSelecionado;
        let table = document.getElementById('tableClientes');
        for(let i = 0; i < table.rows.length; i++)
        {
            if(table.rows[i].cells[0].childNodes[0].checked)
            {
                clienteSelecionado = table.rows[i].cells[1].childNodes[0].nodeValue + ' - ' + table.rows[i].cells[2].childNodes[0].nodeValue;
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
                    $.alert('Confirmado!');
                },
                cancelar: function () {
                    $.alert('Cancelado!');
                }
            },
        });
    }
});
