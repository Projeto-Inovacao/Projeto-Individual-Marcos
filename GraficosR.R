library(ggplot2)

#Gráfico de Linha de Uso do Processador ao Longo do Tempo:
Processos$data_hora <- as.POSIXct(Processos$data_hora, format="%Y-%m-%d %H:%M:%S")

ggplot(Processos, aes(x = data_hora, y = uso_cpu)) +
  geom_line(color = "blue") +
  labs(title = "Uso do Processador ao Longo do Tempo",
       x = "Tempo",
       y = "Uso do Processador (%)") +
  theme_minimal()

#-----------------------------------------------------------------------------------------------

#Gráfico de barras de utilização de CPU por processo (7 principais processos):
Processos <- Processos[order(-Processos$uso_cpu), ]
top7_processos_cpu <- head(Processos, 7)

barplot(top7_processos_cpu$uso_cpu, names.arg = top7_processos_cpu$nome_processo, col = "green", 
        xlab = "Processo", ylab = "Utilização de CPU (%)", main = "Utilização de CPU por Processo")

#-----------------------------------------------------------------------------------------------

#Gráfico de Pizza para Distribuição da Utilização do Disco por Processo (Top 7 Processos):
Processos$gravacao_disco[Processos$gravacao_disco < 0 | is.na(Processos$gravacao_disco)] <- 0
Processos <- Processos[order(-Processos$gravacao_disco), ]
top7_processos_disco <- head(Processos, 7)

pie(top7_processos_disco$gravacao_disco, labels = top7_processos_disco$nome_processo, 
    main = "Distribuição da Utilização do Disco por Processo")

#-----------------------------------------------------------------------------------------------

#Gráfico de Linha para Frequência do Processador ao Longo do Tempo:
Especificacao$data_hora <- as.POSIXct(Especificacao$data_hora, format="%Y-%m-%d %H:%M:%S")

ggplot(Especificacao, aes(x = data_hora, y = frequencia)) +
  geom_line(color = "red") +
  labs(title = "Frequência do Processador ao Longo do Tempo",
       x = "Tempo",
       y = "Frequência do Processador (GHz)") +
  theme_minimal()


