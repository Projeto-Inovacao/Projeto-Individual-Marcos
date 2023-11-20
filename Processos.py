import time
import psutil
import mysql.connector
from datetime import datetime

# Configuração da conexão com o MySQL
conexao = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Marnn111',
    database='nocline'
)

# Cria um objeto de cursor para executar comandos SQL
cursor = conexao.cursor()

# Tempo total de execução (em segundos)
tempo_total = 10  # Ajuste conforme necessário

# Intervalo entre as inserções (em segundos)
intervalo_insercao = 5  # Ajuste conforme necessário

# Obtém a lista de processos no início
processos_iniciais = psutil.process_iter()

# Grava o tempo inicial
inicio = time.time()

# Loop para coletar dados ao longo do tempo
while time.time() - inicio < tempo_total:
    # Obtém informações sobre o uso do disco
    uso_disco = psutil.disk_usage('/')
    
    # Obtém a data e hora atual
    data_hora = datetime.now()

    # Inserção dos dados no MySQL - Uso de Disco
    comando_sql = "INSERT INTO processos (data_hora, uso_disco) VALUES (%s, %s)"
    valores = (data_hora, uso_disco.percent)
    
    try:
        cursor.execute(comando_sql, valores)
        conexao.commit()
        print("Dados de uso_disco_data inseridos com sucesso na tabela processos")
    except mysql.connector.Error as err:
        print(f"Falha ao inserir dados de uso_disco_data na tabela processos: {err}")
        conexao.rollback()

    # Aguarda o intervalo antes de coletar novamente
    time.sleep(intervalo_insercao)

# Fecha a conexão com o banco de dados
conexao.close()

# Imprime a utilização da CPU de cada processo
#for processo in processos_iniciais:
    #try:
        # Obtém as informações do processo
        #info = processo.as_dict(attrs=['pid', 'name', 'cpu_percent'])
        #info2 = processo.as_dict(attrs=['pid', 'name', 'io_counters'])

        # Imprime as informações do processo
        #print(f"PID: {info['pid']}, Nome: {info['name']}, Utilização da CPU: {info['cpu_percent']}%")
        #print(f"PID: {info2['pid']}, Nome: {info2['name']}, Utilização do Disco: {info2['io_counters'].write_bytes / (1024 * 1024)} MB")
    #except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
        #pass
