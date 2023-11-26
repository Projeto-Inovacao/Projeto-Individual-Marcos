import time
import psutil
import mysql.connector
from datetime import datetime

# Configuração da conexão com o MySQL
conexao = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Marnn111',
    database='nocLine'
)

# Cria um objeto de cursor para executar comandos SQL
cursor = conexao.cursor()

def obter_info_processos():
    info_processos = []

    # Obtém a lista de processos e as informações de CPU
    for processo in psutil.process_iter(['pid', 'name', 'cpu_percent']):
        try:
            info = processo.info
            pid = info['pid']
            nome = info['name']
            uso_cpu_processo = info['cpu_percent']

            # Obtém informações sobre o uso de disco para o processo
            try:
                uso_disco = psutil.disk_io_counters(perdisk=False).write_bytes
            except psutil.NoSuchProcess:
                uso_disco = 0

            info_processos.append({
                'pid': pid,
                'nome': nome,
                'uso_cpu': uso_cpu_processo,
                'uso_disco': uso_disco
            })

        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass

    return info_processos

# Exemplo de uso
while True:
    # Calcula o uso total da CPU antes de obter informações do processo
    uso_cpu_anterior = psutil.cpu_percent()

    processos_info = obter_info_processos()

    print(f"Uso de CPU total antes do loop: {uso_cpu_anterior}%")

    for processo in processos_info:
        # Calcula o uso da CPU relativo ao intervalo desde a última medição
        uso_cpu_processo = processo['uso_cpu']

        data_hora = datetime.now()
        comando_sql = "INSERT INTO processos (pid, data_hora, nome_processo, uso_cpu, gravacao_disco, fk_maquinaP, fk_empresaP) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        valores = (processo['pid'], data_hora, processo['nome'], uso_cpu_processo, processo['uso_disco'], 1, 1)

        try:
            cursor.execute(comando_sql, valores)
            conexao.commit()
            print("Dados inseridos com sucesso na tabela processos")
        except mysql.connector.Error as err:
            print(f"Falha ao inserir dados na tabela processos: {err}")
            conexao.rollback()

