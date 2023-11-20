// // Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#858796';

// var KPI_BYTE_ENVIADOS = document.getElementById("bytes_enviados_kpi");
// var KPI_BYTE_RECEBIDOS = document.getElementById("bytes_recebidos_kpi");

// var elemento_maquina = document.getElementById("select_maquina");
// var idMaquina = elemento_maquina.value;

// // window.onload = obterDadosRede(idMaquina);

function obterDadosTempXCPU(idMaquina) {
    console.log("tempxcpu")
  // if (proximaAtualizacao != undefined) {
  //     clearTimeout(proximaAtualizacao);
  // }
  fetch(`/medidas/ultimasTempXCpu/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              console.log(`Dados recebidos DE temp e cpu: ${JSON.stringify(resposta)}`);
              resposta.reverse();

              plotarGraficoTempXCPU(resposta, idMaquina);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGraficoTempXCPU(resposta, idMaquina) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
        label: 'Usada',
        data: [],
        backgroundColor: [],
        borderColor: ['#393d42'],
        tension: 0.3,
        fill: false, 
        pointRadius: 6
    }]
};

  console.log('----------------------------------------------')
  console.log('-------------------PLOT cpu e temp---------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = resposta.length - 1; i >= 0; i--) {
    var registro = resposta[i];
    dados.datasets[0].data.push(registro.dado_coletado);
    labels.push(registro.data_hora);

// Definindo a cor com base nas condições
if (registro.dado_coletado <= 15) {
  dados.datasets[0].backgroundColor.push('#00FF00');
  // dados.datasets[0].borderColor.push('#00FF00');
} else if (registro.dado_coletado <= 39) {
  dados.datasets[0].backgroundColor.push('#f6ff00');
  // dados.datasets[0].borderColor.push('#f6ff00');
} else {
  dados.datasets[0].backgroundColor.push('#FF0000');
  // dados.datasets[0].borderColor.push('#FF0000');
}
    
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'line',
    data: dados,
    fill: false,
  }
  
  // Adicionando gráfico criado em div na tela
  let ChartTempXCpu= new Chart(
      document.getElementById(`myAreaChartTempXCpu`),
      config
  );

  setTimeout(() => atualizarGraficoTempXCPU(idMaquina, dados, ChartTempXCpu), 5000);
}


function atualizarGraficoTempXCPU(idMaquina, dados, ChartTempXCpu) {

  fetch(`/medidas/tempo-realTempXCpu/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

          // obterDadosCPU(idMaquina);
          // // alertar(novoRegistro, idMaquina);
          // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          // console.log(`Dados atuais do gráfico:`);
          // console.log(dados);

          if (novoRegistro[0].data_hora == dados.datasets[0].data.data_hora) {
              console.log("---------------------------------------------------------------")
              console.log("Como não há dados novos para captura, o gráfico não atualizará.")
              // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
              console.log("Horário do novo dado capturado:")
              console.log(novoRegistro[0].data_hora)
              console.log("Horário do último dado capturado:")
              console.log(dados.labels[dados.labels.length - 1])
              console.log("---------------------------------------------------------------")
          } else {
              // tirando e colocando valores no gráfico
              dados.labels.shift(); // apagar o primeiro
              dados.labels.push(novoRegistro[0].data_hora); // incluir um novo momento

              dados.datasets[0].data.shift();  // apagar o primeira medida
              dados.datasets[0].data.push(novoRegistro[0].dado_coletado); // incluir uma nova medida

              chartCPU.update();
          }

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(() => atualizarGraficoCPU(idMaquina, dados, ChartTempXCpu), 5000);
      });
  } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGraficoCPU(idMaquina, dados, ChartTempXCpu), 5000);
  }
})
  .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
  });

}


function limparRede(){
  let chartRede = new Chart(
      document.getElementById(`myAreaChartTempXCpu`),
  );

  chartRede.clear()
}