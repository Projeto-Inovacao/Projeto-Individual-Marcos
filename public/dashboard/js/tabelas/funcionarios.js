idEmpresa = sessionStorage.ID_EMPRESA;

function atualizarFeed() {
    fetch(`/empresas/listarFuncionario/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_funcionarios");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("tabela_funcionarios");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var funcionario = resposta[i];

                    // Cria uma nova linha na tabela
                    var novaLinha = feed.insertRow();

                    // Cria células para cada coluna
                    var ID = novaLinha.insertCell(0);
                    var nome = novaLinha.insertCell(1);
                    var setor = novaLinha.insertCell(2);
                    var email = novaLinha.insertCell(3);
                    var celular = novaLinha.insertCell(4);
                    var status = novaLinha.insertCell(5);


                    ID.innerHTML = funcionario.id;
                    nome.innerHTML = funcionario.nome;
                    setor.innerHTML = funcionario.setor;
                    email.innerHTML = funcionario.email;
                    celular.innerHTML = funcionario.celular;
                    if(funcionario.status_colaborador == 1){
                        status.innerHTML = "Ativo"
                    }else if (funcionario.status_colaborador == 0){
                        status.innerHTML = "Inativo"
                    }

                }

               // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
       // finalizarAguardar();
    });
}