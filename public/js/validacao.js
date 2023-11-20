 // Mascaras das Inputs
 function formatar(mascara, documento) {
    var i = documento.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i)

    if (texto.substring(0, 1) != saida) {
        documento.value += texto.substring(0, 1);
    }

}

// Funcoes de validação

function isAllValid() {
    const page1 = document.getElementById('page1'); // Seleciona a primeira parte do formulário
    const inputs = page1.querySelectorAll('input'); // Seleciona apenas as entradas da primeira parte do formulário
    const razaoSocialValue = razaoSocial.value.trim()
    const cnpjValue = cnpj.value.trim()
    const nomeValue = nome.value.trim()
    const emailValue = email.value.trim()
    const telefoneValue = telefone.value.trim()
    const cpfValue = cpf.value.trim()
    const senhaValue = senha.value.trim()
    const confirmarSenhaValue = confirmarSenha.value.trim()

    let isValid = true;

    if (razaoSocialValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(razaoSocial, 'Preencha esse campo')
        isValid = false;
    } else {
        // adicionar a classe de sucesso
        setSuccessFor(razaoSocial)
    }

    if (cnpjValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(cnpj, 'Preencha esse campo')
        isValid = false;
    } else if(!validarCNPJ(cnpjValue)){

        setErrorFor(cnpj, 'CNPJ inválido')
        isValid = false;
    } else {
        // adicionar a classe de sucesso
        setSuccessFor(cnpj)
    }

    if (nomeValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(nome, 'Preencha esse campo')
        isValid = false;
    } else {
        // adicionar a classe de sucesso
        setSuccessFor(nome)
    }

    if (emailValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(email, 'Preencha esse campo')
        isValid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email inválido')
        isValid = false;
    } else {
        // adicionar a classe de sucesso
        setSuccessFor(email)
    }

    if (telefoneValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(telefone, 'Preencha esse campo')
        isValid = false;
    } else if(!validarTelefone(telefoneValue)){

        setErrorFor(telefone, 'Telefone inválido')
        isValid = false;
    }else {
        // adicionar a classe de sucesso
        setSuccessFor(telefone)
    }

    if (cpfValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(cpf, 'Preencha esse campo')
        isValid = false;
    } else if(!validarCPF(cpfValue)){

        setErrorFor(cpf, 'Cpf inválido')
        isValid = false;

    } else {
        // adicionar a classe de sucesso
        setSuccessFor(cpf)
    }

    if (senhaValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(senha, 'Preencha esse campo')
        isValid = false;

    } else if (senhaValue.length < 8) {
        setErrorFor(senha, 'Senha deve ter mais que 8 caracteres')
        isValid = false;
    } else {
        // adicionar a classe de sucesso
        setSuccessFor(senha)
    }

    if (confirmarSenhaValue === '') {
        // mostrar erro
        // add classe
        setErrorFor(confirmarSenha, 'Preencha esse campo')
        isValid = false;

    } else if (senhaValue !== confirmarSenhaValue) {
        setErrorFor(confirmarSenha, 'Senhas não estão iguais')
        isValid = false;
    } else {
        // adicionar a classe de sucesso
        setSuccessFor(confirmarSenha)
    }

    return isValid;
}

function isAllValid2() {

    const page2 = document.getElementById('page2'); // Seleciona a segunda parte do formulário
    const inputs = page1.querySelectorAll('input'); // Seleciona apenas as entradas da primeira parte do formulário
    const cepValue = cep.value.trim()
    const numeroValue = numero.value.trim()
    let isValid = true;

    if (cepValue === '') {
        setErrorFor(cep, 'Preencha esse campo')
        isValid = false;
    } else if (!validarCEP(cepValue)) {
        setErrorFor(cep, 'Cep invalido')
        isValid = false;
    } else {
        setSuccessFor(cep)
    }

    if (numeroValue === '') {
        setErrorFor(numero, 'Preencha esse campo')
        isValid = false;
    } else {
        setSuccessFor(numero)
    }

    return isValid;

}



function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')

    small.innerText = message

    formControl.className = 'input error'
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.className = 'input success'
}

function validarCNPJ(cnpj) {
cnpj = cnpj.replace(/[^\d]+/g, '');
if (cnpj === '') return false;
if (cnpj.length !== 14) return false;

// Elimina CNPJs invalidos conhecidos
if (cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999')
    return false;

// Valida DVs
let tamanho = cnpj.length - 2;
let numeros = cnpj.substring(0, tamanho);
const digitos = cnpj.substring(tamanho);
let soma = 0;
let pos = tamanho - 7;
for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
}
let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
if (resultado != digitos.charAt(0)) return false;

tamanho = tamanho + 1;
numeros = cnpj.substring(0, tamanho);
soma = 0;
pos = tamanho - 7;
for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
}
resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
if (resultado != digitos.charAt(1)) return false;

return true;
}


function isEmail(email) {
    return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
}

function validarTelefone(telefone) {
// Remove todos os caracteres não numéricos
const telefoneNumerico = telefone.replace(/\D/g, '');

// Verifica se o número de telefone tem a quantidade correta de dígitos
if (telefoneNumerico.length !== 11 && telefoneNumerico.length !== 10) {
    return false;
}

// Se o número tiver 11 dígitos, deve começar com 9
if (telefoneNumerico.length === 11 && telefoneNumerico.charAt(2) !== '9') {
    return false;
}

// Se o número tiver 10 dígitos, não pode começar com 0
if (telefoneNumerico.length === 10 && telefoneNumerico.charAt(2) === '0') {
    return false;
}

// Se todas as verificações passarem, o número é considerado válido
return true;
}


function validarCPF(cpf) {
cpf = cpf.replace(/[^\d]+/g, '');
if (cpf === '') return false;
// Elimina CPFs invalidos conhecidos
if (cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999')
    return false;
// Valida 1o digito
let add = 0;
for (let i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
let rev = 11 - (add % 11);
if (rev === 10 || rev === 11)
    rev = 0;
if (rev !== parseInt(cpf.charAt(9)))
    return false;
// Valida 2o digito
add = 0;
for (let i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
rev = 11 - (add % 11);
if (rev === 10 || rev === 11)
    rev = 0;
if (rev !== parseInt(cpf.charAt(10)))
    return false;
return true;
}

function validarCEP(cep) {
// Remove todos os caracteres não numéricos
const cepNumerico = cep.replace(/\D/g, '');

// Verifica se o CEP tem a quantidade correta de dígitos
if (cepNumerico.length !== 8) {
    return false;
}

// Se todas as verificações passarem, o CEP é considerado válido
return true;
}

