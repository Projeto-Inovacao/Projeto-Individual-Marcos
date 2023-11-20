// VAR PARA KPI
var KPI_CPU = document.getElementById("uso_cpu_kpi");
var KPI_RAM = document.getElementById("ram_kpi");
var KPI_DISCO = document.getElementById("disco_kpi");
var KPI_TEMP = document.getElementById("temp_kpi");
var KPI_PING = document.getElementById("ping_kpi");
var KPI_LAT = document.getElementById("lat_kpi");
var KPI_BOOT = document.getElementById("kpi_boot");
var KPI_RESUMO = document.getElementById("kpi_resumo")
var METRICA_TEMP = document.getElementById("metrica_temp")
var METRICA_CPU = document.getElementById("metrica_cpu")
var METRICA_RAM = document.getElementById("metrica_ram")

// VAR PARA MUDAR O VALOR DO DESEMPENHO
var CPU = document.getElementById("porcentagem_cpu");
var RAM = document.getElementById("uso_memoria_ram");
var DISCO = document.getElementById("disco_rigido");
var TEMP = document.getElementById("temp_cpu");
var PING = document.getElementById("ping");
var LAT = document.getElementById("lat");

// VAR PARA MUDAR O TAMANHO DA BARRA DE PROGUESSO
var CPU_bar = document.getElementById("bar_porcentagem_cpu");
var RAM_bar = document.getElementById("bar_uso_memoria_ram");
var disco_bar = document.getElementById("bar_disco_rigido");
var temp_bar = document.getElementById("bar_temp");
var ping_bar = document.getElementById("ping_temp");
var lat_bar = document.getElementById("lat_temp");



// window.onload = obterDadosDesempenho(idMaquina);

function obterDadosDesempenho(idMaquina) {
    console.log("Desempenho")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }

    valores = [DISCO, RAM, CPU, PING, LAT]
    valores_kpi_desempenho = [KPI_DISCO, KPI_RAM, KPI_CPU, KPI_PING, KPI_LAT]
    valores_Bar = [disco_bar, RAM_bar, CPU_bar, ping_bar, lat_bar]

    fetch(`/medidas/ultimasDesempenho/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoDesempenho(resposta, idMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoDesempenho(resposta, idMaquina) {
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        if (registro.recurso === "DISCO") {
            valores[0].innerHTML = (registro.uso) + "%";
            valores_Bar[0].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[0].innerHTML = (registro.uso) + "%";
        }
        if (registro.recurso === "RAM") {
            valores[1].innerHTML = (registro.uso) + "%";
            valores_Bar[1].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[1].innerHTML = (registro.uso) + "%";
        }
        if (registro.recurso === "CPU") {
            valores[2].innerHTML = (registro.uso) + "%";
            valores_Bar[2].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[2].innerHTML = (registro.uso) + "%";
        }

    }

    // BOLINHA METRICA DENTRO DA KPI DISCO
    var discoKpi = parseFloat(document.getElementById('disco_kpi').innerText.trim());
    var metricaDisco = document.getElementById('metrica_disco');

    if (discoKpi < 50) {
        metricaDisco.style.color = '#00FF00';
    } else if (discoKpi >= 50 && discoKpi < 80) {
        metricaDisco.style.color = '#f6ff00';
    } else {
        metricaDisco.style.color = '#FF0000';
    }

    // BOLINHA METRICA DENTRO DA KPI RAM
    var ramKpi = parseFloat(document.getElementById('ram_kpi').innerText.trim());
    var metricaRam= document.getElementById('metrica_ram');

    if (ramKpi < 80) {
        metricaRam.style.color = '#00FF00';
    } else if (ramKpi >= 80 && ramKpi < 90) {
        metricaRam.style.color = '#f6ff00';
    } else {
        metricaRam.style.color = '#FF0000';
    }

    // BOLINHA METRICA DENTRO DA KPI CPU
    var cpuKpi = parseFloat(document.getElementById('uso_cpu_kpi').innerText.trim());
    var metricaCpu= document.getElementById('metrica_cpu');

    if (cpuKpi < 15) {
        metricaCpu.style.color = '#00FF00';
    } else if (cpuKpi >= 15 && cpuKpi < 30) {
        metricaCpu.style.color = '#f6ff00';
    } else {
        metricaCpu.style.color = '#FF0000';
    }

    // BOLINHA METRICA DENTRO DA KPI REDE

    //PING
    var ping_kpi = parseFloat(document.getElementById('ping_kpi').innerText.trim());
    var metrica_ping = document.getElementById('metrica_ping');

    if (ping_kpi < 200) {
        metrica_ping.style.color = 'green';
    } else if (ping_kpi >= 200 && ping_kpi < 450) {
        metrica_ping.style.color = 'yellow';
    } else {
        metrica_ping.style.color = 'red';
    }

    //LATENCIA
    var lat_kpi = parseFloat(document.getElementById('ping_kpi').innerText.trim());
    var metrica_lat = document.getElementById('metrica_ping');

    if (lat_kpi < 100) {
        metrica_lat.style.color = 'green';
    } else if (lat_kpi >= 100 && lat_kpi < 280) {
        metrica_lat.style.color = 'yellow';
    } else {
        metrica_lat.style.color = 'red';
    }




    setTimeout(() => atualizarGraficoDesempenho(idMaquina), 2000);
}

function atualizarGraficoDesempenho(idMaquina) {

    fetch(`/medidas/tempo-realDesempenho/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                valores_kpi_desempenho = [KPI_DISCO, KPI_RAM, KPI_CPU]
                valores_Bar = [disco_bar, RAM_bar, CPU_bar]

                for (i = 0; i < novoRegistro.length; i++) {
                    var dados = novoRegistro[i];
                    if (dados.recurso === "DISCO") {
                        valores[0].innerHTML = (dados.uso) + "%";
                        valores_Bar[0].style.width = (novoRegistro.uso) + "%";
                        valores_kpi_desempenho[0].innerHTML = (dados.uso) + "%";
                    }
                    if (dados.recurso === "RAM") {
                        valores[1].innerHTML = (dados.uso) +  "%";
                        valores_Bar[1].style.width = (novoRegistro.uso) +  "%";
                        valores_kpi_desempenho[1].innerHTML = (dados.uso) +  "%";
                    }
                    if (dados.recurso === "CPU") {
                        valores[2].innerHTML = (dados.uso) +  "%";
                        valores_Bar[2].style.width = (novoRegistro.uso) +  "%";
                        valores_kpi_desempenho[2].innerHTML = (dados.uso) +  "%";
                    }

                }
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenho(idMaquina), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenho(idMaquina), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

        

}

