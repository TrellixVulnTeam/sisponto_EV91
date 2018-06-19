angular.module('sisponto',[]).controller('sisponto-controller-relatorios', function ($scope, $http, $window) {

    $window.onload = function() {
        let table = document.getElementById('tblRelatorio');
        let cont = 0;
        for(let i = 1; i < table.rows.length; i++)
        {
            let horas = table.rows[i].cells[3].innerText
            if(horas.length == 3)
            {
                table.rows[i].cells[3].innerHTML = 0 + horas[0] + ':' + horas[1] + horas[2] + 'h';
            }
            else
            {
                table.rows[i].cells[3].innerHTML = horas[0] + horas[1] + ':' + horas[2] + horas[3] + 'h';
            }
        }
    }

});
