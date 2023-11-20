function cadastrarEmpresa() {
    return new Promise((resolve, reject) => {
        console.log("Entrei na funcao")

        var razaoSocial = input_razao_social.value;
        var cnpj = input_cnpj.value;

        fetch("/usuarios/cadastrarEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                razaoSocialServer: razaoSocial,
                cnpjServer: cnpj

            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("cadastrei empresa")
                resolve();
            } else {
                console.log("#ERRO: Houve um erro ao tentar realizar o cadastro!");
                reject(new Error("Houve um erro ao tentar realizar o cadastro!")); // Rejeite a Promise em caso de erro
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });

        return false;
    });
}

function cadastrarColaborador() {
    return new Promise((resolve, reject) => {
        console.log("Entrei na funcao")

        var cnpj = input_cnpj.value;
        var nomeRepresentante = input_nome_rep.value;
        var emailRepresentante = input_email_rep.value;
        var celularRepresentante = input_cel_rep.value;
        var cpfRepresentante = input_cpf_rep.value;
        var senhaRepresentante = input_senha_rep.value;
        var confirmaSenha = input_confirma_senha.value;

        fetch("/usuarios/cadastrarColaborador", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                nomeRepresentanteServer: nomeRepresentante,
                emailRepresentanteServer: emailRepresentante,
                celularRepresentanteServer: celularRepresentante,
                //   oi
                cpfRepresentanteServer: cpfRepresentante,
                senhaRepresentanteServer: senhaRepresentante,
                cnpjServer: cnpj

            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("cadastrei empresa")
                resolve();
            } else {
                console.log("#ERRO: Houve um erro ao tentar realizar o cadastro!");
                reject(new Error("Houve um erro ao tentar realizar o cadastro!")); // Rejeite a Promise em caso de erro
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });

        return false;

    });

}


function cadastrarEndereco() {
    return new Promise((resolve, reject) => {
        console.log("Entrei na funcao endereco")

        var cnpj = input_cnpj.value;
        var cep = input_cep.value;
        var pais = input_pais.value;
        var estado = input_estado.value;
        var cidade = input_cidade.value;
        var bairro = input_bairro.value;
        var rua = input_rua.value;
        var numero = input_numero.value;
        var complemento = input_complemento.value;

        fetch("/usuarios/cadastrarEndereco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cnpjServer: cnpj,
                cepServer: cep,
                paisServer: pais,
                estadoServer: estado,
                cidadeServer: cidade,
                bairroServer: bairro,
                ruaServer: rua,
                numeroServer: numero,
                complementoServer: complemento

            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("cadastrou com sucesso")
                resolve();
            } else {
                console.log("#ERRO: Houve um erro ao tentar realizar o cadastro!");
                reject(new Error("Houve um erro ao tentar realizar o cadastro!")); // Rejeite a Promise em caso de erro
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);

        });

        return false;
    });
}
