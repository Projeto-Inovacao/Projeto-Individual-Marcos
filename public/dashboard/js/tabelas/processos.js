idEmpresa = sessionStorage.ID_EMPRESA
let pagina_atual = 1;
const resultados_por_pagina = 10;

var totalDados = 0
function atualizarFeed(idMaquina) {
    fetch(`/processos/listar/${idEmpresa}/${idMaquina}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("body_processo");
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

                var feed = document.getElementById("body_processo");
                feed.innerHTML = "";
                for (let i = 0; i < dados_tabela.length; i++) {
                    var processo = dados_tabela[i];

                    var novaLinha = feed.insertRow();

                    var PID = novaLinha.insertCell(0);
                    var UsoCPU = novaLinha.insertCell(1);
                    var UsoMemoria = novaLinha.insertCell(2);
                    var UsoMemoriaSwap = novaLinha.insertCell(3);

                    PID.innerHTML = processo.pid;
                    UsoCPU.innerHTML = processo.uso_cpu;
                    UsoMemoria.innerHTML = processo.uso_memoria;
                    UsoMemoriaSwap.innerHTML = processo.memoria_virtual;
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
