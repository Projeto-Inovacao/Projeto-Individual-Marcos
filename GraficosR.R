
#Gráfico de Linha de Uso do Processador ao Longo do Tempo:
Processos <- na.omit(Processos[, c("data_hora", "uso_cpu")])
Processos <- Processos[order(Processos$data_hora), ]

plot(Processos$data_hora, Processos$uso_cpu, type = "l", col = "blue", 
     xlab = "Tempo", ylab = "Uso do Processador (%)", main = "Uso do Processador ao Longo do Tempo",
     xlim = range(Processos$data_hora, na.rm = TRUE))

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
plot(Especificação$data_hora, Especificação$frequencia, type = "l", col = "red",
     xlab = "Tempo", ylab = "Frequência do Processador (GHz)",
     main = "Frequência do Processador ao Longo do Tempo")


