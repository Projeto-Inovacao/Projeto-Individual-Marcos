// window.onload = obterDadosJanela(idMaquina);

function obterDadosJanela(idMaquina) {
    console.log("Desempenho")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }

    fetch(`/medidas/ultimasJanelas/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos de janelas: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarListaJanela(resposta, idMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarListaJanela(resposta, idMaquina) {
    var lista_janela = document.getElementById('lista_janela');
    var quantidade_janelas_visiveis = 0
    var quantidade_janelas = resposta.length
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        if (registro.status_abertura === 1) {
            var titulo_janela = document.createElement('h1');
            titulo_janela.className = 'small font-weight-bold';
            titulo_janela.textContent = registro.nome_janela;
            lista_janela.appendChild(titulo_janela);
            quantidade_janelas_visiveis++
        }
        janelas_kpi.innerHTML = quantidade_janelas_visiveis
        setTimeout(() => atualizarListaJanela(idMaquina, quantidade_janelas), 2000);
    }
}

function atualizarListaJanela(idMaquina, quantidade_janelas) {
      fetch(`/medidas/tempo-realJanelas/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

                    var lista_janela = document.getElementById('lista_janela');
                    var quantidade_janelas_visiveis = 0
                    lista_janela.innerHTML = ""

                    for (i = 0; i < novoRegistro.length; i++) {
                         var registro = novoRegistro[i];
                        if (registro.status_abertura === 1) {
                            var titulo_janela = document.createElement('h1');
                            titulo_janela.className = 'small font-weight-bold';
                            titulo_janela.textContent = registro.nome_janela;
                            lista_janela.appendChild(titulo_janela);
                            quantidade_janelas_visiveis++;
                        }
                        janelas_kpi.innerHTML = quantidade_janelas_visiveis
                    }
                
                proximaAtualizacaoDesempenho = setTimeout(() => atualizarListaJanela(idMaquina, quantidade_janelas), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoDesempenho = setTimeout(() => atualizarListaJanela(idMaquina, quantidade_janelas), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function limparJanela(){
    janelas_kpi.innerHTML = ""
    lista_janela.innerHTML = ""
}