function limparDesempenho() {
    for (i = 0; i <= valores.length; i++) {
        valores[i].innerHTML = "";
        valores_Bar[i].style.width = "";
        valores_kpi_desempenho[i].innerHTML = "";
    }
}


function obterDadosDesempenhoTemp(idMaquina) {

    valores = [TEMP, CPU, RAM]
    valores_kpi_desempenho = [KPI_TEMP, KPI_CPU, KPI_RAM]
    valores_Bar = [temp_bar, CPU_bar, RAM_bar]

    console.log("Desempenho")
    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }

    fetch(`/medidas/ultimasDesempenhoTEMP/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos DE RAM: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoDesempenhoTemp(resposta, idMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoDesempenhoTemp(resposta, idMaquina) {
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        if (registro.recurso === "TEMPERATURA") {
            valores[0].innerHTML = (registro.uso) + "°C";
            valores_Bar[0].style.width = (registro.uso) + "°C";
            valores_kpi_desempenho[0].innerHTML = (registro.uso) + "°C";
        }
        if (registro.recurso === "CPU") {
            valores[1].innerHTML = (registro.uso) + "%";
            valores_Bar[1].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[1].innerHTML = (registro.uso) + "%";
        }
        if (registro.recurso === "RAM") {
            valores[2].innerHTML = (registro.uso) + "%";
            valores_Bar[2].style.width = (registro.uso) + "%";
            valores_kpi_desempenho[2].innerHTML = (registro.uso) + "%";
        }
        
    }


    setTimeout(() => atualizarGraficoDesempenhoTemp(idMaquina), 2000);
}

function atualizarGraficoDesempenhoTemp(idMaquina) {

    fetch(`/medidas/tempo-realDesempenhoTEMP/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                valores = [TEMP, CPU, RAM]
                valores_kpi_desempenho = [KPI_TEMP, KPI_CPU, KPI_RAM]
                valores_Bar = [temp_bar, CPU_bar, RAM_bar]

                for (i = 0; i < novoRegistro.length; i++) {
                    var dados = novoRegistro[i];
                    if (dados.recurso === "TEMPERATURA") {
                        valores[0].innerHTML = (dados.uso) + "°C";
                        valores_Bar[0].style.width = (dados.uso) + "°C";
                        valores_kpi_desempenho[0].innerHTML = (dados.uso) + "°C";
                    }
                    if (dados.recurso === "CPU") {
                        valores[1].innerHTML = (dados.uso) +  "%";
                        valores_Bar[1].style.width = (dados.uso) +  "%";
                        valores_kpi_desempenho[1].innerHTML = (dados.uso) +  "%";
                    }
                    if (dados.recurso === "RAM") {
                        valores[2].innerHTML = (dados.uso) +  "%";
                        valores_Bar[2].style.width = (dados.uso) +  "%";
                        valores_kpi_desempenho[2].innerHTML = (dados.uso) +  "%";
                    }

                    // ... outras condições para CPU e RAM
                }
                
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenhoTemp(idMaquina), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenhoTemp(idMaquina), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function limparDesempenhoTemp() {
    for (i = 0; i <= valores.length; i++) {
        valores[i].innerHTML = "";
        valores_Bar[i].style.width = "";
        valores_kpi_desempenho[i].innerHTML = "";
    }
}
function formatarData(data) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
}

