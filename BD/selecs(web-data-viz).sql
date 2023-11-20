-- Individual: Rendimento do Processador selects

-- Gráfico de Linha de Uso do Processador ao Longo do Tempo
SELECT data_hora, uso_cpu
FROM processos
WHERE fk_maquinaP = 1
ORDER BY data_hora;

-- Gráfico de Barras de Utilização de CPU por Processo
SELECT nome_processo, AVG(uso_cpu) as media_uso_cpu
FROM processos
WHERE fk_maquinaP = 1
GROUP BY nome_processo
ORDER BY media_uso_cpu DESC;

select*from colaborador;
select*from componente;
select*from monitoramento;
select*from processos;

-- Gráfico de Pizza para Distribuição da Utilização do Disco por Processo
SELECT nome_processo, SUM(uso_disco) as total_uso_disco
FROM processos
WHERE fk_maquinaP = 1
GROUP BY nome_processo
ORDER BY total_uso_disco DESC;


-- Gráfico de Linha para Frequência do Processador ao Longo do Tempo
SELECT data_hora, frequencia
FROM componente
WHERE fk_maquina_componente = 1
ORDER BY data_hora;
