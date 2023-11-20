idEmpresa = sessionStorage.ID_EMPRESA
let pagina_atual = 1;
const resultados_por_pagina = 10;
var totalDados = 0

function atualizarFeed(idMaquina) {
    fetch(`/processos/listarJanelas/${idEmpresa}/${idMaquina}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("tabela_janela");
                var mensagem = document.createElement("div");
                mensagem.innerHTML = "Nenhum resultado encontrado.";
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (dados) {
                console.log("Dados recebidos: ", JSON.stringify(dados));
                totalDados = dados.length
                const inicio = (pagina_atual - 1) * resultados_por_pagina;
                const fim = inicio + resultados_por_pagina;
                const dados_tabela = dados.slice(inicio, fim);

                var feed = document.getElementById("tabela_janela");
                feed.innerHTML = "";
                for (let i = 0; i < dados_tabela.length; i++) {
                    var janela = dados_tabela[i];

                    var novaLinha = feed.insertRow();

                    var nome = novaLinha.insertCell(0);
                    var valor = novaLinha.insertCell(1);
                    var status = novaLinha.insertCell(2);
                    var ultimo_registro = novaLinha.insertCell(3);

                    nome.innerHTML = janela.nome_janela;
                    valor.innerHTML = "yeppi"
                    if(janela.status_abertura == 1){
                        status.innerHTML = "Aberta";
                    } else if (janela.status_abertura == 0){
                        status.innerHTML = "Fechada ";
                    } else{
                        status.innerHTML = "Não registrada";
                    }
                    ultimo_registro.innerHTML = janela.data_hora;
                }
                const pagina_atualElement = document.getElementById("pagina_atual");
                pagina_atualElement.textContent = `Página ${pagina_atual}`;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (error) {
        console.error(error);
    });
}

const PaginaAnteriorButton = document.getElementById("pag_anterior");
const ProximaPaginaButton = document.getElementById("prox_pagina");

PaginaAnteriorButton.addEventListener("click", function () {
    var elemento_maquina = document.getElementById("select_maquina");
    var idMaquina = elemento_maquina.value;
    if (pagina_atual > 1) {
        pagina_atual--;
        atualizarFeed(idMaquina);
    }
});

ProximaPaginaButton.addEventListener("click", function () {
    const totalPages = Math.ceil(totalDados / resultados_por_pagina);

    if (pagina_atual < totalPages) {
        var elemento_maquina = document.getElementById("select_maquina");
        var idMaquina = elemento_maquina.value;
        pagina_atual++;
        atualizarFeed(idMaquina);
    }
});