function atualizarGraficoDesempenhoBoot(idMaquina) {

    fetch(`/medidas/tempo-realBoot/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            console.log("JDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDWEEW3");
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

                var KPI_BOOT = document.getElementById("kpi_boot");

                for (i = 0; i < novoRegistro.length; i++) {
                    console.log("JDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE22222222222222222222DDDDDDDDDDDDDDDDDWEEW3");
                    console.log("YYY");
                    var dados = novoRegistro[i];
                  
                    if (KPI_BOOT) {
                        KPI_BOOT.innerHTML = formatarData(dados.data_hora_inicializacao);
                    } else {
                        console.error("Elemento KPI_BOOT não encontrado no DOM.");
                    }
                    console.log(dados.data_hora_inicializacao);

                    // ... outras condições para CPU e RAM
                }
                
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenhoTemp(idMaquina), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoDesempenho = setTimeout(() => atualizarGraficoDesempenhoTemp(idMaquina), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function plotarGraficoDesempenhoTemp(resposta, idMaquina) {
    let temperaturaAtual = 0;
    let cpuAtual = 0;
    let ramAtual = 0;
    let mensagem = "";

    for (let i = 0; i < resposta.length; i++) {
        const registro = resposta[i];

        if (registro.recurso === "TEMPERATURA") {
            temperaturaAtual = registro.uso;
            valores[0].innerHTML = temperaturaAtual + "°C";
            valores_Bar[0].style.width = temperaturaAtual + "°C";
            valores_kpi_desempenho[0].innerHTML = temperaturaAtual + "°C";
        }
        if (registro.recurso === "CPU") {
            cpuAtual = registro.uso;
            valores[1].innerHTML = cpuAtual + "%";
            valores_Bar[1].style.width = cpuAtual + "%";
            valores_kpi_desempenho[1].innerHTML = cpuAtual + "%";
        }
        if (registro.recurso === "RAM") {
            ramAtual = registro.uso;
            valores[2].innerHTML = ramAtual + "%";
            valores_Bar[2].style.width = ramAtual + "%";
            valores_kpi_desempenho[2].innerHTML =ramAtual + "%";
        }
    }

    if (temperaturaAtual > 70 && cpuAtual > 40) {
        mensagem = "<b> Situação de Perigo! 🆘 </b> <br> Índices de CPU e Temperatura muito acima do esperado.";
    } else if ((temperaturaAtual >= 40 && temperaturaAtual <= 69) && (cpuAtual >= 15 && cpuAtual <= 39)) {
        mensagem = "Situação de Risco! ⚠️ <br> Índices de CPU e Temperatura em crescimento.";
    } else {
        mensagem = "Situação estável! 🆗 <br> Índices de CPU e Temperatura dentro do esperado.";

    }


    if (temperaturaAtual < 40) {
        METRICA_TEMP.style.color = '#00FF00';
    } else if (temperaturaAtual >= 41 && temperaturaAtual < 69) {
        METRICA_TEMP.style.color = '#f6ff00';
    } else {
        METRICA_TEMP.style.color = '#FF0000';
    }

    if (cpuAtual < 14) {
        METRICA_CPU.style.color = '#00FF00';
    } else if (cpuAtual >= 15 && cpuAtual < 39) {
        METRICA_CPU.style.color = '#f6ff00';
    } else {
        METRICA_CPU.style.color = '#FF0000';
    }

    if (ramAtual < 75) {
        METRICA_RAM.style.color = '#00FF00';
    } else if (ramAtual >= 76 && ramAtual < 89) {
        METRICA_RAM.style.color = '#f6ff00';
    } else {
        METRICA_RAM.style.color = '#FF0000';
    }

    

    KPI_RESUMO.innerHTML = mensagem;

    setTimeout(() => atualizarGraficoDesempenhoTemp(idMaquina), 2000);
}
