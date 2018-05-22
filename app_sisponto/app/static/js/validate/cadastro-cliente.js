angular.module('sisponto',[]).controller('sisponto-controller-cadastroCliente', function ($scope, $http, $window) {

    $scope.cliente = {};

    $(document).ready(function () { 
        $('#divCpfCnpj').hide();
    });

    $scope.alterarMascara = function ()
    {
        if($('input[name=opttp]:checked', '#formCadCliente').val() == "F")
        {
            $('#cpfCnpj').mask('000.000.000-00', {reverse: true});
            $('#divCpfCnpj').show();
        }
        else
        {
            $('#cpfCnpj').mask('00.000.000/0000-00', {reverse: true});
            $('#divCpfCnpj').show();
        }
    }

    $scope.cadastrarCliente = function()
    {
        if(!validarRadioPfPj())
        {
            alert('Campo TIPO PESSOA é obrigatório');
            return false;
        }

        if($('input[name=opttp]:checked', '#formCadCliente').val() == "F")
        {
            if(!validarCpf($('#cpfCnpj').val().replace(/\D/g, "").padStart(11, '0')))
            {
                alert('CPF Inválido');
                $('#cpfCnpj').focus();
                return false;
            }
            $scope.cliente.tipoPessoa = "F";
            $scope.cliente.cpfCnpj = $('#cpfCnpj').val().replace(/\D/g, "").padStart(14, '0');
        }
        else
        {
            if(!validarCnpj($('#cpfCnpj').val().replace(/\D/g, "").padStart(14, '0')))
            {
                alert('CNPJ inválido');
                $('#cpfCnpj').focus();
                return false;
            }
            $scope.cliente.tipoPessoa = "J";
            $scope.cliente.cpfCnpj = $('#cpfCnpj').val().replace(/\D/g, "").padStart(14, '0');
        }

        if(!campoNomeVazio())
        {
            alert('Campo NOME é obrigatório');
            $('#nome').focus();
            return false;
        }
        if(!campoEmailVazio())
        {
            alert('Campo EMAIL é obrigatório');
            $('#email').focus();
            return false;
        }
        $scope.cliente.email = $('#email').val().trim();
        if(!campoCpfCnpjVazio())
        {
            alert('Campo CPF/CNPJ é obrigatório');
            $('#cpfCnpj').focus();
            return false;
        }
        if(!nomeClienteMinimoDoisNomes())
        {
            alert('Nome do cliente precisa ter no minímo duas palavras');
            $('#nome').focus();
            return false;
        }
        $scope.cliente.nome = $('#nome').val().trim();

        $http.post('/cadastro-cliente', $scope.cliente).success(function (data, status) {
            if(status === 200 && data.result){
                alert(data.mensagem);
                location.reload();
            } else {
                alert(data.mensagem);
            }
        });
    }

    function campoNomeVazio()
    {
        if($('#nome').val())
        {
            return true;
        }
        return false;
    }

    function validarRadioPfPj()
    {
        if($('input[name=opttp]:checked', '#formCadCliente').val())
        {
            return true;
        }
        return false;
    }

    function campoCpfCnpjVazio()
    {
        if($('#cpfCnpj').val())
        {
            return true;
        }
        return false;
    }

    function campoEmailVazio()
    {
        if($('#email').val())
        {
            return true;
        }
        return false;
    }

    function nomeClienteMinimoDoisNomes()
    {
        if($('#nome').val().trim().includes(' '))
        {
            return true;
        }
        return false;
    }

    function validarCpf(cpf)
    {
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.length < 11)
            return false;
        for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1))
            {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais)
        {
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
            numeros = cpf.substring(0,10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
            return true;
        }
        else
            return false;
    }

    function validarCnpj(cnpj) {
 
        cnpj = cnpj.replace(/[^\d]+/g,'');
 
        if(cnpj == '') return false;
     
        if (cnpj.length != 14)
            return false;
 
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
         
        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
         
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;         
        return true;
}
    
});
